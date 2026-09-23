import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/auth/demo";
import { getSessionPractitioner } from "@/lib/auth/session";
import { RecoverForm } from "./RecoverForm";

export default async function PortalRecoverPage() {
  if (isDemoMode()) {
    redirect("/portal");
  }
  if (await getSessionPractitioner()) {
    redirect("/portal");
  }

  return <RecoverForm />;
}
