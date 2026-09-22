import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/PortalShell";
import { getSessionPractitioner } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Portal médico | AinovaHealth",
  description: "Acceso privado para el equipo médico de AinovaHealth.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const practitioner = await getSessionPractitioner();

  return <PortalShell practitioner={practitioner}>{children}</PortalShell>;
}
