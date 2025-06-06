import React, { useEffect, useRef, useState } from "react";
import { useStepStore } from "../../store/store";
import StepProgress from "../Navigation/stepProgress";
import StepNavigation from "../Navigation/navigation";
import "../../styles/Step 3/documents.css";

const Documents: React.FC = () => {
  const {
    setStep,
    setTitle,
    acceptedDocuments,
    acceptDocument,
    code,
    setFormComplete,
  } = useStepStore();

  const [showPdf, setShowPdf] = useState<null | number>(null);
  const [inputCode, setInputCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [codeError, setCodeError] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const isAllAccepted = acceptedDocuments.every(Boolean);
  const enteredCode = inputCode.join("");
  const isCodeValid = enteredCode === code;

  useEffect(() => {
    setStep(3);
    setTitle("Atualizar dados");

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);

    return () => clearInterval(interval);
  }, [setStep, setTitle]);

  useEffect(() => {
    if (isAllAccepted && codeValidated) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [isAllAccepted, codeValidated, setFormComplete]);

  const handleAccept = (index: number) => {
    acceptDocument(index);
    setTimeout(() => setShowPdf(null), 100);
  };

  const handleInputChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...inputCode];
    newCode[i] = value;
    setInputCode(newCode);
    setCodeError(false);
    if (value && i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleValidate = () => {
    if (!isCodeValid) {
      setCodeError(true);
    } else {
      setCodeValidated(true);
    }
  };

  return (
    <div className="documentation-wrapper">
      <StepProgress />
      <div className="documentation-container">
        <p className="doc-title">Documentação</p>
        <div className="documents-sub">
          <p className="doc-subtitle">
            Já só falta ler e confirmar estes documentos
          </p>
        </div>

        {[0, 1].map((index) => (
          <div className="doc-box" key={index}>
            <div className="doc-left">
              {acceptedDocuments[index] ? (
                <span className="doc-icon">✔</span>
              ) : (
                <span className="doc-icon">📄</span>
              )}
              <p>
                {index === 0
                  ? "Ficha informação cliente pessoa coletiva"
                  : "Ficha informação beneficiário efetivo"}
              </p>
            </div>
            {acceptedDocuments[index] ? (
              <button className="doc-link" onClick={() => setShowPdf(index)}>
                Consultar documento
              </button>
            ) : (
              <button className="doc-btn" onClick={() => setShowPdf(index)}>
                Ler e Aceitar
              </button>
            )}
          </div>
        ))}

        {showPdf !== null && (
          <div className="pdf-overlay">
            <div className="pdf-container">
              <embed
                src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf#"
                type="application/pdf"
                width="100%"
                height="500px"
              />
              <button
                className="accept-btn"
                onClick={() => handleAccept(showPdf)}
              >
                Aceitar
              </button>
            </div>
          </div>
        )}

        {isAllAccepted && !codeValidated && (
          <div className="auth-code">
            <p className="auth-title">Indique o Código de Autorização</p>
            <p className="auth-sub">O código foi enviado para 91***678</p>
            <div className="code-inputs">
              {inputCode.map((val, i) => (
                <input
                  key={i}
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  ref={(el) => (inputRefs.current[i] = el!)}
                />
              ))}
            </div>
            {codeError && (
              <div className="code-error">
                Código incorreto. Tente novamente.
              </div>
            )}
            <div className="auth-footer">
              <span>
                Envio de um novo código em{" "}
                <strong>{secondsLeft} segundos</strong>
              </span>
              <button
                className={`validate-btn ${isCodeValid ? "active" : ""}`}
                disabled={!isCodeValid}
                onClick={handleValidate}
              >
                Validar
              </button>
            </div>
          </div>
        )}
      </div>
      <StepNavigation />
    </div>
  );
};

export default Documents;
