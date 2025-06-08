import React from "react";
import { useStepStore } from "../../../../store/store";
import { UseIdentificationDocuments } from "../hooks/useIdentificationDocuments";
import FloatingField from "../floatingField";
import "../../../../styles/Step 2/PartnerData/DocumentInfo/documentInfo.css";

const DocumentInfoBlock: React.FC = () => {
  const { partnerData, setPartnerData } = useStepStore();
  const { documents } = UseIdentificationDocuments();

  const handleValidityChange = (value: string) => {
    setPartnerData("documentOptionValidity", value);
    if (value !== "comValidade") {
      setPartnerData("documentValidity", "");
    }
  };

  return (
    <div className="document-step-box">
      <p className="document-title">
        Documento de Identificação e Informação Fiscal
      </p>
      <div className="data-box">
        <div className="document-grid">
          {/* Documento de Identificação */}
          <div className="document-field-group document-flag-left">
            <FloatingField
              label="Documento de identificação"
              value={partnerData.documentType}
              onChange={(e) => setPartnerData("documentType", e.target.value)}
              options={documents.map((d) => d.name)}
            />
          </div>

          {/* País emissor */}
          <div className="document-field-group document-flag-left">
            <FloatingField
              label="País"
              value="Portugal"
              onChange={() => {}}
              disabled
              flag="pt"
            />
          </div>

          {/* Número de identificação */}
          <div className="document-field-group">
            <FloatingField
              label="Número de identificação"
              value={partnerData.documentNumber}
              onChange={(e) => setPartnerData("documentNumber", e.target.value)}
            />
          </div>

          {/* Data da emissão */}
          <div className="document-field-group">
            <FloatingField
              label="Data de emissão"
              value={partnerData.documentValidity || ""}
              onChange={(e) =>
                setPartnerData("documentValidity", e.target.value)
              }
              type="date"
              disabled={partnerData.documentOptionValidity !== "comValidade"}
            />
          </div>

          {/* NIF */}
          <div className="document-field-group">
            <FloatingField
              label="NIF"
              value={partnerData.nif}
              onChange={(e) => {
                const onlyDigits = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 9);
                setPartnerData("nif", onlyDigits);
              }}
            />
          </div>

          {/* Validade */}
          <div className="partner-field-group validity-group">
            <div className="document-radio-options no-border">
              <label>
                <input
                  type="radio"
                  name="validity"
                  checked={partnerData.documentOptionValidity === "vitalicio"}
                  onChange={() => handleValidityChange("vitalicio")}
                />
                Vitalício
              </label>
              <label>
                <input
                  type="radio"
                  name="validity"
                  checked={partnerData.documentOptionValidity === "semValidade"}
                  onChange={() => handleValidityChange("semValidade")}
                />
                Sem validade
              </label>
              <label>
                <input
                  type="radio"
                  name="validity"
                  checked={partnerData.documentOptionValidity === "comValidade"}
                  onChange={() => handleValidityChange("comValidade")}
                />
                Com validade
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentInfoBlock;
