import { useEffect, useRef, useState } from "react";
import { ContactField, useStepStore } from "../../../store/store";

import {
  validateInput,
  maskValue,
  isCodeAuthRequired,
  checkIfAnyNeedsVerification,
  isMandatoryInfoComplete,
} from "./contactsHelpers";

export function useContactsLogic() {
  const { setStep, setTitle, setFormComplete, initialFields } = useStepStore();
  const [fields, setFields] = useState<ContactField[]>(initialFields);
  const [verifyingIndex, setVerifyingIndex] = useState<number | null>(null);
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [codeError, setCodeError] = useState(false);
  const [flagDropdownIndex, setFlagDropdownIndex] = useState<number | null>(
    null
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    setStep(2);
    setTitle("Atualizar dados");
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(interval);
  }, [setStep, setTitle]);

  useEffect(() => {
    setFormComplete(isMandatoryInfoComplete(fields));
  }, [fields, setFormComplete]);

  const handleSave = (index: number) => {
    const updated = [...fields];
    const inputValue = updated[index].inputValue;
    const valid = validateInput(updated[index].type, inputValue);
    updated[index].isValid = valid;
    if (!valid) return setFields(updated);

    const valueChanged = inputValue !== updated[index].value;
    updated[index].value = inputValue;
    updated[index].maskedValue = maskValue(inputValue, updated[index].type);
    updated[index].showInput = false;
    updated[index].isEditing = false;

    const needsVerification = isCodeAuthRequired(updated[index]);
    if (needsVerification && valueChanged) {
      updated[index].isVerified = false;
      setVerifyingIndex(index);
      setShowAuthCode(true);
    } else {
      updated[index].isVerified = true;
      setShowAuthCode(checkIfAnyNeedsVerification(updated));
    }

    setFields(updated);
  };

  const handleAdd = (index: number) => {
    const updated = [...fields];
    updated[index].showInput = true;
    updated[index].isEditing = true;
    setFields(updated);
  };

  const handleCancel = (index: number) => {
    const updated = [...fields];
    if (!updated[index].value) {
      updated[index].showInput = false;
    } else {
      updated[index].inputValue = updated[index].value;
      updated[index].showInput = false;
    }
    updated[index].isEditing = false;

    if (showAuthCode && verifyingIndex === index) {
      setShowAuthCode(false);
      setVerifyingIndex(null);
      setCode(["", "", "", "", "", ""]);
    }

    setFields(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...fields];
    updated[index].value = "";
    updated[index].maskedValue = "";
    updated[index].inputValue = "";
    updated[index].showInput = false;
    updated[index].isVerified = false;
    setFields(updated);
  };

  const handleInputChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updated = [...code];
    updated[i] = value;
    setCode(updated);
    setCodeError(false);
  };

  const handleValidate = () => {
    const entered = code.join("");
    if (entered === "123456" && verifyingIndex !== null) {
      const updated = [...fields];
      updated[verifyingIndex].isVerified = true;
      setFields(updated);
      setShowAuthCode(checkIfAnyNeedsVerification(updated));
      setVerifyingIndex(null);
      setCode(["", "", "", "", "", ""]);
    } else {
      setCodeError(true);
    }
  };

  const handleFlagChange = (index: number, newFlag: string) => {
    const updated = [...fields];
    updated[index].flag = newFlag;
    setFields(updated);
  };

  return {
    fields,
    setFields,
    verifyingIndex,
    setVerifyingIndex,
    showAuthCode,
    setShowAuthCode,
    code,
    setCode,
    secondsLeft,
    codeError,
    setCodeError,
    flagDropdownIndex,
    setFlagDropdownIndex,
    inputRefs,
    handleSave,
    handleAdd,
    handleCancel,
    handleDelete,
    handleInputChange,
    handleValidate,
    handleFlagChange,
  };
}
