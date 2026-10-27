"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

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
    if (pathname.includes("laboratorios")) {
      return "Hola AinovaHealth, requiero cotizar y agendar exámenes de Laboratorio Clínico a domicilio. Mi nombre es...";
    }
    return "Hola AinovaHealth, requiero atención médica a domicilio. Mi nombre es...";
  };

  const handleTrackClick = (type: "whatsapp" | "call") => {
    if (typeof window !== "undefined") {
      const dataLayer = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
      if (Array.isArray(dataLayer)) {
        dataLayer.push({
          event: type === "whatsapp" ? "whatsapp_click" : "call_click",
          lead_type: type,
          destination: "+573007239175",
          page_path: pathname,
        });
      }
    }
  };

  const waUrl = `https://wa.me/573007239175?text=${encodeURIComponent(getCustomMessage())}`;

  return (
    <aside
      aria-label="Canales directos de atención médica"
      className="fixed bottom-4 right-3 z-[999] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
    >
      {/* Botón WhatsApp Médico Principal (Agrandado y con pulso de atención) */}
      <a
        href={waUrl}
        onClick={() => handleTrackClick("whatsapp")}
        id="btn-floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con el médico a domicilio"
        className="group relative flex items-center gap-3 rounded-full bg-[#16A34A] px-5 py-3.5 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#15803D] hover:shadow-emerald-500/50 active:scale-95 sm:px-6 sm:py-4"
        style={{
          boxShadow: "0 10px 25px -3px rgba(22, 163, 74, 0.4), 0 4px 6px -4px rgba(22, 163, 74, 0.3)",
        }}
      >
        {/* Indicador pulsante de disponibilidad */}
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
        </span>

        <FaWhatsapp className="text-2xl text-white transition-transform duration-300 group-hover:rotate-12 sm:text-3xl" />
        
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-100 sm:text-xs">
            Médico en Casa 24/7
          </span>
          <span className="text-sm font-extrabold sm:text-base">
            Pedir por WhatsApp
          </span>
        </div>
      </a>

      {/* Botón Secundario Llamada Directa */}
      <a
        href="tel:+573007239175"
        onClick={() => handleTrackClick("call")}
        id="btn-floating-call"
        aria-label="Llamar directamente al médico particular"
        className="flex items-center gap-2 rounded-full border border-slate-700/30 bg-[#083946]/95 px-3 py-1.5 text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-[#062933] hover:scale-102"
      >
        <FaPhoneAlt className="text-[11px] text-emerald-400" />
        <span className="text-[11px] font-semibold text-slate-100">Llamada Médica Particular</span>
      </a>
    </aside>
  );
}
