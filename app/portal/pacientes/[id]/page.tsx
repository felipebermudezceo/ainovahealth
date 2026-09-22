import Link from "next/link";
import { notFound } from "next/navigation";
import { createDraftEncounter } from "@/app/portal/historia-clinica/actions";
import { ENCOUNTER_STATUS_LABELS } from "@/lib/encounters/constants";
import { listPatientEncounters } from "@/lib/encounters/queries";
import { STATUS_LABELS } from "@/lib/patients/constants";
import { getPatient } from "@/lib/patients/queries";

export const dynamic = "force-dynamic";

export default async function PatientFilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await getPatient(id);
  if (!patient) notFound();
  const encounters = await listPatientEncounters(patient.id);
  const startEncounter = createDraftEncounter.bind(null, patient.id);

  const fields = [
    ["Código", patient.displayCode],
    ["Nombre completo", patient.fullName],
    ["Documento", `${patient.documentType} ${patient.documentNumber}`],
    ["Fecha de nacimiento", patient.birthDate],
    ["Sexo", patient.sex],
    ["Teléfono", patient.phone || "—"],
    ["Correo", patient.email || "—"],
    ["Dirección", patient.address || "—"],
    ["Ciudad", patient.city || "—"],
    ["Estado operativo", STATUS_LABELS[patient.operationalStatus]],
    ["Actualizado", patient.updatedAt],
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm text-slate-500">
        <Link href="/portal/pacientes" className="font-semibold text-[#0A3D49]">
          Pacientes
        </Link>{" "}
        / {patient.displayCode}
      </p>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[30px] font-black tracking-tight text-[#0A3D49] lg:text-[36px]">
            {patient.fullName}
          </h1>
          <p className="mt-2 text-slate-500">
            Ficha maestra. Cada atención es un Encounter distinto y no
            sobrescribe visitas anteriores.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/portal/pacientes/${patient.id}/editar`}
            className="inline-flex items-center justify-center rounded-full border border-[#D7EEE4] px-5 py-2.5 text-sm font-semibold text-[#0A3D49]"
          >
            Editar ficha
          </Link>
          <form action={startEncounter}>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0A3D49] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Nueva atención
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100 lg:p-8">
        <dl className="grid gap-5 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
              </dt>
              <dd className="mt-1 text-[16px] font-medium text-[#0A3D49]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mt-6 rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-[#0A3D49]">Atenciones</h2>
        {encounters.length === 0 ? (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Este paciente todavía no tiene atenciones. “Nueva atención” crea un
            Encounter en borrador asociado a esta ficha.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {encounters.map((encounter) => (
              <li key={encounter.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#0A3D49]">
                    {encounter.attentionType}
                  </p>
                  <p className="text-sm text-slate-500">
                    {encounter.attendedOn} · {encounter.attendedAtTime} ·{" "}
                    {ENCOUNTER_STATUS_LABELS[encounter.status]}
                  </p>
                </div>
                <Link
                  href={`/portal/historia-clinica/${encounter.id}`}
                  className="text-sm font-semibold text-[#0A3D49] underline-offset-2 hover:underline"
                >
                  Abrir historia
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
