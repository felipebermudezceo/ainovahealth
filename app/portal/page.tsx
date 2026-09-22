import Link from "next/link";
import {
  ClipboardList,
  LayoutDashboard,
  UserRound,
  Users,
} from "lucide-react";
import { mockRecentVisits, mockStats } from "@/components/portal/mock-data";
import { isDemoMode } from "@/lib/auth/demo";

const cards = [
  {
    href: "/portal/dashboard",
    title: "Dashboard",
    text: "Resumen de atenciones y actividad reciente.",
    icon: LayoutDashboard,
  },
  {
    href: "/portal/pacientes",
    title: "Pacientes",
    text: "Listado de demostración para probar la interfaz.",
    icon: Users,
  },
  {
    href: "/portal/historia-clinica",
    title: "Historias clínicas",
    text: "Formulario visual de prueba. No guarda información.",
    icon: ClipboardList,
  },
  {
    href: "/portal/perfil",
    title: "Perfil",
    text: "Datos de demostración del médico.",
    icon: UserRound,
  },
];

export default function PortalHomePage() {
  const demo = isDemoMode();

  return (
    <div className="mx-auto max-w-6xl">
      {demo ? (
        <p className="mb-4 rounded-2xl bg-[#ECFDF5] px-4 py-3 text-sm font-medium text-[#0A3D49]">
          Modo demo temporal. Usuario de prueba. Solo fichas DEMO-, sin historias reales.
        </p>
      ) : null}
      <h1 className="text-[28px] font-black tracking-tight text-[#0A3D49] lg:text-[40px]">
        Portal médico
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-7 text-slate-600 lg:text-[16px]">
        Panel de trabajo de AinovaHealth. Usa el menú para moverte entre
        dashboard, pacientes, historias clínicas y perfil. No hay datos reales.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {mockStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[24px] bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100 lg:p-6"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-[32px] font-black text-[#0A3D49] lg:text-[34px]">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-[#27B96D]">{stat.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-[24px] bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100 transition hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#25D366]">
                <Icon size={20} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#0A3D49]">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{card.text}</p>
            </Link>
          );
        })}
      </div>

      <section className="mt-6 rounded-[24px] bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100 lg:p-6">
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
