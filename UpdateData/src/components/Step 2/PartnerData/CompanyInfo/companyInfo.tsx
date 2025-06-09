import React, { useEffect } from "react";
import FloatingField from "../floatingField";
import { useStepStore } from "../../../../store/store";

import "../../../../styles/Step 2/PartnerData/CompanyInfo/companyInfo.css";

const PartnerShareBlock: React.FC = () => {
  const { partnerData, setPartnerData, setBlockValidity } = useStepStore();

  useEffect(() => {
    const isShareValid =
      !!partnerData.share && /^[1-9][0-9]?$|^100$/.test(partnerData.share);
    const isComplete = !!partnerData.position && isShareValid;
    console.log("Validating Company Info:", isComplete);
    setBlockValidity("isCompanyInfoValid", isComplete);
  }, [partnerData, setBlockValidity]);

  return (
    <div className="company-box">
      <p className="company-title">Cargo e quota na Empresa</p>
      <div className="data-box">
        <div className="company-grid">
          {/* Cargo */}
          <div className="partner-field-group">
            <FloatingField
              label="Cargo"
              value={partnerData.position || ""}
              onChange={(e) => setPartnerData("position", e.target.value)}
            />
          </div>

          {/* Quota */}
          <div className="partner-field-group">
            <FloatingField
              label="Quota (%)"
              value={partnerData.share || ""}
              onChange={(e) => setPartnerData("share", e.target.value)}
              error={
                partnerData.share &&
                !/^[1-9][0-9]?$|^100$/.test(partnerData.share)
                  ? "A quota deve estar entre 1% e 100%"
                  : null
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerShareBlock;
