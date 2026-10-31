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
      className="fixed bottom-4 right-4 z-[999] sm:bottom-6 sm:right-6"
    >
      {/* Dock Flotante Unificado de Lujo (Glassmorphic Medical Widget) */}
      <div className="flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 p-1.5 shadow-[0_12px_35px_-6px_rgba(8,57,70,0.18)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_16px_45px_-6px_rgba(8,57,70,0.24)]">
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
          className="flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-[#083946] transition-colors hover:bg-slate-100/90"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FaPhoneAlt className="text-[10px]" />
          </div>
          <span className="hidden sm:inline">Llamar 24/7</span>
        </a>

        {/* Separador sutil */}
        <div className="h-4 w-px bg-slate-200" aria-hidden="true" />

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
          className="group flex items-center gap-2.5 rounded-full bg-[#16A34A] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#15803D] hover:scale-[1.02] active:scale-95 sm:text-sm"
        >
          {/* Indicador de disponibilidad en tiempo real */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>

          <FaWhatsapp className="text-base sm:text-lg transition-transform duration-300 group-hover:scale-110" />
          <span>Pedir Médico</span>
        </a>
      </div>
    </aside>
  );
}
