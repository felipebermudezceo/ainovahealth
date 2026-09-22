import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/auth/demo";
import { getSessionPractitioner } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";

export default async function PortalLoginPage() {
  if (isDemoMode() || (await getSessionPractitioner())) {
    redirect("/portal");
  }

  return <LoginForm />;
}
