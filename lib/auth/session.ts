import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDemoPractitioner } from "@/lib/auth/demo-practitioner";
import { isDemoMode } from "@/lib/auth/demo";

export async function getLayoutPractitioner() {
  if (isDemoMode()) {
    const demo = getDemoPractitioner();
    return {
      fullName: demo.fullName,
      specialty: demo.specialty,
    };
  }

  const session = await auth();
  const practitioner = session?.practitioner;
  if (!practitioner?.id || !practitioner.isActive) return null;
  return {
    fullName: practitioner.fullName,
    specialty: practitioner.specialty,
  };
}

export async function getSessionPractitioner() {
  if (isDemoMode()) {
    return getDemoPractitioner();
  }

  const session = await auth();
  const practitioner = session?.practitioner;
  if (!practitioner?.id || !practitioner.isActive) return null;
  return practitioner;
}

export async function getAuthenticatedPractitioner() {
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
