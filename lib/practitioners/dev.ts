import { prisma } from "@/lib/db/prisma";

export const DEV_PRACTITIONER_EMAIL = "dev.practitioner@localhost";

export async function ensureDevPractitioner() {
  return prisma.practitioner.upsert({
    where: { email: DEV_PRACTITIONER_EMAIL },
    update: {
      fullName: "[DEV] Profesional de desarrollo",
      specialty: "Desarrollo · no clínico",
      license: "DEV-000",
      isActive: true,
    },
    create: {
      fullName: "[DEV] Profesional de desarrollo",
      specialty: "Desarrollo · no clínico",
      email: DEV_PRACTITIONER_EMAIL,
      license: "DEV-000",
      city: "Local",
      isActive: true,
    },
  });
}
