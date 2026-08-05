"use client";

import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/573118901570"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999]"
    >
      {/* Glow */}

      <div className="absolute inset-0 animate-pulse rounded-full bg-[#25D366]/50 blur-2xl"></div>

      {/* Botón */}

      <div
        className="
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-[#2AE56F]
          to-[#19B858]
          shadow-[0_15px_40px_rgba(37,211,102,.55)]
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <FaWhatsapp className="text-[34px] text-white" />
      </div>
    </a>
  );
}