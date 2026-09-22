import type { EncounterStatusValue } from "./constants";

export type ReportedMedicationInput = {
  name: string;
  dose: string;
  frequency: string;
  route: string;
  indication: string;
  notes: string;
};

export type ClinicalFormValues = {
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  sex: string;
  phone: string;
  email: string;
  patientAddress: string;
  city: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  date: string;
  time: string;
  professional: string;
  attentionType: string;
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
  currentMedsStatus: "Sí" | "No" | "No sabe";
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
  closingProfessional: string;
  finishedAt: string;
  closingNotes: string;
  signatureNote: string;
};

export type EncounterEditorData = {
  encounterId: string;
  patientId: string;
  displayCode: string;
  version: number;
  status: EncounterStatusValue;
  finalizedAtLabel: string | null;
  finalizedByName: string | null;
  form: ClinicalFormValues;
  practitioner: {
    id: string;
    fullName: string;
    specialty: string;
    license: string;
    email: string;
  };
};

export type EncounterListItem = {
  id: string;
  attendedOn: string;
  attendedAtTime: string;
  attentionType: string;
  status: EncounterStatusValue;
  version: number;
  updatedAt: string;
};

export type SaveDraftResult = {
  error?: string;
  conflict?: boolean;
  version?: number;
  form?: ClinicalFormValues;
};

export type EncounterStatusResult = {
  error?: string;
  conflict?: boolean;
  alreadyFinished?: boolean;
  missingSections?: string[];
  editor?: EncounterEditorData;
};
