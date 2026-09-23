import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ensureDemoPractitioner } from "@/lib/auth/demo-practitioner";
import { isDemoMode } from "@/lib/auth/demo";

const DEMO_LAYOUT_PROFILE = {
  fullName: "Dra. Camila Restrepo",
  specialty: "Medicina General",
};

export async function getLayoutPractitioner() {
  if (isDemoMode()) {
    return DEMO_LAYOUT_PROFILE;
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
