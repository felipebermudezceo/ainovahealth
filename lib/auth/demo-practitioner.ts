import type { SessionPractitioner } from "@/types/next-auth";
import { DEMO_PRACTITIONER_EMAIL, isDemoMode } from "@/lib/auth/demo";

export const DEMO_PRACTITIONER: SessionPractitioner = {
  id: "demo-practitioner",
  fullName: "Dra. Camila Restrepo",
  email: DEMO_PRACTITIONER_EMAIL,
  specialty: "Medicina General",
  license: "RM-DEMO",
  isActive: true,
};

export const DEMO_PRACTITIONER_PROFILE = {
  fullName: DEMO_PRACTITIONER.fullName,
  specialty: DEMO_PRACTITIONER.specialty,
  email: DEMO_PRACTITIONER.email,
  license: DEMO_PRACTITIONER.license,
  phone: "+57 300 000 0000",
  city: "Bogotá",
} as const;

export function getDemoPractitioner(): SessionPractitioner {
  if (!isDemoMode()) {
    throw new Error("El usuario demo solo existe cuando DEMO_MODE=true.");
  }
  return DEMO_PRACTITIONER;
}

export async function ensureDemoPractitioner(): Promise<SessionPractitioner> {
  return getDemoPractitioner();
}
