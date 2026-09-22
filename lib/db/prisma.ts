import "server-only";
import { PrismaClient } from "@prisma/client";
import type { ITXClientDenyList } from "@prisma/client/runtime/client";
import { PrismaPg } from "@prisma/adapter-pg";

export type PrismaTransactionClient = Omit<PrismaClient, ITXClientDenyList>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

export function isPrismaUniqueConflict(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
