import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/auth/demo";
import { getSessionPractitioner } from "@/lib/auth/session";
import { RegisterForm } from "./RegisterForm";

export default async function PortalRegisterPage() {
  if (isDemoMode()) {
    redirect("/portal");
  }
  if (await getSessionPractitioner()) {
    redirect("/portal");
  }

  return <RegisterForm />;
}
