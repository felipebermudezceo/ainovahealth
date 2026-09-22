import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth/config";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db/prisma";

let dummyHashPromise: Promise<string> | null = null;

function dummyHash() {
  dummyHashPromise ??= hashPassword("timing-dummy");
  return dummyHashPromise;
}

async function authorizePractitioner(email: string, password: string) {
  const practitioner = await prisma.practitioner.findUnique({
    where: { email },
    select: {
      id: true,
      fullName: true,
      email: true,
      specialty: true,
      license: true,
      isActive: true,
      passwordHash: true,
    },
  });

  const hash = practitioner?.passwordHash ?? (await dummyHash());
  const passwordMatches = await verifyPassword(hash, password);
  const canEnter = Boolean(
    practitioner &&
      practitioner.passwordHash &&
      practitioner.isActive &&
      passwordMatches,
  );

  if (!canEnter || !practitioner) return null;

  return {
    id: practitioner.id,
    name: practitioner.fullName,
    email: practitioner.email,
    specialty: practitioner.specialty,
    license: practitioner.license,
    isActive: practitioner.isActive,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          await verifyPassword(await dummyHash(), "invalid");
          return null;
        }

        return authorizePractitioner(email, password);
      },
    }),
  ],
});
