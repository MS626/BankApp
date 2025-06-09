import React, { useState } from "react";
import "../../../styles/Step 2/PartnerData/floatingField.css";

interface FloatingFieldProps {
  label: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: string[];
  type?: string;
  disabled?: boolean;
  flag?: string;
  error?: string | null;
}

const FloatingField: React.FC<FloatingFieldProps> = ({
  label,
  value = "",
  onChange,
  options,
  type = "text",
  disabled = false,
  flag,
  error,
}) => {
  const [inputType, setInputType] = useState(type);

  if (disabled && flag) {
    return (
      <div className="floating-flag-disabled">
        <div className="disabled-box">
          <img src={`https://flagcdn.com/${flag}.svg`} alt={flag} />
          <div className="label-value">
            <label className="disabled-label">{label}</label>
            <span>{value}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`floating-field ${disabled ? "disabled" : ""}`}>
      <label>{label}</label>
      {options ? (
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={!value ? "empty" : ""}
        >
          <option value="" disabled hidden></option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type === "date" ? inputType : type}
          inputMode={type === "date" ? "none" : undefined}
          placeholder=""
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            if (type === "date") {
              setInputType("date");
              e.target.showPicker?.();
            }
          }}
          onBlur={(e) => {
            if (type === "date" && !e.target.value) {
              setInputType("text");
            }
          }}
          disabled={disabled}
          className={error ? "error" : ""}
        />
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FloatingField;
