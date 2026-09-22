import type { DefaultSession } from "next-auth";

export type SessionPractitioner = {
  id: string;
  fullName: string;
  email: string;
  specialty: string;
  license: string;
  isActive: boolean;
};

declare module "next-auth" {
  interface Session {
    practitioner: SessionPractitioner;
    user: DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    specialty: string;
    license: string;
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    practitionerId?: string;
    fullName?: string;
    email?: string;
    specialty?: string;
    license?: string;
    isActive?: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    practitionerId?: string;
    fullName?: string;
    email?: string;
    specialty?: string;
    license?: string;
    isActive?: boolean;
  }
}
