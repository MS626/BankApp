import React, { useEffect, useState } from "react";
import FloatingField from "../floatingField";
import { useStepStore } from "../../../../store/store";

import "../../../../styles/Step 2/PartnerData/ResidenceInfo/residenceInfo.css";

const ResidenceInfo: React.FC = () => {
  const { partnerData, setPartnerData, setBlockValidity } = useStepStore();
  const [zipError, setZipError] = useState<string | null>(null);

  const handleZipChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 7);
    const masked =
      cleaned.length > 4
        ? `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
        : cleaned;
    setPartnerData("zipcode", masked);

    const isValid = /^\d{4}-\d{3}$/.test(masked);
    setZipError(isValid ? null : "Formato inválido. Use 1234-567");
  };

  useEffect(() => {
    const isZipValid = /^\d{4}-\d{3}$/.test(partnerData.zipcode);
    const isComplete =
      isZipValid &&
      !!partnerData.zipcode &&
      !!partnerData.city &&
      !!partnerData.street &&
      !!partnerData.door &&
      !!partnerData.floor;
    console.log("Validating Residence Info:", isComplete);
    setBlockValidity("isResidenceInfoValid", isComplete);
  }, [
    partnerData.zipcode,
    partnerData.city,
    partnerData.street,
    partnerData.door,
    partnerData.floor,
    setBlockValidity,
  ]);

  return (
    <div className="residence-box">
      <p className="residence-title">Morada de residência habitual</p>
      <div className="data-box">
        <div className="residence-grid">
          {/* País */}
          <div className="partner-field-group partner-flag-left">
            <FloatingField
              label="País"
              value="Portugal"
              onChange={() => {}}
              disabled
              flag="pt"
            />
          </div>

          {/* Código postal */}
          <div className="partner-field-group">
            <FloatingField
              label="Código postal"
              value={partnerData.zipcode}
              onChange={(e) => handleZipChange(e.target.value)}
              error={zipError}
            />
          </div>

          {/* Localidade */}
          <div className="partner-field-group">
            <FloatingField
              label="Localidade"
              value={partnerData.city}
              onChange={(e) => setPartnerData("city", e.target.value)}
            />
          </div>

          {/* Rua */}
          <div className="partner-field-group ">
            <FloatingField
              label="Rua"
              value={partnerData.street}
              onChange={(e) => setPartnerData("street", e.target.value)}
            />
          </div>

          {/* Porta */}
          <div className="partner-field-group">
            <FloatingField
              label="Porta"
              value={partnerData.door}
              onChange={(e) => setPartnerData("door", e.target.value)}
            />
          </div>

          {/* Andar */}
          <div className="partner-field-group">
            <FloatingField
              label="Andar"
              value={partnerData.floor}
              onChange={(e) => setPartnerData("floor", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidenceInfo;
