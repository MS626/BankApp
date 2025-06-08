declare module "#not-for-import/companyUpdateData/store/store" {
    export type ContactField = {
        label: string;
        type: "phone" | "mobile" | "email";
        value: string;
        maskedValue: string;
        flag?: string;
        isEditing: boolean;
        isVerified: boolean;
        showInput: boolean;
        inputValue: string;
        isValid: boolean;
    };
    export interface PartnerDataState {
        fullName: string;
        sex: string;
        nationality: string;
        birthDate: string;
        naturality: string;
        district: string;
        county: string;
        parish: string;
        documentType: string;
        documentCountry: string;
        documentNumber: string;
        documentOptionValidity: string;
        documentValidity: string;
        emissionDate: string;
        nif: string;
        zipcode: string;
        city: string;
        street: string;
        door: string;
        floor: string;
        profession: string;
        currentProfession: string;
        employer: string;
        position: string;
        share: string;
    }
    export const useStepStore: any;
}
declare module "#not-for-import/companyUpdateData/components/Navigation/stepProgress" {
    import React from "react";
    import "../../styles/Navigation/stepProgress.css";
    const StepProgress: React.FC;
    export default StepProgress;
}
declare module "#not-for-import/companyUpdateData/components/Navigation/navigation" {
    import React from "react";
    import "../../styles/Navigation/navigation.css";
    const StepNavigation: React.FC;
    export default StepNavigation;
}
declare module "#not-for-import/companyUpdateData/components/Step 1/initialStep" {
    import React from "react";
    import "../../styles/Step 1/initialStep.css";
    const InitialStep: React.FC;
    export default InitialStep;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/UpdateDocuments/uploadField" {
    import React from "react";
    import "../../../styles/Step 2/UpdateDocuments/uploadField.css";
    type DocumentField = "id" | "nif" | "moradaHabitual" | "moradaFiscal";
    interface UploadFieldProps {
        label: string;
        helper?: string;
        id: DocumentField;
        file: File | null;
        onFileChange: (file: File | null) => void;
    }
    const UploadField: React.FC<UploadFieldProps>;
    export default UploadField;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/UpdateDocuments/updateDocuments" {
    import React from "react";
    import "../../../styles/Step 2/UpdateDocuments/updateDocuments.css";
    const UpdateDocuments: React.FC;
    export default UpdateDocuments;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/hooks/useSexTypes" {
    interface SexType {
        label: string;
        value: string;
    }
    export const useSexTypes: () => {
        sexTypes: SexType[];
    };
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/hooks/useDistricts" {
    interface District {
        name: string;
    }
    export const useDistricts: () => {
        districts: District[];
    };
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/hooks/useMunicipalities" {
    interface Municipality {
        name: string;
    }
    export const useMunicipalities: (districtName: string) => {
        municipalities: Municipality[];
    };
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/hooks/useParishes" {
    interface Parish {
        name: string;
    }
    export const useParishes: (municipalityName: string) => {
        parishes: Parish[];
    };
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/floatingField" {
    import React from "react";
    import "../../../styles/Step 2/PartnerData/floatingField.css";
    interface FloatingFieldProps {
        label: string;
        value?: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
        options?: string[];
        type?: string;
        disabled?: boolean;
        flag?: string;
    }
    const FloatingField: React.FC<FloatingFieldProps>;
    export default FloatingField;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/PersonalInfo/personalInfo" {
    import React from "react";
    import "../../../../styles/Step 2/PartnerData/PersonalInfo/personalInfo.css";
    const DocumentInfoBlock: React.FC;
    export default DocumentInfoBlock;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/hooks/useIdentificationDocuments" {
    interface IdentificationDocument {
        name: string;
    }
    export const UseIdentificationDocuments: () => {
        documents: IdentificationDocument[];
    };
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/DocumentInfo/documentInfo" {
    import React from "react";
    import "../../../../styles/Step 2/PartnerData/DocumentInfo/documentInfo.css";
    const DocumentInfoBlock: React.FC;
    export default DocumentInfoBlock;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/ResidenceInfo/residenceInfo" {
    import React from "react";
    import "../../../../styles/Step 2/PartnerData/ResidenceInfo/residenceInfo.css";
    const ResidenceInfo: React.FC;
    export default ResidenceInfo;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/hooks/useProfessionalStatus" {
    interface ProfessionalStatus {
        name: string;
    }
    export const UseProfessionalStatus: () => {
        status: ProfessionalStatus[];
    };
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/ProfessionalInfo/professionalInfo" {
    import React from "react";
    import "../../../../styles/Step 2/PartnerData/ProfessionalInfo/professionalInfo.css";
    const ProfessionalStatusBlock: React.FC;
    export default ProfessionalStatusBlock;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/CompanyInfo/companyInfo" {
    import React from "react";
    import "../../../../styles/Step 2/PartnerData/CompanyInfo/companyInfo.css";
    const PartnerShareBlock: React.FC;
    export default PartnerShareBlock;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/PartnerData/partnerData" {
    import React from "react";
    import "../../../styles/Step 2/PartnerData/partnerData.css";
    const PartnerData: React.FC;
    export default PartnerData;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/Contacts/contactsHelpers" {
    import { ContactField } from "#not-for-import/companyUpdateData/store/store";
    export const validateInput: (type: string, value: string) => boolean;
    export const maskValue: (value: string, type: "phone" | "mobile" | "email") => string;
    export const formatAndCleanPhoneInput: (raw: string) => string;
    export const isCodeAuthRequired: (field: ContactField) => boolean;
    export const checkIfAnyNeedsVerification: (fields: ContactField[]) => boolean;
    export const isMandatoryInfoComplete: (fields: ContactField[]) => boolean;
}
declare module "#not-for-import/companyUpdateData/components/Step 2/Contacts/useContactsLogic" {
    import { ContactField } from "#not-for-import/companyUpdateData/store/store";
    export function useContactsLogic(): {
        fields: ContactField[];
        setFields: import("react").Dispatch<import("react").SetStateAction<ContactField[]>>;
        verifyingIndex: number | null;
        setVerifyingIndex: import("react").Dispatch<import("react").SetStateAction<number | null>>;
        showAuthCode: boolean;
        setShowAuthCode: import("react").Dispatch<import("react").SetStateAction<boolean>>;
        code: string[];
        setCode: import("react").Dispatch<import("react").SetStateAction<string[]>>;
        secondsLeft: number;
        codeError: boolean;
        setCodeError: import("react").Dispatch<import("react").SetStateAction<boolean>>;
        flagDropdownIndex: number | null;
        setFlagDropdownIndex: import("react").Dispatch<import("react").SetStateAction<number | null>>;
        inputRefs: import("react").MutableRefObject<HTMLInputElement[]>;
        handleSave: (index: number) => void;
        handleAdd: (index: number) => void;
        handleCancel: (index: number) => void;
        handleDelete: (index: number) => void;
        handleInputChange: (i: number, value: string) => void;
        handleValidate: () => void;
        handleFlagChange: (index: number, newFlag: string) => void;
    };
}
declare module "#not-for-import/companyUpdateData/components/Step 2/Contacts/contacts" {
    import React from "react";
    import "../../../styles/Step 2/contacts.css";
    const Contacts: React.FC;
    export default Contacts;
}
declare module "#not-for-import/companyUpdateData/components/Step 3/documents" {
    import React from "react";
    import "../../styles/Step 3/documents.css";
    const Documents: React.FC;
    export default Documents;
}
declare module "#not-for-import/companyUpdateData/components/Step 4/conclusion" {
    import React from "react";
    import "../../styles/Step 4/conclusion.css";
    const Conclusion: React.FC;
    export default Conclusion;
}
declare module "companyUpdateData/App" {
    import React from "react";
    import "./App.css";
    const App: React.FC;
    export default App;
}
