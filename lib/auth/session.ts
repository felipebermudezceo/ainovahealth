import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function getSessionPractitioner() {
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
