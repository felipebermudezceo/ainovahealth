"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { trackLeadClick } from "@/lib/analytics/track";

export function FloatingWhatsapp() {
  const pathname = usePathname();

  const getCustomMessage = () => {
    if (pathname.includes("lavado-oidos")) {
      return "Hola AinovaHealth, requiero información y agendar un servicio de Lavado de Oídos a domicilio. Mi nombre es...";
    }
    if (pathname.includes("pediatria")) {
      return "Hola AinovaHealth, requiero agendar una consulta médica de Pediatría a domicilio. Mi nombre es...";
    }
    if (pathname.includes("electrocardiograma")) {
      return "Hola AinovaHealth, requiero agendar un Electrocardiograma a domicilio. Mi nombre es...";
    }
    if (pathname.includes("sueroterapia")) {
      return "Hola AinovaHealth, deseo agendar una valoración médica y Sueroterapia a domicilio. Mi nombre es...";
    }
    if (pathname.includes("ets")) {
      return "Hola AinovaHealth, solicito información confidencial para toma de exámenes de ETS a domicilio. Mi nombre es...";
    }
    if (pathname.includes("laboratorios")) {
      return "Hola AinovaHealth, requiero cotizar y agendar exámenes de Laboratorio Clínico a domicilio. Mi nombre es...";
    }
    return "Hola AinovaHealth, requiero atención médica particular a domicilio. Mi nombre es...";
  };

  const waUrl = `https://wa.me/573007239175?text=${encodeURIComponent(getCustomMessage())}`;

  return (
    <aside
      aria-label="Canales directos de atención médica"
      className="fixed bottom-4 right-3 z-[999] sm:bottom-6 sm:right-6"
    >
      {/* Dock Flotante Estilizado de Mayor Presencia (Glassmorphic Luxury Medical Pill) */}
      <div className="flex items-center gap-2 rounded-full border border-white/90 bg-white/95 p-2 shadow-[0_18px_48px_-8px_rgba(8,57,70,0.28)] ring-1 ring-[#083946]/12 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_22px_55px_-8px_rgba(8,57,70,0.36)] sm:gap-2.5 sm:p-2.5">
        {/* Canal Telefónico de Urgencia */}
        <a
          href="tel:+573007239175"
          onClick={() =>
            trackLeadClick({
              type: "call",
              location: "floating_dock",
              service: pathname === "/" ? "medicina_general" : pathname.replace("/", ""),
            })
          }
          id="btn-floating-call"
          aria-label="Llamar directamente al médico particular"
          className="group flex items-center gap-2.5 rounded-full bg-slate-50/90 py-2.5 pl-2.5 pr-4 text-sm font-bold text-[#083946] ring-1 ring-slate-200/80 transition-all duration-300 hover:bg-[#083946] hover:text-white hover:ring-[#083946] active:scale-95 sm:py-3 sm:pl-3 sm:pr-5 sm:text-[15px]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#083946] to-[#0E5A6F] text-white shadow-sm shadow-[#083946]/25 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 sm:h-9 sm:w-9">
            <FaPhoneAlt className="text-xs sm:text-sm" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 transition-colors group-hover:text-teal-200">
              Urgencias
            </span>
            <span className="mt-0.5 tracking-tight">Llamar 24/7</span>
          </div>
        </a>

        {/* Canal Principal WhatsApp Médico */}
        <a
          href={waUrl}
          onClick={() =>
            trackLeadClick({
              type: "whatsapp",
              location: "floating_dock",
              service: pathname === "/" ? "medicina_general" : pathname.replace("/", ""),
            })
          }
          id="btn-floating-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatear por WhatsApp con el médico a domicilio"
          className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#16A34A] via-[#15803D] to-[#126E35] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_-4px_rgba(22,163,74,0.55)] ring-1 ring-inset ring-white/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_32px_-4px_rgba(22,163,74,0.72)] active:scale-95 sm:gap-3 sm:px-6 sm:py-3.5 sm:text-base"
        >
          {/* Indicador de disponibilidad en tiempo real */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-85"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white shadow-xs"></span>
          </span>

          <FaWhatsapp className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110" />
          <div className="flex flex-col leading-none text-left">
            <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-100">
              Respuesta inmediata
            </span>
            <span className="mt-0.5 tracking-tight">Pedir Médico</span>
          </div>
        </a>
      </div>
    </aside>
  );
}
