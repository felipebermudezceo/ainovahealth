import { redirect } from "next/navigation";
import { getSessionPractitioner } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";

export default async function PortalLoginPage() {
  if (await getSessionPractitioner()) {
    redirect("/portal");
  }

  return <LoginForm />;
}
