import { isDemoMode, isVisibleInCurrentMode, patientScopeWhere } from "@/lib/auth/demo";
import { getDemoPatient, listDemoPatients } from "@/lib/demo/portal-data";
import { requirePractitioner } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import type { OperationalStatusValue } from "./constants";
import { formatBirthDate, formatUpdatedAt } from "./validation";

export type PatientListItem = {
  id: string;
  displayCode: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  sex: string;
  phone: string | null;
  city: string | null;
  operationalStatus: OperationalStatusValue;
  updatedAt: string;
};

export type PatientDetail = PatientListItem & {
  email: string | null;
  address: string | null;
  createdAt: string;
};

function toListItem(patient: {
  id: string;
  displayCode: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: Date;
  sex: string;
  phone: string | null;
  city: string | null;
  operationalStatus: OperationalStatusValue;
  updatedAt: Date;
}): PatientListItem {
  return {
    id: patient.id,
    displayCode: patient.displayCode,
    fullName: patient.fullName,
    documentType: patient.documentType,
    documentNumber: patient.documentNumber,
    birthDate: formatBirthDate(patient.birthDate),
    sex: patient.sex,
    phone: patient.phone,
    city: patient.city,
    operationalStatus: patient.operationalStatus,
    updatedAt: formatUpdatedAt(patient.updatedAt),
  };
}

export async function listPatients(query?: string): Promise<PatientListItem[]> {
  await requirePractitioner();
  if (isDemoMode()) {
    return listDemoPatients(query);
  }
  const q = query?.trim();
  const search = q
    ? {
        OR: [
          { fullName: { contains: q, mode: "insensitive" as const } },
          { documentNumber: { contains: q, mode: "insensitive" as const } },
          { displayCode: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const patients = await prisma.patient.findMany({
    where: search
      ? { AND: [patientScopeWhere(), search] }
      : patientScopeWhere(),
    orderBy: { updatedAt: "desc" },
    take: 200,
  });

  return patients.map(toListItem);
}

export async function getPatient(id: string): Promise<PatientDetail | null> {
  await requirePractitioner();
  if (isDemoMode()) {
    return getDemoPatient(id);
  }
  const patient = await prisma.patient.findUnique({ where: { id } });
  if (!patient || !isVisibleInCurrentMode(patient.displayCode)) return null;

  return {
    ...toListItem(patient),
    email: patient.email,
    address: patient.address,
    createdAt: formatUpdatedAt(patient.createdAt),
  };
}
