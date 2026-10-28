"use client";

import { Navbar } from "@/components/layout/Navbar";
import { HowToBook } from "@/components/shared/HowToBook";
import { Testimonials } from "@/components/sections/Testimonials";
import { FooterInfo } from "@/components/sections/FooterInfo";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsapp } from "@/components/ui/FloatingWhatsapp";
import { FaShieldAlt, FaWhatsapp, FaPhoneAlt, FaCheckCircle, FaUserMd } from "react-icons/fa";
import Link from "next/link";

export default function SueroterapiaPage() {
  const waUrl = "https://wa.me/573007239175?text=" + encodeURIComponent("Hola AinovaHealth, deseo agendar una valoracion medica y Sueroterapia a domicilio. Mi nombre es...");

  const treatments = [
    {
      title: "Suero de Inmunidad y Defensas",
      desc: "Formula vitaminica especializada para fortalecer el sistema inmune y revitalizar defensas naturales.",
      badge: "Mas Solicitado",
    },
    {
      title: "Suero Revitalizante & Anti-Fatiga",
      desc: "Complejo B, electrolitos y oligoelementos para combatir el agotamiento fisico, mental y estres cronico.",
      badge: "Energia 24/7",
    },
    {
      title: "Hidratacion Profunda & Recuperacion",
      desc: "Rapida recuperacion tras cuadros de deshidratacion, fatiga extrema, post-viajes o convalecencia.",
      badge: "Recuperacion Rapida",
    },
    {
      title: "Bienestar Celular & Antioxidante",
      desc: "Nutrientes esenciales que favorecen el bienestar celular y la vitalidad del organismo.",
      badge: "Salud Integral",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-[105px] lg:pt-[125px]">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-[#083946] via-[#0C5663] to-[#17816F] p-8 md:p-14 text-white">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-300/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-200 mb-6">
                <FaUserMd className="text-amber-300" />
                Sujeto a Valoracion Medica Previa y Prescripcion
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Sueroterapia e Hidratacion a Domicilio en Bogota y Medellin
              </h1>

              <p className="mt-5 text-base md:text-xl text-teal-50 font-normal leading-relaxed">
                Terapia de hidratacion y bienestar en la comodidad de tu hogar. Aplicacion profesional realizada bajo estricto protocolo de bioseguridad, previo chequeo y valoracion medica integral.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-950/20 transition-all hover:bg-emerald-600 hover:scale-[1.02]"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Cotizar y Agendar por WhatsApp</span>
                </Link>

                <a
                  href="tel:+573007239175"
                  className="flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  <FaPhoneAlt />
                  <span>Llamar al Medico 24/7</span>
                </a>
              </div>

              <p className="mt-4 text-xs text-teal-200/90 flex items-center gap-2">
                <FaShieldAlt className="text-emerald-400" />
                Atencion particular sin filas • Insumos esteriles certificados • Bogota, Medellin y Sabana Norte
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-[1320px] px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
              Protocolos de Sueroterapia Medica Segura
            </h2>
            <p className="mt-3 text-slate-600 text-sm md:text-base">
              La sueroterapia requiere rigor clinico. En AinovaHealth no aplicamos formulas genericas sin antes evaluar tu historia clinica y signos vitales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatments.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-teal-500/40 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 mb-4">
                    {t.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                  <FaCheckCircle /> Valoracion medica incluida
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowToBook />
      <Testimonials />
      <FooterInfo />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}
