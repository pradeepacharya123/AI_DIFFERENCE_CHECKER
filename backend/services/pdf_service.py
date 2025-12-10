import os
import pdfplumber

def extract_text_from_file(path: str) -> str:
    """
    Given a file path (.txt or .pdf) return extracted text.
    If it's .txt: read as text. If .pdf: use pdfplumber.
    """
    _, ext = os.path.splitext(path.lower())
    if ext == ".pdf":
        return _extract_from_pdf(path)
    else:
        return _read_text_file(path)

def _read_text_file(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except Exception:
        # fallback: binary read and decode
        with open(path, "rb") as f:
            return f.read().decode("utf-8", errors="ignore")

def _extract_from_pdf(path: str) -> str:
    pages = []
    try:
        with pdfplumber.open(path) as pdf:
            for p in pdf.pages:
                text = p.extract_text() or ""
                pages.append(text)
    except Exception as e:
        # if pdfplumber fails, return empty string for robustness
        print("pdf extraction error:", e)
    return "\n".join(pages)
