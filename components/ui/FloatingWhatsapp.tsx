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
    <>
      <style>{`
        @keyframes ainova-wa-wobble {
          0% { transform: rotate(0deg) scale(1); }
          12% { transform: rotate(-2deg) scale(1.02); }
          24% { transform: rotate(2deg) scale(1.02); }
          36% { transform: rotate(-2deg) scale(1.02); }
          48% { transform: rotate(2deg) scale(1.02); }
          60% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(0deg) scale(1); }
        }

        .ainova-wa-wobble {
          transform-origin: center center;
          animation: ainova-wa-wobble 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ainova-wa-wobble {
            animation: none;
          }
        }
      `}</style>

      {/* Floating Action Container */}
      <aside
        aria-label="Canales directos de atención médica"
        className="fixed bottom-5 right-4 z-[999] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6"
      >
        {/* Direct Call Button (Mobile Express) */}
        <a
          href="tel:+573007239175"
          onClick={() => handleTrackClick("call")}
          id="btn-floating-call"
          aria-label="Llamar directamente al médico"
          className="group flex items-center gap-2 rounded-full bg-[#0A3D49] px-3.5 py-2 text-white shadow-[0_8px_25px_rgba(10,61,73,0.35)] ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-[#072a33] sm:px-4 sm:py-2.5"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[12px] text-emerald-400 group-hover:bg-white/25">
            <FaPhoneAlt />
          </div>
          <span className="text-[12px] font-semibold tracking-wide text-white sm:text-[13px]">
            Llamada Directa
          </span>
        </a>

        {/* Floating WhatsApp with Glow & Animation */}
        <a
          href={waUrl}
          onClick={() => handleTrackClick("whatsapp")}
          id="btn-floating-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatear por WhatsApp con el equipo médico"
          className="ainova-wa-wobble relative block"
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-xl" />

          {/* Button content */}
          <div className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#2AE56F] to-[#19B858] px-3.5 py-2.5 text-white shadow-[0_12px_35px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 lg:gap-3 lg:px-5 lg:py-3.5">
            <FaWhatsapp className="shrink-0 text-[22px] text-white lg:text-[26px]" />
            <span className="whitespace-nowrap text-[13px] font-bold text-white lg:text-[15px]">
              Agenda tu cita por WhatsApp
            </span>
          </div>
        </a>
      </aside>
    </>
  );
}
