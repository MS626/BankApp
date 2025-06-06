import React from "react";
import StepProgress from "../../Navigation/stepProgress";
import StepNavigation from "../../Navigation/navigation";
import { useContactsLogic } from "./useContactsLogic";
import { formatAndCleanPhoneInput, maskValue } from "./contactsHelpers";
import "../../../styles/Step 2/contacts.css";

const Contacts: React.FC = () => {
  const {
    fields,
    setFields,
    verifyingIndex,
    showAuthCode,
    code,
    secondsLeft,
    codeError,
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
  } = useContactsLogic();

  const availableFlags = [
    { code: "gb", name: "Reino Unido" },
    { code: "fr", name: "França" },
    { code: "de", name: "Alemanha" },
    { code: "es", name: "Espanha" },
    { code: "us", name: "Estados Unidos" },
    { code: "br", name: "Brasil" },
    { code: "it", name: "Itália" },
  ];

  const isAnyEditing = fields.some((f) => f.showInput);

  const renderFlag = (
    flag: string | undefined,
    isInteractive: boolean,
    onClick?: () => void
  ) =>
    flag ? (
      <img
        className={`flag-icon ${isInteractive ? "clickable" : ""}`}
        src={`https://flagcdn.com/${flag}.svg`}
        alt="flag"
        onClick={onClick}
      />
    ) : null;

  return (
    <div className="contacts-wrapper">
      <StepProgress />
      <div className="contacts-container">
        <p className="contacts-title">
          Estes são os contactos da empresa registados no banco
        </p>
        <div className="contacts-grid">
          {fields.map((field, i) => {
            const isDisabled = showAuthCode && !field.showInput;
            const showDropdown = field.label === "Telemóvel estrangeiro";

            return (
              <div
                className={`contact-row ${isDisabled ? "disabled" : ""}`}
                key={i}
                style={
                  isAnyEditing && !field.showInput
                    ? { pointerEvents: "none", opacity: 0.5 }
                    : {}
                }
              >
                {field.value && !field.isEditing ? (
                  <div className="contact-box">
                    <div className="contact-left">
                      <div className="contact-in">
                        <span className="contact-icon">
                          {field.type === "email"
                            ? "✉️"
                            : field.type === "mobile"
                            ? "📱"
                            : "📞"}
                        </span>
                        <div className="contact-info">
                          <span className="contact-label">{field.label}</span>
                          <span className="contact-value">
                            {showDropdown ? (
                              <div className="flag-dropdown-wrapper">
                                {renderFlag(field.flag, true, () =>
                                  setFlagDropdownIndex(
                                    flagDropdownIndex === i ? null : i
                                  )
                                )}
                                {flagDropdownIndex === i && (
                                  <div className="flag-options">
                                    {availableFlags.map((f) => (
                                      <img
                                        key={f.code}
                                        className="flag-option"
                                        src={`https://flagcdn.com/${f.code}.svg`}
                                        alt={f.name}
                                        onClick={() => {
                                          handleFlagChange(i, f.code);
                                          setFlagDropdownIndex(null);
                                        }}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              renderFlag(field.flag, false)
                            )}
                            {field.maskedValue}
                          </span>
                        </div>
                      </div>
                      <button
                        className="edit-button"
                        onClick={() => handleAdd(i)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ) : field.showInput ? (
                  <div className="contact-box">
                    <div className="contact-left">
                      <div className="contact-in">
                        <span className="contact-icon">
                          {field.type === "email"
                            ? "✉️"
                            : field.type === "mobile"
                            ? "📱"
                            : "📞"}
                        </span>
                        <div className="contact-info">
                          <span className="contact-label">{field.label}</span>
                          <span className="contact-value">
                            {showDropdown ? (
                              <div className="flag-dropdown-wrapper">
                                {renderFlag(field.flag, true, () =>
                                  setFlagDropdownIndex(
                                    flagDropdownIndex === i ? null : i
                                  )
                                )}
                                {flagDropdownIndex === i && (
                                  <div className="flag-options">
                                    {availableFlags.map((f) => (
                                      <img
                                        key={f.code}
                                        className="flag-option"
                                        src={`https://flagcdn.com/${f.code}.svg`}
                                        alt={f.name}
                                        onClick={() => {
                                          handleFlagChange(i, f.code);
                                          setFlagDropdownIndex(null);
                                        }}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              renderFlag(field.flag, false)
                            )}
                            <input
                              type="text"
                              className={`contact-input ${
                                !field.isValid ? "error" : ""
                              }`}
                              value={field.inputValue}
                              onChange={(e) => {
                                const updated = [...fields];
                                const cleaned =
                                  field.type === "email"
                                    ? e.target.value
                                    : formatAndCleanPhoneInput(e.target.value);
                                updated[i].inputValue = cleaned;
                                updated[i].isValid = true;
                                setFields(updated);
                              }}
                            />
                          </span>
                          {!field.isValid && (
                            <span className="error-message">
                              {field.type === "phone"
                                ? "O número fixo deve começar por 2 e ter 9 dígitos"
                                : field.type === "mobile"
                                ? "O número móvel deve começar por 9 e ter 9 dígitos"
                                : "Email inválido"}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className="delete-icon"
                        onClick={() => handleDelete(i)}
                      >
                        ❌
                      </span>
                    </div>
                    <div className="btn-group">
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(i)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(i)}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="add-option" onClick={() => handleAdd(i)}>
                    <div className="add-circle">+</div>
                    {field.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showAuthCode && (
          <div className="auth-coding">
            <p className="auth-title">Indique o Código de Autorização</p>
            <p className="auth-sub">
              O código foi enviado para{" "}
              <strong>
                {verifyingIndex !== null
                  ? maskValue(
                      fields[verifyingIndex].value,
                      fields[verifyingIndex].type
                    )
                  : ""}
              </strong>
            </p>

            <div className="coding-inputs">
              {code.map((val, i) => (
                <input
                  key={i}
                  maxLength={1}
                  value={val}
                  onChange={(e) => {
                    handleInputChange(i, e.target.value);
                    if (e.target.value && i < code.length - 1) {
                      inputRefs.current[i + 1]?.focus();
                    }
                  }}
                  ref={(el) => (inputRefs.current[i] = el!)}
                />
              ))}
            </div>
            {codeError && (
              <div className="coding-error">
                Código incorreto. Tente novamente.
              </div>
            )}
            <div className="auth-footer">
              <span>
                Envio de um novo código em{" "}
                <strong>{secondsLeft} segundos</strong>
              </span>
              <button
                className={`validating-btn ${
                  code.join("").length === 6 ? "active" : ""
                }`}
                disabled={code.join("").length < 6}
                onClick={handleValidate}
              >
                Validar
              </button>
              <button
                className="close-auth"
                onClick={() => {
                  if (verifyingIndex !== null) {
                    handleCancel(verifyingIndex);
                  }
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
      <StepNavigation />
    </div>
  );
};

export default Contacts;
