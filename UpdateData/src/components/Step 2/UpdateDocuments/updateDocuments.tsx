import React, { useEffect } from "react";
import { useStepStore } from "../../../store/store";
import StepProgress from "../../Navigation/stepProgress";
import StepNavigation from "../../Navigation/navigation";
import UploadField from "./uploadField";
import "../../../styles/Step 2/UpdateDocuments/updateDocuments.css";

const UpdateDocuments: React.FC = () => {
  const setStep = useStepStore((state) => state.setStep);
  const setTitle = useStepStore((state) => state.setTitle);
  const setFormComplete = useStepStore((state) => state.setFormComplete);
  const documents = useStepStore((state) => state.documents);
  const updateDocument = useStepStore((state) => state.updateDocument);

  useEffect(() => {
    setStep(2);
    setTitle("Atualizar dados");
  }, [setStep, setTitle]);

  useEffect(() => {
    const allFilled = Object.values(documents).every(
      (file) => file && file.type === "application/pdf"
    );
    setFormComplete(allFilled);
  }, [documents, setFormComplete]);

  return (
    <div className="update-documents-wrapper">
      <StepProgress />
      <div className="update-documents-container">
        <p className="steps-subtitle">
          Carregue por favor os seguintes documentos do Sócio
        </p>
        <UploadField
          label="Documento de identificação"
          id="id"
          onFileChange={(file) => updateDocument("id", file)}
          file={documents.id}
        />
        <UploadField
          label="Comprovativo de NIF"
          id="nif"
          onFileChange={(file) => updateDocument("nif", file)}
          file={documents.nif}
        />
        <UploadField
          label="Morada residência habitual"
          id="moradaHabitual"
          onFileChange={(file) => updateDocument("moradaHabitual", file)}
          file={documents.moradaHabitual}
        />
        <UploadField
          label="Morada residência fiscal"
          id="moradaFiscal"
          onFileChange={(file) => updateDocument("moradaFiscal", file)}
          file={documents.moradaFiscal}
        />
      </div>
      <StepNavigation />
    </div>
  );
};

export default UpdateDocuments;
