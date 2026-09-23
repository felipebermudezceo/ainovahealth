import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/auth/demo";
import { getAuthenticatedPractitioner } from "@/lib/auth/session";
import { RegisterForm } from "./RegisterForm";

export default async function PortalRegisterPage() {
  if (!isDemoMode() && (await getAuthenticatedPractitioner())) {
    redirect("/portal");
  }

  return <RegisterForm />;
}
