import { ContactField } from "../../../store/store";

export const validateInput = (type: string, value: string): boolean => {
  const clean = value.replace(/\s/g, "");
  if (type === "phone") return /^2\d{8}$/.test(clean);
  if (type === "mobile") return /^9\d{8}$/.test(clean);
  if (type === "email") return /^[^\s@]+@[^\s@]+\.(com|pt)$/.test(value);
  return false;
};

export const maskValue = (
  value: string,
  type: "phone" | "mobile" | "email"
): string => {
  if (type === "email") {
    const [user, domain] = value.split("@");
    const visible = user.slice(0, 3);
    const masked = "*".repeat(user.length - 3);
    return `${visible}${masked}@${domain}`;
  }

  const clean = value.replace(/\D/g, "");
  if (clean.length < 9) return value;

  return `${clean.slice(0, 2)}* *** ${clean.slice(-3)}`;
};

export const formatAndCleanPhoneInput = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 9);
  return digits.replace(/(\d{3})(\d{0,3})(\d{0,3})/, (_, a, b, c) =>
    [a, b, c].filter(Boolean).join(" ")
  );
};

export const isCodeAuthRequired = (field: ContactField): boolean =>
  [
    "Telemóvel nacional",
    "Telemóvel estrangeiro",
    "Email principal",
    "Outro email",
  ].includes(field.label);

export const checkIfAnyNeedsVerification = (fields: ContactField[]) =>
  fields.some((f) => isCodeAuthRequired(f) && f.value && !f.isVerified);

export const isMandatoryInfoComplete = (fields: ContactField[]) => {
  const required = [
    "Telefone principal",
    "Telemóvel nacional",
    "Email principal",
  ];
  return required.every((label) => {
    const field = fields.find((f) => f.label === label);
    if (!field || !field.value || !field.isValid) return false;
    if (isCodeAuthRequired(field) && !field.isVerified) return false;
    return true;
  });
};
