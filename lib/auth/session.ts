import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ensureDemoPractitioner } from "@/lib/auth/demo-practitioner";
import { isDemoMode } from "@/lib/auth/demo";

export async function getSessionPractitioner() {
  if (isDemoMode()) {
    return ensureDemoPractitioner();
  }

  const session = await auth();
  const practitioner = session?.practitioner;
  if (!practitioner?.id || !practitioner.isActive) return null;
  return practitioner;
}

export async function requirePractitioner() {
  const practitioner = await getSessionPractitioner();
  if (!practitioner) redirect("/portal/login");
  return practitioner;
}
