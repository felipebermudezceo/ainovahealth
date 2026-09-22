"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Stethoscope,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/portal/logout/actions";

const navItems = [
  { href: "/portal", label: "Inicio", icon: Stethoscope },
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/pacientes", label: "Pacientes", icon: Users },
  {
    href: "/portal/historia-clinica",
    label: "Historias clínicas",
    icon: ClipboardList,
  },
  { href: "/portal/perfil", label: "Perfil", icon: UserRound },
];

export function PortalShell({
  children,
  practitioner,
}: {
  children: React.ReactNode;
  practitioner: {
    fullName: string;
    specialty: string;
  } | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/portal/login") {
    return <>{children}</>;
  }

  const isActive = (href: string) =>
    href === "/portal" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#F4FBF8] text-[#0A3D49]">
      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-[#0A3D49]/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(272px,85vw)] flex-col border-r border-[#D7EEE4] bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link
            href="/portal"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logoAinovaHealth.png"
              alt="AinovaHealth"
              width={140}
              height={36}
              className="h-9 w-auto"
            />
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-[#0A3D49] lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Cerrar navegación"
          >
            <X size={20} />
          </button>
        </div>

        <p className="px-5 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#27B96D]">
          Portal médico
        </p>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-[15px] font-medium transition ${
                  active
                    ? "bg-[#ECFDF5] text-[#0A3D49]"
                    : "text-slate-600 hover:bg-[#F4FBF8]"
                }`}
              >
                <Icon
                  size={18}
                  className={active ? "text-[#25D366]" : "text-slate-400"}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#D7EEE4] p-5">
          <p className="text-sm font-semibold">
            {practitioner?.fullName ?? "Sesión requerida"}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {practitioner?.specialty ?? ""}
          </p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D7EEE4] px-4 py-2.5 text-sm font-semibold text-[#0A3D49] transition hover:bg-[#F4FBF8]"
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#D7EEE4] bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <button
            type="button"
            className="rounded-xl p-2 text-[#0A3D49] lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir navegación"
          >
            <Menu size={22} />
          </button>
          <p className="min-w-0 flex-1 truncate text-sm font-semibold lg:font-medium lg:text-slate-500">
            <span className="lg:hidden">AinovaHealth</span>
            <span className="hidden lg:inline">
              Entorno de prueba · sin datos reales
            </span>
          </p>
          <form action={logoutAction} className="lg:hidden">
            <button
              type="submit"
              className="rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-semibold text-[#0A3D49]"
            >
              Salir
            </button>
          </form>
          <span className="hidden rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#0A3D49] lg:inline">
            {practitioner?.fullName ?? "Portal"}
          </span>
        </header>

        <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
