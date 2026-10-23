"use client";

import { useState } from "react";
import { ChevronDown, HeartHandshake } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo es la atención del médico cuando llega a mi casa?",
      a: "Nuestros médicos son profesionales cercanos, pacientes y con gran vocación de servicio. Te atienden directamente en la tranquilidad de tu sala o habitación, se toman el tiempo de escucharte sin prisas, realizan un examen físico completo y te explican el diagnóstico con total claridad.",
    },
    {
      q: "¿El médico entrega fórmula médica e incapacidad si la necesito?",
      a: "Sí. Al finalizar la consulta, el médico te entrega la fórmula médica oficial con las indicaciones de medicamentos y dosis, y de ser necesario emite el certificado de incapacidad médica para tu trabajo o actividades.",
    },
    {
      q: "¿En qué sectores de Bogotá y Medellín tienen cobertura?",
      a: "En Bogotá cubrimos las principales localidades (Usaquén, Suba, Chapinero, Teusaquillo, Kennedy, Engativá, etc.) y municipios cercanos como Chía y Cota. En Medellín atendemos en El Poblado, Laureles, Belén, Envigado, Sabaneta y Bello.",
    },
    {
      q: "¿Cuánto tiempo demora en llegar el médico?",
      a: "El tiempo estimado es de 45 a 60 minutos desde que nos contactas por WhatsApp o llamada, coordinando al médico más cercano para que no tengas que esperar.",
    },
    {
      q: "¿Cómo se realiza el pago de la consulta?",
      a: "Pagas únicamente por la visita realizada al finalizar la atención. Aceptamos transferencias por Nequi, Daviplata, Bancolombia, o efectivo. No cobramos mensualidades, ni afiliaciones ni suscripciones.",
    },
    {
      q: "¿Qué incluye la consulta médica en el hogar?",
      a: "Incluye valoración presencial completa, revisión de signos vitales (presión arterial, saturación, pulso, temperatura), diagnóstico clínico, fórmula de medicamentos e indicaciones para tu pronta recuperación.",
    },
  ];

  return (
    <section id="preguntas-frecuentes" className="py-16 px-4 sm:py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="mx-auto max-w-[960px]">
        {/* Encabezado */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 px-3.5 py-1 text-xs font-medium text-emerald-900">
            <span>Resolvemos tus dudas</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#083946] sm:text-3xl lg:text-4xl">
            Preguntas Frecuentes
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-base text-slate-700">
            Todo lo que necesitas saber antes de pedir tu médico en casa, sin letras pequeñas ni trámites.
          </p>
        </div>

        {/* Acordeón de FAQs */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left sm:p-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-[#083946] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#16A34A]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-4 sm:px-5 text-sm leading-relaxed text-slate-700">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cierre Humano */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600 sm:text-sm">
          <HeartHandshake className="h-4 w-4 text-[#16A34A]" />
          <span>Atención médica cercana, cálida y sin complicaciones en tu hogar.</span>
        </div>
      </div>
    </section>
  );
}
