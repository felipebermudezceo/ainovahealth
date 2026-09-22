import type { SessionPractitioner } from "@/types/next-auth";
import { DEMO_PRACTITIONER_EMAIL } from "@/lib/auth/demo";
import { prisma } from "@/lib/db/prisma";

const DEMO_PROFILE = {
  fullName: "Dra. Camila Restrepo",
  specialty: "Medicina General",
  license: "RM-DEMO",
  city: "Demo",
} as const;

let demoPractitioner: SessionPractitioner | undefined;

export async function ensureDemoPractitioner(): Promise<SessionPractitioner> {
  if (demoPractitioner) {
    return demoPractitioner;
  }

  const row = await prisma.practitioner.upsert({
    where: { email: DEMO_PRACTITIONER_EMAIL },
    update: {
      fullName: DEMO_PROFILE.fullName,
      specialty: DEMO_PROFILE.specialty,
      license: DEMO_PROFILE.license,
      city: DEMO_PROFILE.city,
      isActive: true,
    },
    create: {
      fullName: DEMO_PROFILE.fullName,
      email: DEMO_PRACTITIONER_EMAIL,
      specialty: DEMO_PROFILE.specialty,
      license: DEMO_PROFILE.license,
      city: DEMO_PROFILE.city,
      isActive: true,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      specialty: true,
      license: true,
      isActive: true,
    },
  });

  demoPractitioner = row;
  return row;
}
