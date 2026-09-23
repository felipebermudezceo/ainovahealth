import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/auth/demo";
import { getAuthenticatedPractitioner } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";

export default async function PortalLoginPage() {
  if (!isDemoMode() && (await getAuthenticatedPractitioner())) {
    redirect("/portal");
  }

  return <LoginForm demoEnabled={isDemoMode()} />;
}
