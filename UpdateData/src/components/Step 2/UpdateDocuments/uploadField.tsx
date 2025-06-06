import React from "react";
import { useStepStore } from "../../../store/store";
import "../../../styles/Step 2/UpdateDocuments/uploadField.css";

type DocumentField = "id" | "nif" | "moradaHabitual" | "moradaFiscal";

interface UploadFieldProps {
  label: string;
  helper?: string;
  id: DocumentField;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const UploadField: React.FC<UploadFieldProps> = ({
  label,
  helper,
  id,
  file,
  onFileChange,
}) => {
  const { documentErrors, setDocumentError } = useStepStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile && selectedFile.type !== "application/pdf") {
      onFileChange(selectedFile);
      setDocumentError(
        id,
        "Só são aceites ficheiros do tipo PDF. Tente Novamente"
      );
    } else {
      onFileChange(selectedFile);
      setDocumentError(id, null);
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    setDocumentError(id, null);
  };

  const viewFile = () => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  const isError = !!documentErrors[id];

  return (
    <>
      <label className="steps-subtitle-upload" htmlFor={id}>
        {label}
        {helper && <div className="helper-text">{helper}</div>}
      </label>

      {file ? (
        <div className="upload-area">
          <div className={`upload-preview ${isError ? "error" : ""}`}>
            <div className="left">
              <div className="upload-icon">📄</div>
              <div className="file-info">
                <span className="file-label">{label}</span>
                <span className="file-name">{file.name}</span>
              </div>
            </div>
            <div className="actions">
              {!isError && (
                <div className="view-file" onClick={viewFile}>
                  📄 Ver Ficheiro
                </div>
              )}
              <div className="delete-file" onClick={handleRemoveFile}>
                ❌
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="upload-area">
          <label htmlFor={id} className="upload-area-inner">
            <div className="upload-icon">📄</div>
            <div className="upload-label">{label}</div>
            <div className="upload-instructions">
              <span>Selecione</span> ou arraste o documento
            </div>
          </label>
          <input
            type="file"
            id={id}
            className="upload-input"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        </div>
      )}

      {isError && <div className="upload-error">{documentErrors[id]}</div>}
    </>
  );
};

export default UploadField;
