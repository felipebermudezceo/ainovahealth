"use client";

import Image from "next/image";
import { Stethoscope, FileText, HeartHandshake } from "lucide-react";

export function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Contenedor de la Imagen Médica con Marco Sutil y Elegante */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-md sm:h-[400px] lg:h-[480px]">
        {/* Imagen Desktop */}
        <Image
          src="/images/hero/medico-en-casa.webp"
          alt="Médico profesional de AinovaHealth atendiendo a paciente en casa"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="hidden object-cover object-center lg:block"
        />

        {/* Imagen Mobile */}
        <Image
          src="/images/hero/medico-en-casa-mobile.jpg"
          alt="Médico profesional de AinovaHealth atendiendo a paciente en casa"
          fill
          priority
          sizes="100vw"
          className="block object-cover object-center lg:hidden"
        />
      </div>

      {/* Tarjeta de Respaldo Clínico Integrada */}
      <div className="absolute -bottom-4 left-4 right-4 rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-[300px]">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-semibold text-[#083946]">
          <HeartHandshake className="h-4 w-4 text-[#16A34A]" />
          <span>Atención cálida y personalizada</span>
        </div>

        <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
            <span>Valoración médica completa en tu casa</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-[#16A34A] shrink-0" />
            <span>Fórmula médica e incapacidad en el momento</span>
          </div>
        </div>
      </div>
    </div>
  );
}