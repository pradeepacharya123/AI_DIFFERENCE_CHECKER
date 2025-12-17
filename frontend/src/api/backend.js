import axios from "axios";

// Render backend base URL
const API_BASE = "https://ai-difference-checker-6.onrender.com/api";

// Upload two documents
export const uploadDocuments = async (fileA, fileB) => {
  try {
    const formData = new FormData();
    formData.append("file_a", fileA);
    formData.append("file_b", fileB);

    const response = await axios.post(`${API_BASE}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading documents:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get AI summary (FIXED)
export const getSummary = async (diffText) => {
  try {
    const response = await axios.post(`${API_BASE}/summary`, {
      diff_text: diffText,   // ✅ MUST match backend
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error getting summary:",
      error.response?.data || error.message
    );
    throw error;
  }
};
