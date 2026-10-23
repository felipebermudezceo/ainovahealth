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
      className="fixed bottom-4 right-4 z-[999] flex items-center gap-2 sm:bottom-6 sm:right-6"
    >
      {/* Botón Llamada Directa */}
      <a
        href="tel:+573007239175"
        onClick={() => handleTrackClick("call")}
        id="btn-floating-call"
        aria-label="Llamar directamente al médico"
        className="flex items-center gap-2 rounded-full border border-slate-700/40 bg-[#083946] px-3.5 py-2.5 text-white shadow-lg transition hover:bg-[#062933]"
      >
        <FaPhoneAlt className="text-xs text-emerald-300" />
        <span className="text-xs font-bold">Llamar Ahora</span>
      </a>

      {/* Botón WhatsApp Médico */}
      <a
        href={waUrl}
        onClick={() => handleTrackClick("whatsapp")}
        id="btn-floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con el equipo médico"
        className="flex items-center gap-2 rounded-full bg-[#16A34A] px-4 py-2.5 text-white shadow-lg transition hover:bg-[#15803D]"
      >
        <FaWhatsapp className="text-lg text-white" />
        <span className="text-xs font-bold sm:text-sm">WhatsApp Médico</span>
      </a>
    </aside>
  );
}
