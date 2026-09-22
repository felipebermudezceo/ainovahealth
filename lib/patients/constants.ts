export const DOCUMENT_TYPES = [
  "Cédula de ciudadanía",
  "Cédula de extranjería",
  "Tarjeta de identidad",
  "Pasaporte",
] as const;

export const SEX_VALUES = ["Femenino", "Masculino", "Otro", "No registrado"] as const;

export const OPERATIONAL_STATUSES = ["active", "follow_up", "closed"] as const;

export type OperationalStatusValue = (typeof OPERATIONAL_STATUSES)[number];

export const STATUS_LABELS: Record<OperationalStatusValue, string> = {
  active: "Activo",
  follow_up: "Seguimiento",
  closed: "Cerrado",
};
