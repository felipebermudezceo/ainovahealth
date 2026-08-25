"use client";

import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsapp() {
  return (
    <>
      <style>{`
        @keyframes ainova-wa-wobble {
          0% { transform: rotate(0deg) translateX(0); }
          12% { transform: rotate(-2deg) translateX(-1.5px); }
          24% { transform: rotate(2deg) translateX(1.5px); }
          36% { transform: rotate(-2deg) translateX(-1.5px); }
          48% { transform: rotate(2deg) translateX(1.5px); }
          60% { transform: rotate(0deg) translateX(0); }
          100% { transform: rotate(0deg) translateX(0); }
        }

        .ainova-wa-wobble {
          transform-origin: center center;
          animation: ainova-wa-wobble 1.2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ainova-wa-wobble {
            animation: none;
          }
        }
      `}</style>

      <a
        href="https://wa.me/573007239175?text=Hola%20AinovaHealth%2C%20Quisiera%20Agendar%20Una%20Cita%2C%20Mi%20nombre%20es..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] max-w-[calc(100vw-3rem)]"
      >
        <div className="ainova-wa-wobble relative">
          {/* Glow */}

          <div className="absolute inset-0 rounded-full bg-[#25D366]/50 blur-2xl"></div>

          {/* Botón */}

          <div
            className="
              relative
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-gradient-to-br
              from-[#2AE56F]
              to-[#19B858]
              px-3.5
              py-2.5
              shadow-[0_15px_40px_rgba(37,211,102,.55)]
              transition-all
              duration-300
              hover:scale-110
              lg:w-auto
              lg:gap-3
              lg:px-5
              lg:py-3.5
            "
          >
            <FaWhatsapp className="shrink-0 text-[20px] text-white lg:text-[26px]" />
            <span className="whitespace-nowrap text-[13px] font-semibold text-white lg:text-[15px]">
              Agenda tu cita por WhatsApp
            </span>
          </div>
        </div>
      </a>
    </>
  );
}
