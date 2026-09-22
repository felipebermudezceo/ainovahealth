export const ATTENTION_TYPE_LABELS = {
  home_visit: "Médico a domicilio",
  ear_wash: "Lavado de oídos",
  suture: "Sutura",
} as const;

export type AttentionTypeValue = keyof typeof ATTENTION_TYPE_LABELS;

export const ATTENTION_TYPE_VALUES = Object.keys(
  ATTENTION_TYPE_LABELS,
) as AttentionTypeValue[];

export const ATTENTION_TYPE_BY_LABEL: Record<string, AttentionTypeValue> = {
  "Médico a domicilio": "home_visit",
  "Lavado de oídos": "ear_wash",
  Sutura: "suture",
};

export const MEDS_STATUS_LABELS = {
  yes: "Sí",
  no: "No",
  unknown: "No sabe",
} as const;

export type MedsStatusValue = keyof typeof MEDS_STATUS_LABELS;

export const MEDS_STATUS_BY_LABEL: Record<string, MedsStatusValue> = {
  Sí: "yes",
  No: "no",
  "No sabe": "unknown",
};

export const ENCOUNTER_STATUS_LABELS = {
  draft: "Borrador",
  in_review: "En revisión",
  finished: "Finalizada",
} as const;

export type EncounterStatusValue = keyof typeof ENCOUNTER_STATUS_LABELS;

export const ANTECEDENT_FIELD_BY_TYPE = {
  personal: "antPersonal",
  surgical: "antSurgical",
  hospital: "antHospital",
  family: "antFamily",
  pharmacological: "antPharmacological",
  toxicological: "antToxicological",
  gyneco: "antGyneco",
  immunization: "antImmunization",
} as const;
