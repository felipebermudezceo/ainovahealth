"use client";

import { motion } from "framer-motion";
import {
  FaUserMd,
  FaHome,
  FaRoute,
  FaWhatsapp,
} from "react-icons/fa";

const benefits = [
  {
    icon: FaUserMd,
    title: "Atención profesional",
    text: "Recibe atención con personal capacitado.",
  },
  {
    icon: FaHome,
    title: "En la comodidad de tu hogar",
    text: "Sin necesidad de desplazarte.",
  },
  {
    icon: FaRoute,
    title: "Sin desplazamientos",
    text: "Coordinamos la atención directamente contigo.",
  },
  {
    icon: FaWhatsapp,
    title: "Agenda por WhatsApp",
    text: "Escríbenos y coordinamos tu atención.",
  },
];

export function EarWashBenefits() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[700px] text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-[#25D366]">
            Atención AinovaHealth
          </span>

          <h2 className="mt-3 text-[34px] font-black leading-tight text-[#0B3040] sm:text-[42px] lg:text-[48px]">
            ¿Necesitas un{" "}
            <span className="text-[#25D366]">lavado de oídos?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-7 text-[#526A78] sm:text-[19px]">
            Recibe atención profesional sin salir de casa y coordina tu
            servicio de manera sencilla con AinovaHealth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="
            mt-12
            overflow-hidden
            rounded-[32px]
            border border-[#DDF3E7]
            bg-gradient-to-br
            from-[#F7FFFA]
            via-white
            to-[#F0FBF6]
            p-6
            shadow-[0_20px_60px_rgba(7,59,71,.08)]
            sm:p-8
            lg:p-10
          "
        >
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">

            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6FAEE]">
                <FaUserMd className="text-[25px] text-[#25D366]" />
              </div>

              <h3 className="text-[28px] font-black leading-tight text-[#0B3040] sm:text-[32px]">
                Una atención más cómoda,
                <span className="block text-[#25D366]">
                  justo donde la necesitas.
                </span>
              </h3>

              <p className="mt-5 max-w-[500px] text-[16px] leading-7 text-[#5A707C] sm:text-[18px]">
                Evita desplazamientos y coordina tu atención desde la
                comodidad de tu hogar.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + index * 0.08,
                    }}
                    className="
                      rounded-2xl
                      border border-[#E4F1EA]
                      bg-white
                      p-5
                      shadow-[0_8px_25px_rgba(7,59,71,.05)]
                    "
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8FAEF]">
                        <Icon className="text-[19px] text-[#25D366]" />
                      </div>

                      <div>
                        <h4 className="font-bold text-[#0B3040]">
                          {benefit.title}
                        </h4>

                        <p className="mt-1 text-sm leading-5 text-[#657985]">
                          {benefit.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
