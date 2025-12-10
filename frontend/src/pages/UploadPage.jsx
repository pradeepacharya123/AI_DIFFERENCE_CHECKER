import { useState } from "react";
import UploadBox from "../components/UploadBox";
import Loader from "../components/Loader";
import { uploadDocuments } from "../api/backend";
import { useNavigate } from "react-router-dom";
import "../styles/uploadPage.css";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);

  const navigate = useNavigate();

  const handleCompare = async () => {
    if (!fileA || !fileB) return;

    try {
      setLoading(true);
      const response = await uploadDocuments(fileA, fileB);

      navigate("/result", {
        state: { diff: response.data },
      });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      {loading && <Loader />}

      <h1 className="title">Document Difference Checker</h1>
      <p className="subtitle">Upload two documents to compare their contents</p>

      <div className="upload-container">

        <div className="upload-section">
          <h2>Document A</h2>
          <UploadBox onFileSelect={setFileA} />
          {fileA && <p className="filename">{fileA.name}</p>}
        </div>

        <div className="upload-section">
          <h2>Document B</h2>
          <UploadBox onFileSelect={setFileB} />
          {fileB && <p className="filename">{fileB.name}</p>}
        </div>

      </div>

      <button
        className={`compare-btn ${fileA && fileB ? "active" : ""}`}
        disabled={!fileA || !fileB}
        onClick={handleCompare}
      >
        🔍 Compare Documents
      </button>

    </div>
  );
}
