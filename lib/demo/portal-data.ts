import { DEMO_PRACTITIONER } from "@/lib/auth/demo-practitioner";
import type { EncounterEditorData, EncounterListItem } from "@/lib/encounters/types";
import type { PatientDetail, PatientListItem } from "@/lib/patients/queries";

export const DEMO_WRITE_MESSAGE =
  "En la demostración los datos son de ejemplo y no se guardan. No hay conexión a la base de datos.";

const patients: PatientDetail[] = [
  {
    id: "demo-patient-laura",
    displayCode: "DEMO-0001",
    fullName: "Laura Méndez",
    documentType: "Cédula de ciudadanía",
    documentNumber: "1020304050",
    birthDate: "1992-03-14",
    sex: "Femenino",
    phone: "3001112233",
    email: "laura.mendez@demo.ainovahealth.local",
    address: "Calle 94 # 15-20",
    city: "Bogotá",
    operationalStatus: "active",
    updatedAt: "12 sept 2026, 10:20 a. m.",
    createdAt: "01 sept 2026, 9:00 a. m.",
  },
  {
    id: "demo-patient-andres",
    displayCode: "DEMO-0002",
    fullName: "Andrés Castillo",
    documentType: "Cédula de ciudadanía",
    documentNumber: "79800112",
    birthDate: "1985-07-22",
    sex: "Masculino",
    phone: "3105556677",
    email: "andres.castillo@demo.ainovahealth.local",
    address: "Cra 7 # 45-10",
    city: "Bogotá",
    operationalStatus: "active",
    updatedAt: "10 sept 2026, 4:15 p. m.",
    createdAt: "02 sept 2026, 11:30 a. m.",
  },
  {
    id: "demo-patient-valentina",
    displayCode: "DEMO-0003",
    fullName: "Valentina Rojas",
    documentType: "Tarjeta de identidad",
    documentNumber: "1098765432",
    birthDate: "2018-01-09",
    sex: "Femenino",
    phone: "3158889900",
    email: null,
    address: "Av. Suba # 128-40",
    city: "Bogotá",
    operationalStatus: "follow_up",
    updatedAt: "8 sept 2026, 3:00 p. m.",
    createdAt: "03 sept 2026, 8:45 a. m.",
  },
  {
    id: "demo-patient-jorge",
    displayCode: "DEMO-0004",
    fullName: "Jorge Palacios",
    documentType: "Cédula de ciudadanía",
    documentNumber: "17123456",
    birthDate: "1959-11-02",
    sex: "Masculino",
    phone: "3012223344",
    email: "jorge.palacios@demo.ainovahealth.local",
    address: "Calle 26 # 69-76",
    city: "Bogotá",
    operationalStatus: "active",
    updatedAt: "5 sept 2026, 9:40 a. m.",
    createdAt: "04 sept 2026, 2:10 p. m.",
  },
  {
    id: "demo-patient-diana",
    displayCode: "DEMO-0005",
    fullName: "Diana Herrera",
    documentType: "Cédula de ciudadanía",
    documentNumber: "52998877",
    birthDate: "1997-05-18",
    sex: "Femenino",
    phone: "3204445566",
    email: "diana.herrera@demo.ainovahealth.local",
    address: "Cra 15 # 93-07",
    city: "Bogotá",
    operationalStatus: "closed",
    updatedAt: "1 sept 2026, 5:05 p. m.",
    createdAt: "20 ago 2026, 10:00 a. m.",
  },
];

type DemoEncounter = EncounterListItem & {
  patientId: string;
  patientName: string;
  displayCode: string;
  editor: EncounterEditorData;
};

function demoForm(
  patient: PatientDetail,
  extras: Partial<EncounterEditorData["form"]>,
): EncounterEditorData["form"] {
  return {
    fullName: patient.fullName,
    documentType: patient.documentType,
    documentNumber: patient.documentNumber,
    birthDate: patient.birthDate,
    sex: patient.sex,
    phone: patient.phone ?? "",
    email: patient.email ?? "",
    patientAddress: patient.address ?? "",
    city: patient.city ?? "",
    emergencyName: "Contacto demo",
    emergencyRelation: "Familiar",
    emergencyPhone: "3000000000",
    date: "2026-09-12",
    time: "10:20",
    professional: DEMO_PRACTITIONER.fullName,
    attentionType: "Visita domiciliaria",
    modality: "Domicilio",
    attentionAddress: patient.address ?? "",
    reason: "Consulta de demostración",
    illnessOnset: "Hace 2 días",
    illnessEvolution: "Estable, sin signos de alarma.",
    associatedSymptoms: "Ninguno relevante.",
    previousTreatments: "Ninguno.",
    illnessNotes: "Historia de ejemplo para la presentación.",
    antPersonal: "Sin antecedentes personales relevantes.",
    antSurgical: "Ninguno.",
    antHospital: "Ninguno.",
    antFamily: "No refiere.",
    antPharmacological: "Ninguno.",
    antToxicological: "No refiere.",
    antGyneco: "",
    antImmunization: "Esquema al día.",
    currentMedsStatus: "No",
    reportedMeds: [
      {
        name: "",
        dose: "",
        frequency: "",
        route: "",
        indication: "",
        notes: "",
      },
    ],
    allergies: "No conocidas",
    bp: "120/80",
    hr: "78",
    rr: "16",
    temperature: "36.5",
    spo2: "98",
    weight: "64",
    height: "162",
    vitalsOther: "",
    physicalExam: "Examen físico dentro de límites normales.",
    findings: "Sin hallazgos agudos.",
    diagnosis: "Consulta de control (demo)",
    differentials: "",
    evaluationNotes: "Datos ficticios. No es una atención real.",
    treatment: "Medidas generales y observación.",
    prescribedMeds: "Ninguno.",
    proceduresDone: "",
    recommendations: "Control según evolución.",
    alarmSigns: "Fiebre persistente, dificultad respiratoria.",
    followUp: "En 48 horas si persisten síntomas.",
    referral: "",
    procedureNotes: "",
    closingProfessional: DEMO_PRACTITIONER.fullName,
    finishedAt: "",
    closingNotes: "",
    signatureNote: "Mecanismo de firma/autenticación pendiente de definir",
    ...extras,
  };
}

function demoEditor(
  encounterId: string,
  patient: PatientDetail,
  status: EncounterEditorData["status"],
  form: EncounterEditorData["form"],
  finalized?: { at: string; by: string },
): EncounterEditorData {
  return {
    encounterId,
    patientId: patient.id,
    displayCode: patient.displayCode,
    version: 1,
    status,
    finalizedAtLabel: finalized?.at ?? null,
    finalizedByName: finalized?.by ?? null,
    form,
    practitioner: {
      id: DEMO_PRACTITIONER.id,
      fullName: DEMO_PRACTITIONER.fullName,
      specialty: DEMO_PRACTITIONER.specialty,
      license: DEMO_PRACTITIONER.license,
      email: DEMO_PRACTITIONER.email,
    },
  };
}

const laura = patients[0];
const andres = patients[1];
const valentina = patients[2];
const jorge = patients[3];

const encounters: DemoEncounter[] = [
  {
    id: "demo-encounter-laura-1",
    patientId: laura.id,
    patientName: laura.fullName,
    displayCode: laura.displayCode,
    attendedOn: "2026-09-12",
    attendedAtTime: "10:20",
    attentionType: "Visita domiciliaria",
    status: "finished",
    version: 1,
    updatedAt: "12 sept 2026, 10:45 a. m.",
    editor: demoEditor(
      "demo-encounter-laura-1",
      laura,
      "finished",
      demoForm(laura, {
        reason: "Cefalea y malestar general",
        diagnosis: "Cefalea tensional (demo)",
        finishedAt: "12 sept 2026, 10:45 a. m.",
      }),
      { at: "12 sept 2026, 10:45 a. m.", by: DEMO_PRACTITIONER.fullName },
    ),
  },
  {
    id: "demo-encounter-andres-1",
    patientId: andres.id,
    patientName: andres.fullName,
    displayCode: andres.displayCode,
    attendedOn: "2026-09-10",
    attendedAtTime: "16:15",
    attentionType: "Visita domiciliaria",
    status: "in_review",
    version: 1,
    updatedAt: "10 sept 2026, 4:40 p. m.",
    editor: demoEditor(
      "demo-encounter-andres-1",
      andres,
      "in_review",
      demoForm(andres, {
        date: "2026-09-10",
        time: "16:15",
        reason: "Toma de muestra y control",
        diagnosis: "Control de laboratorio (demo)",
        weight: "82",
        height: "176",
      }),
    ),
  },
  {
    id: "demo-encounter-valentina-1",
    patientId: valentina.id,
    patientName: valentina.fullName,
    displayCode: valentina.displayCode,
    attendedOn: "2026-09-08",
    attendedAtTime: "15:00",
    attentionType: "Visita domiciliaria",
    status: "draft",
    version: 1,
    updatedAt: "8 sept 2026, 3:20 p. m.",
    editor: demoEditor(
      "demo-encounter-valentina-1",
      valentina,
      "draft",
      demoForm(valentina, {
        date: "2026-09-08",
        time: "15:00",
        reason: "Valoración pediátrica",
        diagnosis: "Control de crecimiento (demo)",
        weight: "24",
        height: "122",
        antGyneco: "",
      }),
    ),
  },
  {
    id: "demo-encounter-jorge-1",
    patientId: jorge.id,
    patientName: jorge.fullName,
    displayCode: jorge.displayCode,
    attendedOn: "2026-09-05",
    attendedAtTime: "09:40",
    attentionType: "Visita domiciliaria",
    status: "finished",
    version: 1,
    updatedAt: "5 sept 2026, 10:10 a. m.",
    editor: demoEditor(
      "demo-encounter-jorge-1",
      jorge,
      "finished",
      demoForm(jorge, {
        date: "2026-09-05",
        time: "09:40",
        reason: "Control cardiovascular",
        diagnosis: "Electrocardiograma de control (demo)",
        weight: "78",
        height: "170",
        finishedAt: "5 sept 2026, 10:10 a. m.",
      }),
      { at: "5 sept 2026, 10:10 a. m.", by: DEMO_PRACTITIONER.fullName },
    ),
  },
];

function matchesQuery(patient: PatientListItem, query?: string) {
  const q = query?.trim().toLowerCase();
  if (!q) return true;
  return (
    patient.fullName.toLowerCase().includes(q) ||
    patient.documentNumber.toLowerCase().includes(q) ||
    patient.displayCode.toLowerCase().includes(q)
  );
}

export function listDemoPatients(query?: string): PatientListItem[] {
  return patients.filter((patient) => matchesQuery(patient, query));
}

export function getDemoPatient(id: string): PatientDetail | null {
  return patients.find((patient) => patient.id === id) ?? null;
}

export function listDemoPatientEncounters(patientId: string): EncounterListItem[] {
  return encounters
    .filter((encounter) => encounter.patientId === patientId)
    .map(({ patientId: _patientId, patientName: _name, displayCode: _code, editor: _editor, ...item }) => item);
}

export function listDemoRecentEncounters() {
  return encounters.map((encounter) => ({
    id: encounter.id,
    patientId: encounter.patientId,
    patientName: encounter.patientName,
    displayCode: encounter.displayCode,
    attendedOn: encounter.attendedOn,
    attendedAtTime: encounter.attendedAtTime,
    attentionType: encounter.attentionType,
    status: encounter.status,
    version: encounter.version,
    updatedAt: encounter.updatedAt,
  }));
}

export function getDemoEncounterEditor(encounterId: string): EncounterEditorData | null {
  return encounters.find((encounter) => encounter.id === encounterId)?.editor ?? null;
}

export function getDemoEncounterForPatient(patientId: string) {
  return encounters.find((encounter) => encounter.patientId === patientId) ?? null;
}
