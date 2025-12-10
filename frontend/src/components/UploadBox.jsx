import { useRef } from "react";
import "../styles/uploadBox.css";

export default function UploadBox({ onFileSelect }) {
  const inputRef = useRef(null);

  const openPicker = () => inputRef.current.click();

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="upload-box">
      <input
        type="file"
        ref={inputRef}
        onChange={onChangeFile}
        accept=".txt,.pdf,.docx"
        style={{ display: "none" }}
      />

      <button className="upload-btn" onClick={openPicker}>
        Upload File
      </button>
    </div>
  );
}
