import os
import requests
from dotenv import load_dotenv

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
HF_API_URL = os.getenv("HF_API_URL")  # expected HF model inference URL

def get_hf_summary(diff_text: str) -> str:
    """
    Call Hugging Face Inference API with a prompt.
    Returns a clean string summary.
    """
    if not HF_API_KEY or not HF_API_URL:
        return "Hugging Face not configured. Set HF_API_KEY and HF_API_URL in .env."

    prompt = (
        "Summarize the following differences between Document A and Document B.\n\n"
        "Provide bullet points of main changes and a short paragraph summary.\n\n"
        f"{diff_text}"
    )

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 200,
            "temperature": 0.3
        }
    }

    try:
        resp = requests.post(HF_API_URL, headers=headers, json=payload, timeout=60)
        resp.raise_for_status()
        data = resp.json()

        # Debug print for development
        print("HF RAW RESPONSE:", data)

        summary_text = ""

        # Case 1: direct generated_text
        if isinstance(data, dict) and "generated_text" in data:
            summary_text = data["generated_text"]

        # Case 2: result embedded
        elif isinstance(data, dict) and "result" in data:
            result = data["result"]
            if isinstance(result, list) and len(result) > 0:
                first = result[0]
                if isinstance(first, dict) and "generated_text" in first:
                    summary_text = first["generated_text"]
                elif isinstance(first, str):
                    summary_text = first
                elif isinstance(first, dict) and "summary_text" in first:
                    summary_text = first["summary_text"]

        # Case 3: list of dicts (legacy HF)
        elif isinstance(data, list) and len(data) > 0:
            first = data[0]
            if isinstance(first, dict) and "generated_text" in first:
                summary_text = first["generated_text"]
            elif isinstance(first, dict) and "summary_text" in first:
                summary_text = first["summary_text"]
            elif isinstance(first, str):
                summary_text = first

        return summary_text.strip()

    except Exception as e:
        print("HF API error:", e)
        return f"AI summary failed: {e}"
