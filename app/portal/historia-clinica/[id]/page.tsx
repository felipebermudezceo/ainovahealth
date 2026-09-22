import Link from "next/link";
import { notFound } from "next/navigation";
import { ClinicalHistoryForm } from "@/components/portal/ClinicalHistoryForm";
import { getEncounterEditor } from "@/lib/encounters/queries";

export const dynamic = "force-dynamic";

export default async function EncounterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const editor = await getEncounterEditor(id);
  if (!editor) notFound();

  return (
    <div>
      <p className="mx-auto max-w-5xl pb-3 text-sm text-slate-500">
        <Link href={`/portal/pacientes/${editor.patientId}`} className="font-semibold text-[#0A3D49]">
          {editor.displayCode}
        </Link>{" "}
        / Atención
      </p>
      <ClinicalHistoryForm
        encounterId={editor.encounterId}
        patientId={editor.patientId}
        displayCode={editor.displayCode}
        version={editor.version}
        status={editor.status}
        finalizedAtLabel={editor.finalizedAtLabel}
        finalizedByName={editor.finalizedByName}
        form={editor.form}
        practitioner={editor.practitioner}
      />
    </div>
  );
}
