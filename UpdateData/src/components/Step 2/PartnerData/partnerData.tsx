import React, { useEffect } from "react";
import { useStepStore } from "../../../store/store";
import StepProgress from "../../Navigation/stepProgress";
import StepNavigation from "../../Navigation/navigation";
import { useSexTypes } from "./hooks/useSexTypes";
import { useDistricts } from "./hooks/useDistricts";
import { useMunicipalities } from "./hooks/useMunicipalities";
import { useParishes } from "./hooks/useParishes";
import FloatingField from "./floatingField";

import "../../../styles/Step 2/PartnerData/partnerData.css";

const PartnerData: React.FC = () => {
  const { partnerData, setPartnerData, setStep, setTitle } = useStepStore();

  const { sexTypes } = useSexTypes();
  const { districts } = useDistricts();
  const { municipalities } = useMunicipalities(partnerData.district);
  const { parishes } = useParishes(partnerData.county);

  useEffect(() => {
    setStep(2);
    setTitle("Atualizar dados");
  }, [setStep, setTitle]);

  return (
    <div className="partner-wrapper">
      <StepProgress />
      <div className="partner-container">
        <p className="partner-title">Dados Pessoais</p>
        <div className="step-box">
          <div className="partner-grid">
            {/* Nome */}
            <div className="field-group full-width">
              <FloatingField
                label="Nome completo"
                value={partnerData.fullName}
                onChange={(e) => setPartnerData("fullName", e.target.value)}
              />
            </div>

            {/* Sexo */}
            <div className="field-group">
              <FloatingField
                label="Sexo"
                value={partnerData.sex}
                onChange={(e) => setPartnerData("sex", e.target.value)}
                options={sexTypes.map((s) => s.label)}
              />
            </div>

            {/* Nacionalidade */}
            <div className="field-group flag-right">
              <div className="field-disabled">
                <img src="https://flagcdn.com/pt.svg" alt="pt" />
                <span>Portugal</span>
              </div>
            </div>

            {/* Data de nascimento */}
            <div className="field-group">
              <FloatingField
                label="Data de nascimento"
                value={partnerData.birthDate}
                onChange={(e) => setPartnerData("birthDate", e.target.value)}
                type="date"
              />
            </div>

            {/* Naturalidade */}
            <div className="field-group flag-right">
              <div className="field-disabled">
                <img src="https://flagcdn.com/pt.svg" alt="pt" />
                <span>Portuguesa</span>
              </div>
            </div>

            {/* Distrito */}
            <div className="field-group">
              <FloatingField
                label="Distrito"
                value={partnerData.district}
                onChange={(e) => setPartnerData("district", e.target.value)}
                options={districts.map((d) => d.name)}
              />
            </div>

            {/* Concelho */}
            <div className="field-group">
              <FloatingField
                label="Concelho"
                value={partnerData.county}
                onChange={(e) => setPartnerData("county", e.target.value)}
                options={municipalities.map((m) => m.name)}
              />
            </div>

            {/* Freguesia */}
            <div className="field-group full-width">
              <FloatingField
                label="Freguesia"
                value={partnerData.parish}
                onChange={(e) => setPartnerData("parish", e.target.value)}
                options={parishes.map((p) => p.name)}
              />
            </div>
          </div>
        </div>
      </div>
      <StepNavigation />
    </div>
  );
};

export default PartnerData;
