"use client";

import { useState, useSyncExternalStore } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { Check, MapPin } from "lucide-react";
import { trackLeadClick } from "@/lib/analytics/track";

type CitySelection = "all" | "bogota" | "medellin";

const emptySubscribe = () => () => {};
const getClientSearch = () =>
  typeof window !== "undefined" ? window.location.search.toLowerCase() : "";
const getServerSearch = () => "";

function detectCityFromSearch(params: string): CitySelection {
  if (
    params.includes("medellin") ||
    params.includes("medellín") ||
    params.includes("poblado") ||
    params.includes("laureles") ||
    params.includes("envigado") ||
    params.includes("sabaneta") ||
    params.includes("itagui")
  ) {
    return "medellin";
  }
  if (
    params.includes("bogota") ||
    params.includes("bogotá") ||
    params.includes("chia") ||
    params.includes("cedritos") ||
    params.includes("usaquen") ||
    params.includes("chico") ||
    params.includes("soacha")
  ) {
    return "bogota";
  }
  return "all";
}

export function HeroContent() {
  const searchParams = useSyncExternalStore(
    emptySubscribe,
    getClientSearch,
    getServerSearch
  );
  const [manualCity, setManualCity] = useState<CitySelection | null>(null);

  const selectedCity: CitySelection =
    manualCity ?? detectCityFromSearch(searchParams);

  const cityData: Record<
    CitySelection,
    {
      label: string;
      activeDoctors: string;
      eta: string;
      ctaLabel: string;
      waText: string;
    }
  > = {
    all: {
      label: "Bogotá y Medellín",
      activeDoctors: "Médicos disponibles 24/7 en Bogotá y Medellín",
      eta: "40 a 60 min",
      ctaLabel: "Solicitar médico por WhatsApp",
      waText:
        "Hola AinovaHealth, necesito solicitar un médico particular a domicilio. Estoy en el barrio/sector...",
    },
    bogota: {
      label: "Bogotá",
      activeDoctors: "Médicos disponibles ahora en Bogotá y Sabana",
      eta: "45 a 60 min",
      ctaLabel: "Solicitar médico en Bogotá",
      waText:
        "Hola AinovaHealth, necesito solicitar un médico particular a domicilio en Bogotá. Estoy en el barrio...",
    },
    medellin: {
      label: "Medellín",
      activeDoctors: "Médicos disponibles ahora en Medellín y Valle de Aburrá",
      eta: "40 a 55 min",
      ctaLabel: "Solicitar médico en Medellín",
      waText:
        "Hola AinovaHealth, necesito solicitar un médico particular a domicilio en Medellín. Estoy en el sector...",
    },
  };

  const current = cityData[selectedCity];

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      {/* Selector Dinámico de Ciudad (Ambos / Bogotá / Medellín) */}
      <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-100/90 p-1 text-xs">
        <button
          type="button"
          onClick={() => setManualCity("all")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition ${
            selectedCity === "all"
              ? "bg-white text-[#083946] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <MapPin className="h-3.5 w-3.5 text-[#16A34A]" />
          <span>Bogotá y Medellín</span>
        </button>

        <button
          type="button"
          onClick={() => setManualCity("bogota")}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-semibold transition ${
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
          onClick={() => setManualCity("medellin")}
          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-semibold transition ${
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
        Médico particular a domicilio en {current.label}
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
          <span>
            Tiempo estimado de llegada: <strong>{current.eta}</strong>
          </span>
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

      {/* Badge de Tarifa Transparente para Derribar Fricción */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-medium text-emerald-900 shadow-2xs">
        <span className="flex h-2 w-2 rounded-full bg-[#16A34A]" />
        <span className="font-bold text-[#16A34A]">Tarifa transparente:</span>
        <span>Consulta médica particular en casa desde $140.000 COP</span>
      </div>

      {/* Acciones Directas de Contacto */}
      <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <a
          href={`https://wa.me/573007239175?text=${encodeURIComponent(current.waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackLeadClick({
              type: "whatsapp",
              location: "hero",
              city: selectedCity,
              service: "medicina_general",
            })
          }
          id="hero-btn-whatsapp"
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#16A34A] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#15803D] hover:shadow-md active:scale-98"
        >
          <FaWhatsapp className="text-xl" />
          <span>{current.ctaLabel}</span>
        </a>

        <a
          href="tel:+573007239175"
          onClick={() =>
            trackLeadClick({
              type: "call",
              location: "hero",
              city: selectedCity,
              service: "medicina_general",
            })
          }
          id="hero-btn-call"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-[#083946] shadow-2xs transition hover:bg-slate-50 hover:border-slate-400"
        >
          <FaPhoneAlt className="text-xs text-[#16A34A]" />
          <span>Llamar al 300 723 9175</span>
        </a>
      </div>

      {/* Aviso de filtro para frenar usuarios de EPS y Prepagadas */}
      <p className="mt-3 text-xs font-medium text-slate-500">
        🩺 Consulta médica particular en casa 24/7 • Atención privada sin contratos mensuales ni copagos de EPS.
      </p>
    </div>
  );
}
