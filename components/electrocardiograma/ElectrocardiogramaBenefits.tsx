"use client";

import { motion } from "framer-motion";
import {
  FaRoute,
  FaUserMd,
  FaHome,
  FaClipboardCheck,
} from "react-icons/fa";

const benefits = [
  {
    icon: FaRoute,
    title: "Sin desplazamientos",
    text: "Realiza tu estudio desde la comodidad de tu hogar.",
  },
  {
    icon: FaUserMd,
    title: "Atención profesional",
    text: "Personal capacitado para realizar el procedimiento.",
  },
  {
    icon: FaHome,
    title: "Mayor comodidad",
    text: "Evita esperas y traslados innecesarios.",
  },
  {
    icon: FaClipboardCheck,
    title: "Resultados confiables",
    text: "Obtén información clara para continuar con tu atención médica.",
  },
];

export function ElectrocardiogramaBenefits() {
  return (
    <section className="bg-white px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[720px] text-center"
        >
          <h2 className="text-[28px] font-black leading-tight text-[#0A3D49] sm:text-[34px] lg:text-[40px]">
            ¿Por qué realizar tu electrocardiograma a domicilio?
          </h2>

          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-relaxed text-slate-600 sm:text-[18px]">
            Una alternativa cómoda para realizar tu estudio sin desplazarte.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,.06)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF5]">
                  <Icon className="text-[20px] text-[#25D366]" />
                </div>

                <h3 className="mt-4 text-[17px] font-bold text-[#0A3D49]">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                  {benefit.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
