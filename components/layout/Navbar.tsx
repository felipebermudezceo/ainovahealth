"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const SERVICE_ROUTES = [
  "/laboratorios",
  "/enfermeria",
  "/vacunacion",
  "/telemedicina",
];

const menu = [
  {
    name: "Inicio",
    href: "#inicio",
  },
  {
    name: "Servicios",
    href: "#servicios",
    children: [
      {
        name: "Médico a domicilio",
        href: "/",
      },
      {
        name: "Laboratorios Clínicos",
        href: "/laboratorios",
      },
    ],
  },
  {
    name: "¿Cómo funciona?",
    href: "#como-funciona",
  },
  {
    name: "Testimonios",
    href: "#testimonios",
  },
  {
    name: "Cobertura",
    href: "#cobertura",
  },
  {
    name: "Contacto",
    href: "#contacto",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const isServicesActive = SERVICE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const servicesTriggerClass = isServicesActive
    ? "bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/20"
    : "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/15";

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto mt-4 flex h-[74px] max-w-[1320px] items-center justify-between rounded-full bg-white px-5 lg:mt-6 lg:h-[84px] lg:px-10 shadow-[0_15px_45px_rgba(15,23,42,.08)]">

        {/* LOGO */}

        <Link
  href="/"
  className="ml-2 lg:ml-0 flex items-center"
>
  <Image
    src="/images/logoAinovaHealth.png"
    alt="AinovaHealth"
    width={2000}
    height={500}
    priority
    className="
  h-[52px]
  w-auto
  lg:h-[66px]
  transition-all
  duration-300
  hover:scale-[1.02]
"
  />
</Link>

        {/* MENU */}

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-10">
          {menu.map((item) => (
  <li key={item.name} className={item.children ? "relative group" : ""}>
    {item.children ? (
      <>
        <button
          type="button"
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold transition-all duration-300 ${servicesTriggerClass}`}
        >
          {item.name}
          <ChevronDown className="h-4 w-4 transition duration-300 group-hover:rotate-180" />
        </button>

        <div className="invisible absolute top-full left-1/2 z-50 pt-3 opacity-0 -translate-x-1/2 translate-y-2 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          <ul className="min-w-[250px] overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,.10)]">
            {item.children.map((child) => (
              <li key={child.name}>
                <Link
                  href={child.href}
                  className={`block rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 ${
                    pathname === child.href
                      ? "bg-[#25D366]/10 text-[#25D366]"
                      : "text-slate-700 hover:bg-[#25D366]/8 hover:text-[#25D366]"
                  }`}
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    ) : (
      <a
        href={item.href}
        className="text-[15px] font-semibold text-slate-700 transition duration-200 hover:text-emerald-600"
      >
        {item.name}
      </a>
    )}
  </li>
))}
                  
          </ul>
        </nav>

        {/* BOTON */}

        <div className="relative hidden xl:block">

  {/* Luz verde */}

  <div className="absolute -bottom-3 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-full bg-[#25D366]/60 blur-xl"></div>

  <a
  href="https://wa.me/573118901570?text=Hola,%20quiero%20agendar%20una%20cita"
  target="_blank"
  rel="noopener noreferrer"
  className="relative flex h-[58px] items-center gap-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#17B857] px-8 text-[15px] font-bold text-white shadow-[0_18px_40px_rgba(37,211,102,.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_22px_55px_rgba(37,211,102,.55)]"
>

    {/* Icono WhatsApp */}

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="h-6 w-6 fill-white"
    >
      <path d="M16 .7C7.6.7.8 7.5.8 15.9c0 2.7.7 5.3 2.1 7.6L.6 31.3l8-2.1c2.2 1.2 4.7 1.8 7.2 1.8h.1c8.4 0 15.2-6.8 15.2-15.2S24.4.7 16 .7zm0 27.7c-2.3 0-4.6-.6-6.5-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5c-1.3-2-2-4.3-2-6.7 0-7 5.7-12.7 12.7-12.7s12.7 5.7 12.7 12.7S23 28.4 16 28.4zm7-9.6c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-.8-.8-1.4-1.7-1.6-2-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2.1-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.5.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"/>
    </svg>

    <span>Solicitar Médico Ahora</span>

    </a>

</div>
{/* BOTÓN HAMBURGUESA */}

<button
  onClick={() => setOpen(!open)}
  className="
    flex
    lg:hidden
    h-12
    w-12
    items-center
    justify-center
    rounded-full
    bg-slate-100
    transition
  "
>
  {open ? (
    <X className="h-7 w-7 text-slate-800" />
  ) : (
    <Menu className="h-7 w-7 text-slate-800" />
  )}
</button>
      </div>
      {open && (
  <div className="absolute top-[90px] left-4 right-4 rounded-3xl bg-white p-6 shadow-2xl lg:hidden">
    <ul className="space-y-5">
      {menu.map((item) => (
        <li key={item.name}>
          {item.children ? (
            <>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-lg font-semibold transition-all duration-300 ${servicesTriggerClass}`}
              >
                {item.name}
                <ChevronDown
                  className={`h-5 w-5 transition duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {servicesOpen && (
                <ul className="mt-3 space-y-2 border-l-2 border-[#25D366]/20 pl-4">
                  {item.children.map((child) => (
                    <li key={child.name}>
                      <Link
                        href={child.href}
                        onClick={() => {
                          setOpen(false);
                          setServicesOpen(false);
                        }}
                        className={`block rounded-xl px-3 py-2.5 text-base font-semibold transition-all duration-200 ${
                          pathname === child.href
                            ? "bg-[#25D366]/10 text-[#25D366]"
                            : "text-slate-700 hover:bg-[#25D366]/8 hover:text-[#25D366]"
                        }`}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <a
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-lg font-semibold text-slate-700"
            >
              {item.name}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
)}
    </header>
  );
}
