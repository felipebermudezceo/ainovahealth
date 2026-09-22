import type { AntecedentType } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { formatUpdatedAt } from "@/lib/patients/validation";
import {
  ANTECEDENT_FIELD_BY_TYPE,
  ATTENTION_TYPE_LABELS,
  MEDS_STATUS_LABELS,
  type EncounterStatusValue,
} from "./constants";
import {
  formatDateTimeBogota,
  formatDateUtc,
  formatTimeUtc,
} from "./datetime";
import type {
  ClinicalFormValues,
  EncounterEditorData,
  EncounterListItem,
} from "./types";

const emptyMed = {
  name: "",
  dose: "",
  frequency: "",
  route: "",
  indication: "",
  notes: "",
};

function emptyAntecedents() {
  return {
    antPersonal: "",
    antSurgical: "",
    antHospital: "",
    antFamily: "",
    antPharmacological: "",
    antToxicological: "",
    antGyneco: "",
    antImmunization: "",
  };
}

function joinByType(
  rows: { type: AntecedentType; content: string }[],
) {
  const grouped = emptyAntecedents();
  for (const row of rows) {
    const key = ANTECEDENT_FIELD_BY_TYPE[row.type];
    if (!key) continue;
    grouped[key] = grouped[key]
      ? `${grouped[key]}\n${row.content}`
      : row.content;
  }
  return grouped;
}

export async function listPatientEncounters(
  patientId: string,
): Promise<EncounterListItem[]> {
  const encounters = await prisma.encounter.findMany({
    where: { patientId },
    orderBy: [{ attendedOn: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      attendedOn: true,
      attendedAtTime: true,
      attentionType: true,
      status: true,
      version: true,
      updatedAt: true,
    },
  });

  return encounters.map((encounter) => ({
    id: encounter.id,
    attendedOn: formatDateUtc(encounter.attendedOn),
    attendedAtTime: formatTimeUtc(encounter.attendedAtTime),
    attentionType: ATTENTION_TYPE_LABELS[encounter.attentionType],
    status: encounter.status,
    version: encounter.version,
    updatedAt: formatUpdatedAt(encounter.updatedAt),
  }));
}

export async function listRecentEncounters(
  take = 40,
): Promise<(EncounterListItem & { patientName: string; displayCode: string; patientId: string })[]> {
  const encounters = await prisma.encounter.findMany({
    orderBy: { updatedAt: "desc" },
    take,
    select: {
      id: true,
      patientId: true,
      attendedOn: true,
      attendedAtTime: true,
      attentionType: true,
      status: true,
      version: true,
      updatedAt: true,
      patient: { select: { fullName: true, displayCode: true } },
    },
  });

  return encounters.map((encounter) => ({
    id: encounter.id,
    patientId: encounter.patientId,
    patientName: encounter.patient.fullName,
    displayCode: encounter.patient.displayCode,
    attendedOn: formatDateUtc(encounter.attendedOn),
    attendedAtTime: formatTimeUtc(encounter.attendedAtTime),
    attentionType: ATTENTION_TYPE_LABELS[encounter.attentionType],
    status: encounter.status,
    version: encounter.version,
    updatedAt: formatUpdatedAt(encounter.updatedAt),
  }));
}

export async function getEncounterEditor(
  encounterId: string,
): Promise<EncounterEditorData | null> {
  const encounter = await prisma.encounter.findUnique({
    where: { id: encounterId },
    include: {
      patient: {
        include: {
          emergencyContacts: { orderBy: { isPrimary: "desc" }, take: 1 },
          antecedents: true,
          allergies: { where: { isActive: true } },
        },
      },
      practitioner: {
        select: {
          id: true,
          fullName: true,
          specialty: true,
          license: true,
          email: true,
        },
      },
      finalizedBy: {
        select: {
          fullName: true,
        },
      },
      clinical: true,
      procedure: true,
      reportedMedications: { orderBy: { sortOrder: "asc" } },
      prescription: true,
      chartSnapshot: true,
      identitySnapshot: true,
    },
  });

  if (!encounter) return null;

  const patient = encounter.patient;
  const identity =
    encounter.status === "finished" ? encounter.identitySnapshot : null;
  const emergency = patient.emergencyContacts[0];
  const clinical = encounter.clinical;
  const chart = encounter.chartSnapshot;
  const practitionerName =
    encounter.practitionerNameSnapshot ?? encounter.practitioner.fullName;
  const practitionerSpecialty =
    encounter.practitionerSpecialtySnapshot ?? encounter.practitioner.specialty;
  const practitionerLicense =
    encounter.practitionerLicenseSnapshot ?? encounter.practitioner.license;
  const practitionerEmail =
    encounter.practitionerEmailSnapshot ?? encounter.practitioner.email;
  const finalizedAtLabel = encounter.finalizedAt
    ? formatDateTimeBogota(encounter.finalizedAt)
    : null;
  const finalizedByName =
    encounter.finalizedBy?.fullName ??
    (encounter.status === "finished" ? practitionerName : null);
  const antecedents = chart
    ? {
        antPersonal: chart.antPersonal ?? "",
        antSurgical: chart.antSurgical ?? "",
        antHospital: chart.antHospital ?? "",
        antFamily: chart.antFamily ?? "",
        antPharmacological: chart.antPharmacological ?? "",
        antToxicological: chart.antToxicological ?? "",
        antGyneco: chart.antGyneco ?? "",
        antImmunization: chart.antImmunization ?? "",
      }
    : joinByType(patient.antecedents);

  const reportedMeds =
    encounter.reportedMedications.length > 0
      ? encounter.reportedMedications.map((item) => ({
          name: item.name,
          dose: item.dose ?? "",
          frequency: item.frequency ?? "",
          route: item.route ?? "",
          indication: item.indication ?? "",
          notes: item.notes ?? "",
        }))
      : [{ ...emptyMed }];

  const form: ClinicalFormValues = {
    fullName: identity?.fullName ?? patient.fullName,
    documentType: identity?.documentType ?? patient.documentType,
    documentNumber: identity?.documentNumber ?? patient.documentNumber,
    birthDate: formatDateUtc(identity?.birthDate ?? patient.birthDate),
    sex: identity?.sex ?? patient.sex,
    phone: identity?.phone ?? patient.phone ?? "",
    email: identity?.email ?? patient.email ?? "",
    patientAddress: identity?.address ?? patient.address ?? "",
    city: identity?.city ?? patient.city ?? "",
    emergencyName: identity?.emergencyName ?? emergency?.name ?? "",
    emergencyRelation: identity?.emergencyRelation ?? emergency?.relation ?? "",
    emergencyPhone: identity?.emergencyPhone ?? emergency?.phone ?? "",
    date: formatDateUtc(encounter.attendedOn),
    time: formatTimeUtc(encounter.attendedAtTime),
    professional: practitionerName,
    attentionType: ATTENTION_TYPE_LABELS[encounter.attentionType],
    modality: encounter.modality ?? "Domicilio",
    attentionAddress: encounter.attentionAddress ?? "",
    reason: clinical?.reason ?? "",
    illnessOnset: clinical?.illnessOnset ?? "",
    illnessEvolution: clinical?.illnessEvolution ?? "",
    associatedSymptoms: clinical?.associatedSymptoms ?? "",
    previousTreatments: clinical?.previousTreatments ?? "",
    illnessNotes: clinical?.illnessNotes ?? "",
    ...antecedents,
    currentMedsStatus: encounter.currentMedsStatus
      ? MEDS_STATUS_LABELS[encounter.currentMedsStatus]
      : "No sabe",
    reportedMeds,
    allergies: chart
      ? (chart.allergies ?? "")
      : patient.allergies.map((item) => item.description).join("\n"),
    bp: clinical?.bp ?? "",
    hr: clinical?.hr ?? "",
    rr: clinical?.rr ?? "",
    temperature: clinical?.temperature ?? "",
    spo2: clinical?.spo2 ?? "",
    weight: clinical?.weight ?? "",
    height: clinical?.height ?? "",
    vitalsOther: clinical?.vitalsOther ?? "",
    physicalExam: clinical?.physicalExam ?? "",
    findings: clinical?.findings ?? "",
    diagnosis: clinical?.diagnosis ?? "",
    differentials: clinical?.differentials ?? "",
    evaluationNotes: clinical?.evaluationNotes ?? "",
    treatment: clinical?.treatment ?? "",
    prescribedMeds: encounter.prescription?.prescribedText ?? "",
    proceduresDone: clinical?.proceduresDone ?? "",
    recommendations: clinical?.recommendations ?? "",
    alarmSigns: clinical?.alarmSigns ?? "",
    followUp: clinical?.followUp ?? "",
    referral: clinical?.referral ?? "",
    procedureNotes: encounter.procedure?.notes ?? "",
    closingProfessional: finalizedByName ?? practitionerName,
    finishedAt: finalizedAtLabel ?? "",
    closingNotes: encounter.closingNotes ?? "",
    signatureNote: "Mecanismo de firma/autenticación pendiente de definir",
  };

  return {
    encounterId: encounter.id,
    patientId: encounter.patientId,
    displayCode: patient.displayCode,
    version: encounter.version,
    status: encounter.status as EncounterStatusValue,
    finalizedAtLabel,
    finalizedByName,
    form,
    practitioner: {
      id: encounter.practitioner.id,
      fullName: practitionerName,
      specialty: practitionerSpecialty,
      license: practitionerLicense,
      email: practitionerEmail,
    },
  };
}
