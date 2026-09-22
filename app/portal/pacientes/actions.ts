"use server";

import { redirect } from "next/navigation";
import { isPrismaUniqueConflict, prisma } from "@/lib/db/prisma";
import { nextPatientDisplayCode } from "@/lib/patients/codes";
import {
  parsePatientForm,
  type PatientFormState,
  type PatientInput,
} from "@/lib/patients/validation";

function toBirthDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

function persistFields(input: PatientInput) {
  return {
    fullName: input.fullName,
    documentType: input.documentType,
    documentNumber: input.documentNumber,
    birthDate: toBirthDate(input.birthDate),
    sex: input.sex,
    phone: input.phone || null,
    email: input.email || null,
    address: input.address || null,
    city: input.city || null,
    operationalStatus: input.operationalStatus,
  };
}

function duplicateError(error: unknown): PatientFormState | null {
  if (isPrismaUniqueConflict(error)) {
    return {
      error: "Ya existe un paciente con ese tipo y número de documento.",
    };
  }
  return null;
}

export async function createPatient(
  _prev: PatientFormState,
  formData: FormData,
): Promise<PatientFormState> {
  const parsed = parsePatientForm(formData);
  if ("error" in parsed && parsed.error) return parsed;

  const input = parsed as PatientInput;
  let patientId: string;
  try {
    const patient = await prisma.patient.create({
      data: {
        displayCode: await nextPatientDisplayCode(),
        ...persistFields(input),
      },
      select: { id: true },
    });
    patientId = patient.id;
  } catch (error) {
    const duplicate = duplicateError(error);
    if (duplicate) return duplicate;
    throw error;
  }
  redirect(`/portal/pacientes/${patientId}`);
}

export async function updatePatient(
  id: string,
  _prev: PatientFormState,
  formData: FormData,
): Promise<PatientFormState> {
  const parsed = parsePatientForm(formData);
  if ("error" in parsed && parsed.error) return parsed;

  const input = parsed as PatientInput;
  try {
    await prisma.patient.update({
      where: { id },
      data: persistFields(input),
    });
  } catch (error) {
    const duplicate = duplicateError(error);
    if (duplicate) return duplicate;
    throw error;
  }
  redirect(`/portal/pacientes/${id}`);
}
