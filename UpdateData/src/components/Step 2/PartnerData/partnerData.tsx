import React, { useEffect } from "react";
import { useStepStore } from "../../../store/store";
import StepProgress from "../../Navigation/stepProgress";
import PersonalInfo from "./PersonalInfo/personalInfo";
import DocumentInfo from "./DocumentInfo/documentInfo";
import ResidenceInfo from "./ResidenceInfo/residenceInfo";
import ProfessionalInfo from "./ProfessionalInfo/professionalInfo";
import CompanyInfo from "./CompanyInfo/companyInfo";
import StepNavigation from "../../Navigation/navigation";
import "../../../styles/Step 2/PartnerData/partnerData.css";

const PartnerData: React.FC = () => {
  const {
    setStep,
    setTitle,
    isPersonalInfoValid,
    isDocumentInfoValid,
    isResidenceInfoValid,
    isProfessionalInfoValid,
    isCompanyInfoValid,
    setFormComplete,
  } = useStepStore();

  useEffect(() => {
    setStep(2);
    setTitle("Atualizar dados");
  }, [setStep, setTitle]);

  useEffect(() => {
    const allValid =
      isPersonalInfoValid &&
      isDocumentInfoValid &&
      isResidenceInfoValid &&
      isProfessionalInfoValid &&
      isCompanyInfoValid;

    setFormComplete(allValid);
  }, [
    isPersonalInfoValid,
    isDocumentInfoValid,
    isResidenceInfoValid,
    isProfessionalInfoValid,
    isCompanyInfoValid,
    setFormComplete,
  ]);

  return (
    <div className="partner-wrapper">
      <StepProgress />
      <PersonalInfo />
      <DocumentInfo />
      <ResidenceInfo />
      <ProfessionalInfo />
      <CompanyInfo />
      <StepNavigation />
    </div>
  );
};

export default PartnerData;
