"use client";

import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaHome,
  FaArrowRight,
  FaArrowDown,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Escríbenos por WhatsApp",
    description: "Cuéntanos qué servicio necesitas.",
    Icon: FaWhatsapp,
  },
  {
    number: "02",
    title: "Cuéntanos dónde estás",
    description: "Indícanos tu ubicación y disponibilidad.",
    Icon: FaMapMarkerAlt,
  },
  {
    number: "03",
    title: "Coordinamos tu atención",
    description: "Confirmamos contigo el día y la hora.",
    Icon: FaCalendarCheck,
  },
  {
    number: "04",
    title: "Recibe la atención en casa",
    description: "Nuestro personal llega a tu domicilio.",
    Icon: FaHome,
  },
];

export function HowToBook() {
  return (
    <section className="overflow-x-hidden bg-white px-4 py-14 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-[28px] font-black leading-tight text-[#0A3D49] lg:text-[42px]">
            ¿Cómo agendar tu atención?
          </h2>
          <p className="mt-2 text-[15px] text-slate-500 lg:mt-3 lg:text-[18px]">
            Agendar es fácil. Solo sigue estos 4 pasos.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#25D366]" />
        </motion.div>

        <div className="mt-8 flex flex-col items-center lg:mt-14 lg:flex-row lg:items-stretch">
          {steps.map((step, index) => {
            const Icon = step.Icon;

            return (
              <div
                key={step.number}
                className="flex w-full min-w-0 flex-col items-center lg:contents"
              >
                <motion.article
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="w-full min-w-0 rounded-[24px] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,.08)] ring-1 ring-slate-100 lg:flex-1 lg:p-6"
                >
                  <div className="flex items-start gap-3.5 lg:flex-col lg:gap-4">
                    <div className="flex shrink-0 items-center gap-2.5">
                      <span className="text-[32px] font-black leading-none text-[#25D366] lg:text-[44px]">
                        {step.number}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#25D366] lg:h-12 lg:w-12">
                        <Icon className="text-[18px] lg:text-[22px]" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="min-w-0 pt-0.5 lg:pt-0">
                      <h3 className="text-[15px] font-bold leading-snug text-[#0A3D49] lg:text-[18px]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-snug text-slate-600 lg:text-[15px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.article>

                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="flex shrink-0 items-center justify-center py-2 text-[#25D366] lg:px-2.5 lg:py-0"
                  >
                    <FaArrowDown className="text-[14px] lg:hidden" />
                    <FaArrowRight className="hidden text-[16px] lg:block" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
