import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/auth/demo";
import { getAuthenticatedPractitioner } from "@/lib/auth/session";
import { RecoverForm } from "./RecoverForm";

export default async function PortalRecoverPage() {
  if (!isDemoMode() && (await getAuthenticatedPractitioner())) {
    redirect("/portal");
  }

  return <RecoverForm />;
}
