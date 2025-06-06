import { create } from "zustand";

const stepPaths = [
  "dashboard",
  "initialStep",
  "updateDocuments",
  "partnerData",
  "contacts",
  "documents",
  "conclusion",
];

const initialFields: ContactField[] = [
  {
    label: "Telefone principal",
    type: "phone",
    value: "",
    maskedValue: "",
    flag: "pt",
    isEditing: false,
    isVerified: false,
    showInput: false,
    inputValue: "",
    isValid: true,
  },
  {
    label: "Outro telefone",
    type: "phone",
    value: "",
    maskedValue: "",
    flag: "pt",
    isEditing: false,
    isVerified: false,
    showInput: false,
    inputValue: "",
    isValid: true,
  },
  {
    label: "Telemóvel nacional",
    type: "mobile",
    value: "",
    maskedValue: "",
    flag: "pt",
    isEditing: false,
    isVerified: false,
    showInput: false,
    inputValue: "",
    isValid: true,
  },
  {
    label: "Telemóvel estrangeiro",
    type: "mobile",
    value: "",
    maskedValue: "",
    flag: "gb",
    isEditing: false,
    isVerified: false,
    showInput: false,
    inputValue: "",
    isValid: true,
  },
  {
    label: "Email principal",
    type: "email",
    value: "",
    maskedValue: "",
    isEditing: false,
    isVerified: false,
    showInput: false,
    inputValue: "",
    isValid: true,
  },
  {
    label: "Outro email",
    type: "email",
    value: "",
    maskedValue: "",
    isEditing: false,
    isVerified: false,
    showInput: false,
    inputValue: "",
    isValid: true,
  },
];

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
  hasSecondNationality: string;
  hasForeignTaxes: string;
}

interface StepState {
  currentStep: number;
  currentNavStep: number;
  stepTitle: string;
  isFormComplete: boolean;
  stepPaths: string[];
  initialFields: ContactField[];
  documents: {
    id: File | null;
    nif: File | null;
    moradaHabitual: File | null;
    moradaFiscal: File | null;
  };
  documentErrors: {
    id: string | null;
    nif: string | null;
    moradaHabitual: string | null;
    moradaFiscal: string | null;
  };
  acceptedDocuments: boolean[];
  code: string;
  partnerData: PartnerDataState;

  setStep: (step: number) => void;
  setNavStep: (step: number) => void;
  setTitle: (title: string) => void;
  setFormComplete: (complete: boolean) => void;
  updateDocument: (field: keyof StepState["documents"], file: File | null) => void;
  setDocumentError: (field: keyof StepState["documentErrors"], message: string | null) => void;
  acceptDocument: (index: number) => void;
  setPartnerData: (field: keyof PartnerDataState, value: string) => void;
}

export const useStepStore = create<StepState>((set) => ({
  currentStep: 0,
  currentNavStep: 1,
  stepTitle: "Dados do Cliente",
  isFormComplete: false,
  stepPaths,
  initialFields,
  documents: {
    id: null,
    nif: null,
    moradaHabitual: null,
    moradaFiscal: null,
  },
  documentErrors: {
    id: null,
    nif: null,
    moradaHabitual: null,
    moradaFiscal: null,
  },
  acceptedDocuments: [false, false],
  code: "123456",
  partnerData: {
    fullName: "",
    sex: "",
    nationality: "",
    birthDate: "",
    naturality: "",
    district: "",
    county: "",
    parish: "",
    hasSecondNationality: "",
    hasForeignTaxes: "",
  },
  setStep: (step) => set({ currentStep: step }),
  setNavStep: (step) => set({ currentNavStep: step }),
  setTitle: (title) => set({ stepTitle: title }),
  setFormComplete: (complete) => set({ isFormComplete: complete }),
  updateDocument: (field, file) =>
    set((state) => ({
      documents: {
        ...state.documents,
        [field]: file,
      },
    })),
  setDocumentError: (field, message) =>
    set((state) => ({
      documentErrors: {
        ...state.documentErrors,
        [field]: message,
      },
    })),
  acceptDocument: (index) =>
    set((state) => {
      const updated = [...state.acceptedDocuments];
      updated[index] = true;
      return { acceptedDocuments: updated };
    }),
  setPartnerData: (field, value) =>
    set((state) => ({
      partnerData: {
        ...state.partnerData,
        [field]: value,
      },
    })),
}));
