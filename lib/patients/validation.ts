import {
  DOCUMENT_TYPES,
  OPERATIONAL_STATUSES,
  SEX_VALUES,
  type OperationalStatusValue,
} from "./constants";

export type PatientInput = {
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  sex: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  operationalStatus: OperationalStatusValue;
};

export type PatientFormState = {
  error?: string;
};

function required(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function parsePatientForm(formData: FormData): PatientInput | PatientFormState {
  const fullName = required(formData.get("fullName"));
  const documentType = required(formData.get("documentType"));
  const documentNumber = required(formData.get("documentNumber"));
  const birthDate = required(formData.get("birthDate"));
  const sex = required(formData.get("sex"));
  const phone = required(formData.get("phone"));
  const email = required(formData.get("email"));
  const address = required(formData.get("address"));
  const city = required(formData.get("city"));
  const operationalStatus = required(formData.get("operationalStatus"));

  if (!fullName || fullName.length < 2) {
    return { error: "El nombre completo es obligatorio." };
  }
  if (!DOCUMENT_TYPES.includes(documentType as (typeof DOCUMENT_TYPES)[number])) {
    return { error: "Seleccione un tipo de documento válido." };
  }
  if (!documentNumber) {
    return { error: "El número de documento es obligatorio." };
  }
  const digits = documentNumber.replace(/\D/g, "");
  if (digits.length < 5 || digits.length > 15) {
    return { error: "El número de documento no tiene un formato válido." };
  }
  if (!birthDate) {
    return { error: "La fecha de nacimiento es obligatoria." };
  }
  const birth = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) {
    return { error: "La fecha de nacimiento no es válida." };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (birth > today) {
    return { error: "La fecha de nacimiento no puede ser futura." };
  }
  if (birth.getFullYear() < 1900) {
    return { error: "La fecha de nacimiento no es válida." };
  }
  if (!SEX_VALUES.includes(sex as (typeof SEX_VALUES)[number])) {
    return { error: "Seleccione un sexo válido." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "El correo no tiene un formato válido." };
  }
  if (!OPERATIONAL_STATUSES.includes(operationalStatus as OperationalStatusValue)) {
    return { error: "Seleccione un estado operativo válido." };
  }

  return {
    fullName,
    documentType,
    documentNumber,
    birthDate,
    sex,
    phone,
    email,
    address,
    city,
    operationalStatus: operationalStatus as OperationalStatusValue,
  };
}

export function formatBirthDate(value: Date) {
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatUpdatedAt(value: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}
