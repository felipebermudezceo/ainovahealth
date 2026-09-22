import { prisma } from "@/lib/db/prisma";

export async function nextPatientDisplayCode() {
  const last = await prisma.patient.findFirst({
    where: { displayCode: { startsWith: "P-" } },
    orderBy: { displayCode: "desc" },
    select: { displayCode: true },
  });

  const match = last?.displayCode.match(/^P-(\d+)$/);
  const next = match ? Number(match[1]) + 1 : 1001;
  return `P-${String(next).padStart(4, "0")}`;
}
