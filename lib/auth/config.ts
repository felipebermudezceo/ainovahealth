import type { NextAuthConfig } from "next-auth";
import { isDemoMode } from "@/lib/auth/demo";

function readJwtString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/portal/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      if (isDemoMode()) return true;
      const { pathname } = request.nextUrl;
      if (!pathname.startsWith("/portal")) return true;
      if (pathname === "/portal/login") return true;
      return Boolean(auth?.practitioner?.id);
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.practitionerId = user.id;
        token.fullName = user.name ?? "";
        token.email = user.email ?? "";
        token.specialty = user.specialty;
        token.license = user.license;
        token.isActive = user.isActive;
      }
      return token;
    },
    session({ session, token }) {
      const id =
        readJwtString(token.practitionerId) ?? readJwtString(token.sub);
      const fullName = readJwtString(token.fullName);
      const email = readJwtString(token.email);
      const specialty = readJwtString(token.specialty);
      const license = readJwtString(token.license);

      if (
        id &&
        fullName &&
        email &&
        specialty &&
        license &&
        typeof token.isActive === "boolean"
      ) {
        session.practitioner = {
          id,
          fullName,
          email,
          specialty,
          license,
          isActive: token.isActive,
        };
        session.user = {
          ...session.user,
          name: fullName,
          email,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
