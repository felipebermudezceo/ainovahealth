import { mockRecentVisits, mockStats } from "@/components/portal/mock-data";
import { isDemoMode } from "@/lib/auth/demo";

export default function PortalDashboardPage() {
  const demo = isDemoMode();

  return (
    <div className="mx-auto max-w-6xl">
      {demo ? (
        <p className="mb-4 rounded-2xl bg-[#ECFDF5] px-4 py-3 text-sm font-medium text-[#0A3D49]">
          Modo demo temporal. Usuario de prueba. Solo fichas DEMO-, sin historias reales.
        </p>
      ) : null}
      <h1 className="text-[30px] font-black tracking-tight text-[#0A3D49] lg:text-[36px]">
        Dashboard
      </h1>
      <p className="mt-2 text-slate-500">
        Información ficticia para validar el diseño del portal.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {mockStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-[34px] font-black text-[#0A3D49]">{stat.value}</p>
            <p className="mt-1 text-xs text-[#27B96D]">{stat.hint}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100">
        <h2 className="text-lg font-bold text-[#0A3D49]">Últimas atenciones</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {mockRecentVisits.map((visit) => (
            <div
              key={`${visit.patient}-${visit.date}`}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-[#0A3D49]">{visit.patient}</p>
                <p className="text-sm text-slate-500">{visit.type}</p>
              </div>
              <p className="text-sm text-slate-500">{visit.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
