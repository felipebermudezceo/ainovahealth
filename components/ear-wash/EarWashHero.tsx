"use client";

import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

export function EarWashHero() {
  return (
    <section
      id="inicio"
      className="overflow-x-hidden bg-white pt-[105px] lg:pt-[125px]"
    >
      <div className="mx-auto max-w-[1320px] px-4 pb-10 lg:pb-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366]/25 bg-[#ECFDF5] px-4 py-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0A3D49] lg:text-xs lg:tracking-[0.18em]">
                  Atención a domicilio
                </span>
              </div>
            </div>

            {/* Título */}
            <h1 className="mt-4 leading-[1.08] tracking-[-0.02em] lg:mt-5">
              <span className="block text-[32px] font-black text-[#0A3D49] lg:text-[52px]">
                Lavado de oídos
              </span>
              <span className="mt-0.5 block text-[30px] font-black text-[#25D366] lg:text-[50px]">
                a domicilio.
              </span>
            </h1>

            {/* Línea decorativa — solo desktop */}
            <div className="mt-5 hidden items-center gap-4 lg:flex">
              <div className="h-[2px] w-[120px] rounded-full bg-[#25D366]/80" />
              <svg width="70" height="24" viewBox="0 0 120 40" fill="none">
                <path
                  d="M0 20 H28 L38 8 L48 32 L58 5 L68 20 H120"
                  stroke="#25D366"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Descripción */}
            <p className="mx-auto mt-4 max-w-[420px] text-[16px] leading-relaxed text-slate-600 lg:mx-0 lg:mt-6 lg:max-w-[480px] lg:text-[18px]">
              Atención profesional en la comodidad de tu hogar.
            </p>

            {/* CTA */}
            <div className="relative mx-auto mt-6 w-full max-w-[400px] lg:mx-0 lg:mt-8 lg:max-w-none lg:w-fit">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/30 blur-2xl" />

              <motion.a
                href="https://wa.me/573007239175?text=Hola%20AinovaHealth%2C%20Quisiera%20Agendar%20Una%20Cita%2C%20Mi%20nombre%20es..."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex w-full items-center justify-center gap-3 rounded-full border border-[#B9FFD0] bg-gradient-to-b from-[#31DD6E] to-[#19B858] px-7 py-3.5 text-white shadow-[0_18px_45px_rgba(37,211,102,.28)] lg:inline-flex lg:w-auto lg:px-8 lg:py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 lg:h-11 lg:w-11">
                  <FaWhatsapp className="text-[24px] lg:text-[27px]" />
                </span>

                <span className="text-left">
                  <span className="block text-[15px] font-bold lg:text-[17px]">
                    Agendar por WhatsApp
                  </span>
                  <span className="block text-[11px] text-white/90 lg:text-[12px]">
                    Respuesta inmediata por WhatsApp
                  </span>
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="order-2 lg:order-none"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(15,23,42,.10)] lg:mx-0 lg:ml-auto lg:aspect-[5/4] lg:max-w-none lg:rounded-[32px]">
              <Image
                src="/images/servicios/lavado-oidos.png"
                alt="Lavado de oídos a domicilio AinovaHealth"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
