import Link from "next/link";
import { isDemoMode } from "@/lib/auth/demo";
import { listPatients } from "@/lib/patients/queries";
import { STATUS_LABELS } from "@/lib/patients/constants";

export const dynamic = "force-dynamic";

export default async function PortalPacientesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const patients = await listPatients(q);
  const demo = isDemoMode();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[30px] font-black tracking-tight text-[#0A3D49] lg:text-[36px]">
            Pacientes
          </h1>
          <p className="mt-2 text-slate-500">
            {demo
              ? "Fichas ficticias de demostración. No se consultan pacientes reales."
              : "Ficha maestra conectada a PostgreSQL. No hay eliminación física."}
          </p>
        </div>
        <Link
          href="/portal/pacientes/nuevo"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#31DD6E] to-[#19B858] px-5 py-2.5 text-sm font-bold text-white"
        >
          Nuevo paciente
        </Link>
      </div>

      <form className="mt-6" action="/portal/pacientes" method="get">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-[#0A3D49]">
            Buscar por nombre o documento
          </span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder="Nombre o número de documento"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-[#0A3D49] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-full bg-[#0A3D49] px-5 py-3 text-sm font-semibold text-white"
            >
              Buscar
            </button>
          </div>
        </label>
      </form>

      <div className="mt-8 overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F4FBF8] text-[12px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Código</th>
                <th className="px-5 py-3 font-semibold">Nombre completo</th>
                <th className="px-5 py-3 font-semibold">Documento</th>
                <th className="px-5 py-3 font-semibold">Nacimiento</th>
                <th className="px-5 py-3 font-semibold">Sexo</th>
                <th className="px-5 py-3 font-semibold">Teléfono</th>
                <th className="px-5 py-3 font-semibold">Ciudad</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 font-semibold">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-slate-500">
                    {q
                      ? "No hay pacientes que coincidan con la búsqueda."
                      : "Aún no hay pacientes registrados."}
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-medium text-slate-500">
                      <Link
                        href={`/portal/pacientes/${patient.id}`}
                        className="font-semibold text-[#0A3D49] underline-offset-2 hover:underline"
                      >
                        {patient.displayCode}
                      </Link>
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#0A3D49]">
                      <Link href={`/portal/pacientes/${patient.id}`}>{patient.fullName}</Link>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {patient.documentType} {patient.documentNumber}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{patient.birthDate}</td>
                    <td className="px-5 py-4 text-slate-600">{patient.sex}</td>
                    <td className="px-5 py-4 text-slate-600">{patient.phone || "—"}</td>
                    <td className="px-5 py-4 text-slate-600">{patient.city || "—"}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#0A3D49]">
                        {STATUS_LABELS[patient.operationalStatus]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{patient.updatedAt}</td>
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
