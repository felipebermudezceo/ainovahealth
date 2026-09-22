import Link from "next/link";
import { ENCOUNTER_STATUS_LABELS } from "@/lib/encounters/constants";
import { listRecentEncounters } from "@/lib/encounters/queries";

export const dynamic = "force-dynamic";

export default async function PortalHistoriaClinicaPage() {
  const encounters = await listRecentEncounters();

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-[30px] font-black tracking-tight text-[#0A3D49] lg:text-[36px]">
        Historias clínicas
      </h1>
      <p className="mt-2 text-slate-500">
        Cada fila es una atención (Encounter). Cree una nueva desde la ficha
        del paciente.
      </p>

      <div className="mt-8 overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F4FBF8] text-[12px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Paciente</th>
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold">Tipo</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 font-semibold">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {encounters.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                    Aún no hay atenciones. Abra un paciente y pulse “Nueva
                    atención”.
                  </td>
                </tr>
              ) : (
                encounters.map((encounter) => (
                  <tr key={encounter.id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-[#0A3D49]">
                      <Link
                        href={`/portal/historia-clinica/${encounter.id}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {encounter.patientName}
                      </Link>
                      <p className="text-xs font-medium text-slate-400">
                        {encounter.displayCode}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {encounter.attendedOn} · {encounter.attendedAtTime}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {encounter.attentionType}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#0A3D49]">
                        {ENCOUNTER_STATUS_LABELS[encounter.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{encounter.updatedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
