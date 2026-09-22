import {
  DOCUMENT_TYPES,
  SEX_VALUES,
} from "@/lib/patients/constants";
import {
  ATTENTION_TYPE_BY_LABEL,
  MEDS_STATUS_BY_LABEL,
  type AttentionTypeValue,
  type MedsStatusValue,
} from "./constants";
import type { ClinicalFormValues, ReportedMedicationInput } from "./types";

export type ParsedDraftInput = {
  encounterId: string;
  patientId: string;
  version: number;
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  sex: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  date: string;
  time: string;
  attentionType: AttentionTypeValue;
  modality: string;
  attentionAddress: string;
  reason: string;
  illnessOnset: string;
  illnessEvolution: string;
  associatedSymptoms: string;
  previousTreatments: string;
  illnessNotes: string;
  antPersonal: string;
  antSurgical: string;
  antHospital: string;
  antFamily: string;
  antPharmacological: string;
  antToxicological: string;
  antGyneco: string;
  antImmunization: string;
  currentMedsStatus: MedsStatusValue;
  reportedMeds: ReportedMedicationInput[];
  allergies: string;
  bp: string;
  hr: string;
  rr: string;
  temperature: string;
  spo2: string;
  weight: string;
  height: string;
  vitalsOther: string;
  physicalExam: string;
  findings: string;
  diagnosis: string;
  differentials: string;
  evaluationNotes: string;
  treatment: string;
  prescribedMeds: string;
  proceduresDone: string;
  recommendations: string;
  alarmSigns: string;
  followUp: string;
  referral: string;
  procedureNotes: string;
  closingNotes: string;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseDraftForm(
  form: ClinicalFormValues,
  meta: { encounterId: string; patientId: string; version: number },
): ParsedDraftInput | { error: string } {
  const encounterId = text(meta.encounterId);
  const patientId = text(meta.patientId);
  const version = Number(meta.version);
  const fullName = text(form.fullName);
  const documentType = text(form.documentType);
  const documentNumber = text(form.documentNumber);
  const birthDate = text(form.birthDate);
  const sex = text(form.sex);
  const date = text(form.date);
  const time = text(form.time);
  const attentionType = ATTENTION_TYPE_BY_LABEL[text(form.attentionType)];
  const currentMedsStatus = MEDS_STATUS_BY_LABEL[text(form.currentMedsStatus)];

  if (!encounterId || !patientId) {
    return { error: "Falta la atención o el paciente asociado." };
  }
  if (!Number.isInteger(version) || version < 1) {
    return { error: "La versión del borrador no es válida." };
  }
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
  if (!birthDate || Number.isNaN(new Date(`${birthDate}T00:00:00`).getTime())) {
    return { error: "La fecha de nacimiento no es válida." };
  }
  if (!SEX_VALUES.includes(sex as (typeof SEX_VALUES)[number])) {
    return { error: "Seleccione un sexo válido." };
  }
  if (!date || Number.isNaN(new Date(`${date}T00:00:00`).getTime())) {
    return { error: "La fecha de la atención no es válida." };
  }
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return { error: "La hora de la atención no es válida." };
  }
  if (!attentionType) {
    return { error: "Seleccione un tipo de atención válido." };
  }
  if (!currentMedsStatus) {
    return { error: "Indique si el paciente toma medicamentos." };
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return { error: "El correo no tiene un formato válido." };
  }

  const reportedMeds =
    currentMedsStatus === "yes"
      ? form.reportedMeds
          .map((item) => ({
            name: text(item.name),
            dose: text(item.dose),
            frequency: text(item.frequency),
            route: text(item.route),
            indication: text(item.indication),
            notes: text(item.notes),
          }))
          .filter((item) => item.name)
      : [];

  return {
    encounterId,
    patientId,
    version,
    fullName,
    documentType,
    documentNumber,
    birthDate,
    sex,
    phone: text(form.phone),
    email: text(form.email),
    address: text(form.patientAddress),
    city: text(form.city),
    emergencyName: text(form.emergencyName),
    emergencyRelation: text(form.emergencyRelation),
    emergencyPhone: text(form.emergencyPhone),
    date,
    time,
    attentionType,
    modality: text(form.modality),
    attentionAddress: text(form.attentionAddress),
    reason: text(form.reason),
    illnessOnset: text(form.illnessOnset),
    illnessEvolution: text(form.illnessEvolution),
    associatedSymptoms: text(form.associatedSymptoms),
    previousTreatments: text(form.previousTreatments),
    illnessNotes: text(form.illnessNotes),
    antPersonal: text(form.antPersonal),
    antSurgical: text(form.antSurgical),
    antHospital: text(form.antHospital),
    antFamily: text(form.antFamily),
    antPharmacological: text(form.antPharmacological),
    antToxicological: text(form.antToxicological),
    antGyneco: text(form.antGyneco),
    antImmunization: text(form.antImmunization),
    currentMedsStatus,
    reportedMeds,
    allergies: text(form.allergies),
    bp: text(form.bp),
    hr: text(form.hr),
    rr: text(form.rr),
    temperature: text(form.temperature),
    spo2: text(form.spo2),
    weight: text(form.weight),
    height: text(form.height),
    vitalsOther: text(form.vitalsOther),
    physicalExam: text(form.physicalExam),
    findings: text(form.findings),
    diagnosis: text(form.diagnosis),
    differentials: text(form.differentials),
    evaluationNotes: text(form.evaluationNotes),
    treatment: text(form.treatment),
    prescribedMeds: text(form.prescribedMeds),
    proceduresDone: text(form.proceduresDone),
    recommendations: text(form.recommendations),
    alarmSigns: text(form.alarmSigns),
    followUp: text(form.followUp),
    referral: text(form.referral),
    procedureNotes: text(form.procedureNotes),
    closingNotes: text(form.closingNotes),
  };
}

function hasText(value: string | null | undefined) {
  return Boolean(value && value.trim());
}

export type FinalizeClinicalRecord = {
  attendedOn: Date | null;
  attendedAtTime: Date | null;
  attentionType: string | null;
  currentMedsStatus: string | null;
  reportedMedicationNames: string[];
  clinical: {
    reason: string | null;
    illnessOnset: string | null;
    illnessEvolution: string | null;
    associatedSymptoms: string | null;
    previousTreatments: string | null;
    illnessNotes: string | null;
    physicalExam: string | null;
    findings: string | null;
    diagnosis: string | null;
    evaluationNotes: string | null;
    treatment: string | null;
    recommendations: string | null;
    followUp: string | null;
    referral: string | null;
  } | null;
};

export function validateFinalizeFromRecord(input: FinalizeClinicalRecord) {
  const missingSections: string[] = [];
  const clinical = input.clinical;

  if (!input.attendedOn || !input.attendedAtTime || !input.attentionType) {
    missingSections.push("Datos de la atención (fecha, hora y tipo)");
  }
  if (!hasText(clinical?.reason)) {
    missingSections.push("Motivo de consulta");
  }
  const hasIllness = [
    clinical?.illnessOnset,
    clinical?.illnessEvolution,
    clinical?.associatedSymptoms,
    clinical?.previousTreatments,
    clinical?.illnessNotes,
  ].some(hasText);
  if (!hasIllness) {
    missingSections.push("Enfermedad actual");
  }
  if (!input.currentMedsStatus) {
    missingSections.push("Medicamentos actuales");
  } else if (
    input.currentMedsStatus === "yes" &&
    !input.reportedMedicationNames.some(hasText)
  ) {
    missingSections.push("Medicamentos actuales (indique al menos un medicamento)");
  }
  if (!hasText(clinical?.physicalExam)) {
    missingSections.push("Examen físico");
  }
  const hasEvaluation = [
    clinical?.diagnosis,
    clinical?.findings,
    clinical?.evaluationNotes,
  ].some(hasText);
  if (!hasEvaluation) {
    missingSections.push(
      "Evaluación clínica (diagnóstico, hallazgos u observaciones)",
    );
  }
  const hasPlan = [
    clinical?.treatment,
    clinical?.recommendations,
    clinical?.followUp,
    clinical?.referral,
  ].some(hasText);
  if (!hasPlan) {
    missingSections.push("Plan y conducta");
  }

  if (missingSections.length > 0) {
    return { ok: false as const, missingSections };
  }
  return { ok: true as const };
}
