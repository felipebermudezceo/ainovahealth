"use client";

import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { Check, MapPin } from "lucide-react";

export function HeroContent() {
  const [selectedCity, setSelectedCity] = useState<"bogota" | "medellin">("bogota");

  const cityData = {
    bogota: {
      label: "Bogotá",
      activeDoctors: "Médicos disponibles en Bogotá",
      eta: "45 a 60 min",
      waText: "Hola AinovaHealth, necesito solicitar un médico a domicilio en Bogotá. Mi nombre es...",
    },
    medellin: {
      label: "Medellín",
      activeDoctors: "Médicos disponibles en Medellín",
      eta: "40 a 55 min",
      waText: "Hola AinovaHealth, necesito solicitar un médico a domicilio en Medellín. Mi nombre es...",
    },
  };

  const current = cityData[selectedCity];

  const handleTrackClick = (type: "whatsapp" | "call") => {
    if (typeof window !== "undefined") {
      const dataLayer = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
      if (Array.isArray(dataLayer)) {
        dataLayer.push({
          event: type === "whatsapp" ? "whatsapp_click" : "call_click",
          lead_type: type,
          city: selectedCity,
          location: "hero",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      {/* Selector Dinámico de Ciudad (Bogotá / Medellín) */}
      <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-100/90 p-1 text-xs">
        <button
          type="button"
          onClick={() => setSelectedCity("bogota")}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-semibold transition ${
            selectedCity === "bogota"
              ? "bg-white text-[#083946] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <MapPin className="h-3.5 w-3.5 text-[#16A34A]" />
          <span>Bogotá</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCity("medellin")}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-semibold transition ${
            selectedCity === "medellin"
              ? "bg-white text-[#083946] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <MapPin className="h-3.5 w-3.5 text-[#16A34A]" />
          <span>Medellín</span>
        </button>
      </div>

      {/* Indicador de Disponibilidad en Tiempo Real */}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
        </span>
        <span className="font-medium text-emerald-800">{current.activeDoctors}</span>
      </div>

      {/* Título Principal Limpio, Serio y Profesional */}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#083946] sm:text-4xl lg:text-[44px] lg:leading-[1.2]">
        Médico particular a domicilio en {selectedCity === "bogota" ? "Bogotá" : "Medellín"}
      </h1>

      {/* Subtítulo Empático y Orientado al Paciente */}
      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
        Atención médica presencial en tu hogar cuando no puedes trasladarte. Sin filas de urgencias, sin contratos mensuales ni suscripciones: pagas únicamente la visita que necesitas.
      </p>

      {/* Lista de Compromisos Médicos con Estilo Sobrio y Confiable */}
      <div className="mt-6 space-y-2.5 text-left text-sm text-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#16A34A]">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span>Tiempo estimado de llegada: <strong>{current.eta}</strong></span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#16A34A]">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span>Fórmula médica e incapacidad en la misma consulta</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#16A34A]">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span>Atención médica cercana, con tiempo para escucharte y examinarte</span>
        </div>
      </div>

      {/* Acciones Directas de Contacto */}
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <a
          href={`https://wa.me/573007239175?text=${encodeURIComponent(current.waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleTrackClick("whatsapp")}
          id="hero-btn-whatsapp"
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#16A34A] px-7 py-4 text-base font-bold text-white shadow-lg transition hover:scale-102 hover:bg-[#15803D]"
        >
          <FaWhatsapp className="text-2xl" />
          <span>Pedir Médico por WhatsApp ({selectedCity === "bogota" ? "Bogotá" : "Medellín"})</span>
        </a>

        <a
          href="tel:+573007239175"
          onClick={() => handleTrackClick("call")}
          id="hero-btn-call"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-xs font-semibold text-[#083946] shadow-sm transition hover:bg-slate-50"
        >
          <FaPhoneAlt className="text-xs text-[#16A34A]" />
          <span>Llamada Particular: 300 723 9175</span>
        </a>
      </div>

      {/* Aviso de filtro para frenar usuarios de EPS y Prepagadas */}
      <p className="mt-3 text-xs font-medium text-slate-500">
        🩺 Consulta médica particular en casa 24/7 • Pago por servicio privado (No afiliados a EPS ni Prepagadas).
      </p>
    </div>
  );
}