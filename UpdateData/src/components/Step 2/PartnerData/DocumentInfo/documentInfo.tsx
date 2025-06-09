import React, { useEffect } from "react";
import { useStepStore } from "../../../../store/store";
import { UseIdentificationDocuments } from "../hooks/useIdentificationDocuments";
import FloatingField from "../floatingField";
import "../../../../styles/Step 2/PartnerData/DocumentInfo/documentInfo.css";

const formatDocumentNumber = (type: string, raw: string): string => {
  const clean = raw.replace(/\W/g, "");

  // Documento de Identificação:
  // Documento:   Cartão de Cidadão:
  // Máscara:     12345678 AB 1
  // Observações: 8 dígitos + 2 letras + 1 dígito
  // Documento:   Bilhete de Identidade:
  // Máscara:     12 345678 9
  // Observações: 2 + 6 + 1 dígito
  // Documento:   Passaporte (Portugal):
  // Máscara:     P1234567
  // Observações: 1 letra + 7 números
  // Documento:   Título de Residência:
  // Máscara:     123 456 789
  // Observações: 12 dígitos

  switch (type) {
    case "Cartão de Cidadão": {
      const digits = clean.replace(/\D/g, "");
      const letters = clean.replace(/[^A-Z]/gi, "").toUpperCase();
      const numericPart = digits.slice(0, 8);
      const alphaPart = letters.slice(0, 2);
      const lastDigit = digits.slice(8, 9);
      return [numericPart, alphaPart, lastDigit].filter(Boolean).join(" ");
    }

    case "Bilhete de Identidade": {
      const digits = clean.replace(/\D/g, "").slice(0, 9);
      return digits.replace(/^(\d{0,2})(\d{0,6})(\d{0,1})/, (_, a, b, c) =>
        [a, b, c].filter(Boolean).join(" ")
      );
    }
    case "Passaporte": {
      const digits = clean.replace(/\D/g, "").slice(0, 7);
      return `P${digits}`;
    }
    case "Título de Residência": {
      const digits = clean.replace(/\D/g, "").slice(0, 12);
      return digits.replace(
        /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})/,
        (_, a, b, c, d) => [a, b, c, d].filter(Boolean).join(" ")
      );
    }
    default:
      return clean;
  }
};

const DocumentInfoBlock: React.FC = () => {
  const { partnerData, setPartnerData, setBlockValidity } = useStepStore();
  const { documents } = UseIdentificationDocuments();

  const handleValidityChange = (value: string) => {
    setPartnerData("documentOptionValidity", value);
    if (value !== "comValidade") {
      setPartnerData("documentValidity", "");
    }
  };

  useEffect(() => {
    const requiresValidity =
      partnerData.documentOptionValidity === "comValidade";

    const isComplete =
      !!partnerData.documentType &&
      !!partnerData.documentNumber &&
      !!partnerData.nif &&
      !!partnerData.documentOptionValidity &&
      (!requiresValidity || !!partnerData.documentValidity);

    console.log("Validating Document Info:", isComplete);
    setBlockValidity("isDocumentInfoValid", isComplete);
  }, [
    partnerData.documentType,
    partnerData.documentNumber,
    partnerData.nif,
    partnerData.documentOptionValidity,
    partnerData.documentValidity,
    setBlockValidity,
  ]);

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
              onChange={(e) => {
                const formatted = formatDocumentNumber(
                  partnerData.documentType,
                  e.target.value
                );
                setPartnerData("documentNumber", formatted);
              }}
              disabled={!partnerData.documentType}
              error={
                partnerData.documentType === "Cartão de Cidadão" &&
                !/^\d{8}\s[A-Z]{2}\s\d$/.test(partnerData.documentNumber)
                  ? "Formato: 12345678 AB 1"
                  : partnerData.documentType === "Bilhete de Identidade" &&
                    !/^\d{2}\s\d{6}\s\d$/.test(partnerData.documentNumber)
                  ? "Formato: 12 345678 9"
                  : partnerData.documentType === "Passaporte" &&
                    !/^[A-Z]{1}\d{8}$/.test(partnerData.documentNumber)
                  ? "Formato: P12345678"
                  : partnerData.documentType === "Título de Residência" &&
                    !/^\d{3}\s\d{3}\s\d{3}$/.test(partnerData.documentNumber)
                  ? "Formato: 123 456 789"
                  : null
              }
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
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 9);
                setPartnerData("nif", cleaned);
              }}
              error={
                partnerData.nif &&
                (!/^[123]\d{8}$/.test(partnerData.nif)
                  ? "O NIF deve ter 9 dígitos e começar por 1, 2 ou 3"
                  : null)
              }
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
