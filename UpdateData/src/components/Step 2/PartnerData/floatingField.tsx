import React from "react";
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
}

const FloatingField: React.FC<FloatingFieldProps> = ({
  label,
  value = "",
  onChange,
  options,
  type = "text",
  disabled = false,
}) => {
  const isFilled = !!value;

  return (
    <div className={`floating-field ${disabled ? "disabled" : ""}`}>
      {options ? (
        <select value={value} onChange={onChange} disabled={disabled}>
          <option value="" disabled hidden>
            {label}
          </option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      <label className={isFilled ? "filled" : ""}>{label}</label>
    </div>
  );
};

export default FloatingField;
