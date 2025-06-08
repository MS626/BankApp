import React, { useEffect } from "react";
import FloatingField from "../floatingField";
import { useStepStore } from "../../../../store/store";
import { UseProfessionalStatus } from "../hooks/useProfessionalStatus";
import "../../../../styles/Step 2/PartnerData/ProfessionalInfo/professionalInfo.css";

const ProfessionalStatusBlock: React.FC = () => {
  const { partnerData, setPartnerData, setBlockValidity } = useStepStore();
  const { status } = UseProfessionalStatus();

  useEffect(() => {
    const isComplete =
      !!partnerData.profession &&
      !!partnerData.currentProfession &&
      !!partnerData.employer;
    console.log("Validating Professional Info:", isComplete);
    setBlockValidity("isProfessionalInfoValid", isComplete);
  }, [
    partnerData.profession,
    partnerData.currentProfession,
    partnerData.employer,
    setBlockValidity,
  ]);

  return (
    <div className="professional-box">
      <p className="professional-title">Situação profissional</p>
      <div className="data-box">
        <div className="professional-grid">
          {/* Situação profissional */}
          <div className="partner-field-group">
            <FloatingField
              label="Documento de identificação"
              value={partnerData.profession}
              onChange={(e) => setPartnerData("profession", e.target.value)}
              options={status.map((d) => d.name)}
            />
          </div>

          {/* Profissão atual */}
          <div className="partner-field-group">
            <FloatingField
              label="Profissão atual"
              value={partnerData.currentProfession}
              onChange={(e) =>
                setPartnerData("currentProfession", e.target.value)
              }
            />
          </div>

          {/* Entidade patronal */}
          <div className="partner-field-group partner-full-width">
            <FloatingField
              label="Entidade patronal"
              value={partnerData.employer}
              onChange={(e) => setPartnerData("employer", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStatusBlock;
