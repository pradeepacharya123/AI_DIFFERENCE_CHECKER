import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api"; // Flask backend

export const uploadDocuments = async (fileA, fileB) => {
  const formData = new FormData();
  formData.append("file_a", fileA);
  formData.append("file_b", fileB);

  return axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getSummary = async (diffText) => {
  return axios.post(`${API_BASE}/summary`, { diff_text: diffText });
};
