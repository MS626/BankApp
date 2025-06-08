import React, { useEffect } from "react";
import { useStepStore } from "../../../../store/store";
import { useSexTypes } from "../hooks/useSexTypes";
import { useDistricts } from "../hooks/useDistricts";
import { useMunicipalities } from "../hooks/useMunicipalities";
import { useParishes } from "../hooks/useParishes";
import FloatingField from "../floatingField";
import "../../../../styles/Step 2/PartnerData/PersonalInfo/personalInfo.css";

const PersonalInfoBlock: React.FC = () => {
  const { partnerData, setPartnerData, setBlockValidity } = useStepStore();

  const { sexTypes } = useSexTypes();
  const { districts } = useDistricts();
  const { municipalities } = useMunicipalities(partnerData.district);
  const { parishes } = useParishes(partnerData.county);

  useEffect(() => {
    const isComplete =
      !!partnerData.fullName &&
      !!partnerData.sex &&
      !!partnerData.birthDate &&
      !!partnerData.district &&
      !!partnerData.county &&
      !!partnerData.parish;
    console.log("Validating Personal Info:", isComplete);
    setBlockValidity("isPersonalInfoValid", isComplete);
  }, [
    partnerData.fullName,
    partnerData.sex,
    partnerData.birthDate,
    partnerData.district,
    partnerData.county,
    partnerData.parish,
    setBlockValidity,
  ]);

  return (
    <div className="partner-container">
      <p className="partner-title">Dados Pessoais</p>
      <div className="data-box">
        <div className="partner-grid">
          {/* Nome */}
          <div className="partner-field-group partner-full-width">
            <FloatingField
              label="Nome completo"
              value={partnerData.fullName}
              onChange={(e) => setPartnerData("fullName", e.target.value)}
            />
          </div>

          {/* Sexo */}
          <div className="partner-field-group">
            <FloatingField
              label="Sexo"
              value={partnerData.sex}
              onChange={(e) => setPartnerData("sex", e.target.value)}
              options={sexTypes.map((s) => s.label)}
            />
          </div>

          {/* Nacionalidade */}
          <div className="partner-field-group partner-flag-left">
            <FloatingField
              label="Nacionalidade"
              value="Portugal"
              onChange={() => {}}
              disabled
              flag="pt"
            />
          </div>

          {/* Data de nascimento */}
          <div className="partner-field-group">
            <FloatingField
              label="Data de nascimento"
              value={partnerData.birthDate}
              onChange={(e) => setPartnerData("birthDate", e.target.value)}
              type="date"
            />
          </div>

          {/* Naturalidade */}
          <div className="partner-field-group partner-flag-left">
            <FloatingField
              label="Naturalidade"
              value="Portuguesa"
              onChange={() => {}}
              disabled
              flag="pt"
            />
          </div>

          {/* Distrito */}
          <div className="partner-field-group">
            <FloatingField
              label="Distrito"
              value={partnerData.district}
              onChange={(e) => setPartnerData("district", e.target.value)}
              options={districts.map((d) => d.name)}
            />
          </div>

          {/* Concelho */}
          <div className="partner-field-group">
            <FloatingField
              label="Concelho"
              value={partnerData.county}
              onChange={(e) => setPartnerData("county", e.target.value)}
              options={municipalities.map((m) => m.name)}
              disabled={!partnerData.district}
            />
          </div>

          {/* Freguesia */}
          <div className="partner-field-group">
            <FloatingField
              label="Freguesia"
              value={partnerData.parish}
              onChange={(e) => setPartnerData("parish", e.target.value)}
              options={parishes.map((p) => p.name)}
              disabled={!partnerData.district || !partnerData.county}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoBlock;
