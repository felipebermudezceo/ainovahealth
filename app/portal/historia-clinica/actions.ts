"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  isPrismaUniqueConflict,
  prisma,
  type PrismaTransactionClient,
} from "@/lib/db/prisma";
import {
  ageYearsAt,
  dateFromYmd,
  nowInBogota,
  timeFromHm,
} from "@/lib/encounters/datetime";
import { getEncounterEditor } from "@/lib/encounters/queries";
import type {
  ClinicalFormValues,
  EncounterStatusResult,
  SaveDraftResult,
} from "@/lib/encounters/types";
import {
  parseDraftForm,
  validateFinalizeFromRecord,
} from "@/lib/encounters/validation";
import { requirePractitioner } from "@/lib/auth/session";

async function requireActivePractitioner() {
  const sessionPractitioner = await requirePractitioner();
  const practitioner = await prisma.practitioner.findUnique({
    where: { id: sessionPractitioner.id },
    select: {
      id: true,
      fullName: true,
      specialty: true,
      license: true,
      email: true,
      isActive: true,
    },
  });
  if (!practitioner?.isActive) {
    redirect("/portal/login");
  }
  return practitioner;
}

function revalidateEncounter(encounterId: string, patientId: string) {
  revalidatePath(`/portal/historia-clinica/${encounterId}`);
  revalidatePath(`/portal/pacientes/${patientId}`);
  revalidatePath("/portal/historia-clinica");
}

export async function createDraftEncounter(patientId: string) {
  const practitioner = await requireActivePractitioner();
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    select: { id: true },
  });
  if (!patient) {
    throw new Error("Paciente no encontrado");
  }
  const attendingId = practitioner.id;
  const now = nowInBogota();
  const encounter = await prisma.encounter.create({
    data: {
      patientId: patient.id,
      practitionerId: attendingId,
      attendedOn: dateFromYmd(now.date),
      attendedAtTime: timeFromHm(now.time),
      attentionType: "home_visit",
      status: "draft",
      version: 1,
    },
    select: { id: true },
  });

  redirect(`/portal/historia-clinica/${encounter.id}`);
}

export async function saveDraftEncounter(input: {
  encounterId: string;
  patientId: string;
  version: number;
  form: ClinicalFormValues;
}): Promise<SaveDraftResult> {
  const practitioner = await requireActivePractitioner();
  const parsed = parseDraftForm(input.form, {
    encounterId: input.encounterId,
    patientId: input.patientId,
    version: input.version,
  });
  if ("error" in parsed) return parsed;

  try {
    await prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const current = await tx.encounter.findUnique({
        where: { id: parsed.encounterId },
        select: {
          id: true,
          patientId: true,
          practitionerId: true,
          status: true,
          version: true,
        },
      });

      if (!current) {
        throw new Error("NOT_FOUND");
      }
      if (current.patientId !== parsed.patientId) {
        throw new Error("PATIENT_MISMATCH");
      }
      if (current.practitionerId !== practitioner.id) {
        throw new Error("NOT_ATTENDING");
      }
      if (current.status === "finished") {
        throw new Error("FINISHED");
      }
      if (current.version !== parsed.version) {
        throw new Error("VERSION");
      }

      const updated = await tx.encounter.updateMany({
        where: {
          id: parsed.encounterId,
          version: parsed.version,
          status: { not: "finished" },
        },
        data: {
          attendedOn: dateFromYmd(parsed.date),
          attendedAtTime: timeFromHm(parsed.time),
          attentionType: parsed.attentionType,
          modality: parsed.modality || null,
          attentionAddress: parsed.attentionAddress || null,
          currentMedsStatus: parsed.currentMedsStatus,
          closingNotes: parsed.closingNotes || null,
          version: { increment: 1 },
        },
      });

      if (updated.count !== 1) {
        throw new Error("VERSION");
      }

      await tx.patient.update({
        where: { id: parsed.patientId },
        data: {
          fullName: parsed.fullName,
          documentType: parsed.documentType,
          documentNumber: parsed.documentNumber,
          birthDate: dateFromYmd(parsed.birthDate),
          sex: parsed.sex,
          phone: parsed.phone || null,
          email: parsed.email || null,
          address: parsed.address || null,
          city: parsed.city || null,
        },
      });

      if (parsed.emergencyName && parsed.emergencyPhone) {
        const existing = await tx.emergencyContact.findFirst({
          where: { patientId: parsed.patientId },
          orderBy: { isPrimary: "desc" },
        });
        const emergencyData = {
          name: parsed.emergencyName,
          relation: parsed.emergencyRelation || "No registrado",
          phone: parsed.emergencyPhone,
          isPrimary: true,
        };
        if (existing) {
          await tx.emergencyContact.update({
            where: { id: existing.id },
            data: emergencyData,
          });
        } else {
          await tx.emergencyContact.create({
            data: { patientId: parsed.patientId, ...emergencyData },
          });
        }
      }

      const clinicalData = {
        reason: parsed.reason || null,
        illnessOnset: parsed.illnessOnset || null,
        illnessEvolution: parsed.illnessEvolution || null,
        associatedSymptoms: parsed.associatedSymptoms || null,
        previousTreatments: parsed.previousTreatments || null,
        illnessNotes: parsed.illnessNotes || null,
        bp: parsed.bp || null,
        hr: parsed.hr || null,
        rr: parsed.rr || null,
        temperature: parsed.temperature || null,
        spo2: parsed.spo2 || null,
        weight: parsed.weight || null,
        height: parsed.height || null,
        vitalsOther: parsed.vitalsOther || null,
        physicalExam: parsed.physicalExam || null,
        findings: parsed.findings || null,
        diagnosis: parsed.diagnosis || null,
        differentials: parsed.differentials || null,
        evaluationNotes: parsed.evaluationNotes || null,
        treatment: parsed.treatment || null,
        proceduresDone: parsed.proceduresDone || null,
        recommendations: parsed.recommendations || null,
        alarmSigns: parsed.alarmSigns || null,
        followUp: parsed.followUp || null,
        referral: parsed.referral || null,
      };

      await tx.encounterClinical.upsert({
        where: { encounterId: parsed.encounterId },
        create: { encounterId: parsed.encounterId, ...clinicalData },
        update: clinicalData,
      });

      await tx.encounterReportedMedication.deleteMany({
        where: { encounterId: parsed.encounterId },
      });
      if (parsed.reportedMeds.length > 0) {
        await tx.encounterReportedMedication.createMany({
          data: parsed.reportedMeds.map((item, index) => ({
            encounterId: parsed.encounterId,
            name: item.name,
            dose: item.dose || null,
            frequency: item.frequency || null,
            route: item.route || null,
            indication: item.indication || null,
            notes: item.notes || null,
            sortOrder: index,
          })),
        });
      }

      if (parsed.attentionType === "ear_wash" || parsed.attentionType === "suture") {
        await tx.encounterProcedure.upsert({
          where: { encounterId: parsed.encounterId },
          create: {
            encounterId: parsed.encounterId,
            kind: parsed.attentionType,
            notes: parsed.procedureNotes || null,
            clinicalSchemaPending: true,
          },
          update: {
            kind: parsed.attentionType,
            notes: parsed.procedureNotes || null,
            clinicalSchemaPending: true,
          },
        });
      } else {
        await tx.encounterProcedure.deleteMany({
          where: { encounterId: parsed.encounterId },
        });
      }

      if (parsed.prescribedMeds) {
        await tx.encounterPrescription.upsert({
          where: { encounterId: parsed.encounterId },
          create: {
            encounterId: parsed.encounterId,
            prescribedText: parsed.prescribedMeds,
          },
          update: { prescribedText: parsed.prescribedMeds },
        });
      } else {
        await tx.encounterPrescription.deleteMany({
          where: { encounterId: parsed.encounterId },
        });
      }

      const chartData = {
        antPersonal: parsed.antPersonal || null,
        antSurgical: parsed.antSurgical || null,
        antHospital: parsed.antHospital || null,
        antFamily: parsed.antFamily || null,
        antPharmacological: parsed.antPharmacological || null,
        antToxicological: parsed.antToxicological || null,
        antGyneco: parsed.antGyneco || null,
        antImmunization: parsed.antImmunization || null,
        allergies: parsed.allergies || null,
        currentMedsStatus: parsed.currentMedsStatus,
      };

      await tx.encounterChartSnapshot.upsert({
        where: { encounterId: parsed.encounterId },
        create: { encounterId: parsed.encounterId, ...chartData },
        update: chartData,
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") {
        return { error: "No se encontró esta atención." };
      }
      if (error.message === "PATIENT_MISMATCH") {
        return { error: "Esta atención no pertenece al paciente indicado." };
      }
      if (error.message === "NOT_ATTENDING") {
        return {
          error: "Solo el profesional que atiende esta consulta puede modificarla.",
        };
      }
      if (error.message === "FINISHED") {
        return { error: "Una atención finalizada no se puede modificar." };
      }
      if (error.message === "VERSION") {
        return {
          conflict: true,
          error:
            "Alguien actualizó esta atención. Recargue para no sobrescribir el borrador más reciente.",
        };
      }
    }
    if (isPrismaUniqueConflict(error)) {
      return {
        error: "Ya existe un paciente con ese tipo y número de documento.",
      };
    }
    throw error;
  }

  const saved = await getEncounterEditor(parsed.encounterId);
  if (!saved) {
    return { error: "El borrador se guardó, pero no se pudo recargar esta atención." };
  }

  revalidateEncounter(saved.encounterId, saved.patientId);
  return {
    version: saved.version,
    form: saved.form,
  };
}

export async function markEncounterInReview(input: {
  encounterId: string;
  version: number;
}): Promise<EncounterStatusResult> {
  const practitioner = await requireActivePractitioner();
  const current = await prisma.encounter.findUnique({
    where: { id: input.encounterId },
    select: {
      id: true,
      patientId: true,
      practitionerId: true,
      status: true,
      version: true,
    },
  });

  if (!current) {
    return { error: "No se encontró esta atención." };
  }
  if (current.practitionerId !== practitioner.id) {
    return {
      error: "Solo el profesional que atiende esta consulta puede revisarla.",
    };
  }
  if (current.status === "finished") {
    return {
      alreadyFinished: true,
      error: "Esta atención ya está finalizada y no se puede modificar.",
    };
  }
  if (current.status === "in_review") {
    const editor = await getEncounterEditor(current.id);
    return editor ? { editor } : { error: "No se pudo recargar esta atención." };
  }
  if (current.version !== input.version) {
    return {
      conflict: true,
      error:
        "Alguien actualizó esta atención. Recargue para no sobrescribir el borrador más reciente.",
    };
  }

  const updated = await prisma.encounter.updateMany({
    where: {
      id: current.id,
      version: current.version,
      status: "draft",
    },
    data: {
      status: "in_review",
      version: { increment: 1 },
    },
  });
  if (updated.count !== 1) {
    const latest = await prisma.encounter.findUnique({
      where: { id: current.id },
      select: { status: true },
    });
    if (latest?.status === "finished") {
      return {
        alreadyFinished: true,
        error: "Esta atención ya está finalizada y no se puede modificar.",
      };
    }
    return {
      conflict: true,
      error:
        "Alguien actualizó esta atención. Recargue para no sobrescribir el borrador más reciente.",
    };
  }

  const editor = await getEncounterEditor(current.id);
  if (!editor) {
    return { error: "El estado se actualizó, pero no se pudo recargar esta atención." };
  }
  revalidateEncounter(editor.encounterId, editor.patientId);
  return { editor };
}

export async function finalizeEncounter(input: {
  encounterId: string;
  version: number;
}): Promise<EncounterStatusResult> {
  const practitioner = await requireActivePractitioner();

  try {
    const result = await prisma.$transaction(async (tx: PrismaTransactionClient) => {
      const current = await tx.encounter.findUnique({
        where: { id: input.encounterId },
        include: {
          patient: {
            include: {
              emergencyContacts: { orderBy: { isPrimary: "desc" }, take: 1 },
              antecedents: true,
              allergies: { where: { isActive: true } },
            },
          },
          clinical: true,
          reportedMedications: { orderBy: { sortOrder: "asc" } },
          identitySnapshot: { select: { id: true } },
          chartSnapshot: { select: { id: true } },
        },
      });

      if (!current) {
        throw new Error("NOT_FOUND");
      }
      if (current.practitionerId !== practitioner.id) {
        throw new Error("NOT_ATTENDING");
      }
      if (current.status === "finished") {
        throw new Error("ALREADY_FINISHED");
      }
      if (current.status !== "in_review") {
        throw new Error("NOT_IN_REVIEW");
      }
      if (current.version !== input.version) {
        throw new Error("VERSION");
      }

      const attending = await tx.practitioner.findUnique({
        where: { id: current.practitionerId },
        select: {
          id: true,
          fullName: true,
          specialty: true,
          license: true,
          email: true,
          isActive: true,
        },
      });
      if (!attending?.isActive) {
        throw new Error("INACTIVE");
      }

      const validation = validateFinalizeFromRecord({
        attendedOn: current.attendedOn,
        attendedAtTime: current.attendedAtTime,
        attentionType: current.attentionType,
        currentMedsStatus: current.currentMedsStatus,
        reportedMedicationNames: current.reportedMedications.map((item) => item.name),
        clinical: current.clinical,
      });
      if (!validation.ok) {
        const error = new Error("INCOMPLETE") as Error & { missingSections: string[] };
        error.missingSections = validation.missingSections;
        throw error;
      }

      if (!current.identitySnapshot) {
        const emergency = current.patient.emergencyContacts[0];
        await tx.encounterIdentitySnapshot.create({
          data: {
            encounterId: current.id,
            patientDisplayCode: current.patient.displayCode,
            fullName: current.patient.fullName,
            documentType: current.patient.documentType,
            documentNumber: current.patient.documentNumber,
            birthDate: current.patient.birthDate,
            ageAtEncounter: ageYearsAt(current.patient.birthDate, current.attendedOn),
            sex: current.patient.sex,
            phone: current.patient.phone,
            email: current.patient.email,
            address: current.patient.address,
            city: current.patient.city,
            emergencyName: emergency?.name ?? null,
            emergencyRelation: emergency?.relation ?? null,
            emergencyPhone: emergency?.phone ?? null,
          },
        });
      }

      if (!current.chartSnapshot) {
        const antecedents = {
          antPersonal: null as string | null,
          antSurgical: null as string | null,
          antHospital: null as string | null,
          antFamily: null as string | null,
          antPharmacological: null as string | null,
          antToxicological: null as string | null,
          antGyneco: null as string | null,
          antImmunization: null as string | null,
        };
        const fieldByType = {
          personal: "antPersonal",
          surgical: "antSurgical",
          hospital: "antHospital",
          family: "antFamily",
          pharmacological: "antPharmacological",
          toxicological: "antToxicological",
          gyneco: "antGyneco",
          immunization: "antImmunization",
        } as const;
        for (const row of current.patient.antecedents) {
          const key = fieldByType[row.type];
          if (!key) continue;
          antecedents[key] = antecedents[key]
            ? `${antecedents[key]}\n${row.content}`
            : row.content;
        }
        await tx.encounterChartSnapshot.create({
          data: {
            encounterId: current.id,
            ...antecedents,
            allergies: current.patient.allergies
              .map((item) => item.description)
              .join("\n") || null,
            currentMedsStatus: current.currentMedsStatus,
          },
        });
      }

      const finalizedAt = new Date();
      const updated = await tx.encounter.updateMany({
        where: {
          id: current.id,
          version: current.version,
          status: "in_review",
        },
        data: {
          status: "finished",
          finalizedAt,
          finalizedById: practitioner.id,
          version: { increment: 1 },
          practitionerNameSnapshot:
            current.practitionerNameSnapshot ?? attending.fullName,
          practitionerSpecialtySnapshot:
            current.practitionerSpecialtySnapshot ?? attending.specialty,
          practitionerLicenseSnapshot:
            current.practitionerLicenseSnapshot ?? attending.license,
          practitionerEmailSnapshot:
            current.practitionerEmailSnapshot ?? attending.email,
        },
      });
      if (updated.count !== 1) {
        throw new Error("VERSION");
      }

      return current.patientId;
    });

    const editor = await getEncounterEditor(input.encounterId);
    if (!editor) {
      return { error: "La atención se finalizó, pero no se pudo recargar." };
    }
    revalidateEncounter(editor.encounterId, result);
    return { editor };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") {
        return { error: "No se encontró esta atención." };
      }
      if (error.message === "NOT_ATTENDING") {
        return {
          error: "Solo el profesional que atiende esta consulta puede finalizarla.",
        };
      }
      if (error.message === "ALREADY_FINISHED") {
        return {
          alreadyFinished: true,
          error: "Esta atención ya está finalizada y no se puede modificar.",
        };
      }
      if (error.message === "INACTIVE") {
        redirect("/portal/login");
      }
      if (error.message === "NOT_IN_REVIEW") {
        return {
          error: "Revisa la historia antes de finalizar la atención.",
        };
      }
      if (error.message === "INCOMPLETE") {
        const missingSections =
          "missingSections" in error && Array.isArray(error.missingSections)
            ? (error.missingSections as string[])
            : [];
        return {
          missingSections,
          error:
            "No se puede finalizar la atención. Completa los campos clínicos obligatorios.",
        };
      }
      if (error.message === "VERSION") {
        return {
          conflict: true,
          error:
            "Alguien actualizó esta atención. Recargue para no sobrescribir el borrador más reciente.",
        };
      }
    }
    return { error: "No se pudo finalizar la atención." };
  }
}
