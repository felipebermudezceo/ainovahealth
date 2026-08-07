"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  "Evitas filas y salas de espera",
  "Sin desplazamientos",
  "Personal certificado",
  "Resultados digitales",
  "Atención rápida y segura",
];

export function LaboratoryBenefits() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">

          {/* Imagen */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-3 mx-auto aspect-[4/3] w-full max-w-[620px] overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,.08)] lg:order-none lg:mx-0 lg:max-w-none lg:aspect-[5/4]"
          >
            <Image
              src="/images/hero/laboratorio-beneficios.png"
              alt="Laboratorio clínico a domicilio"
              fill
              className="object-cover object-[50%_40%]"
            />
          </motion.div>

          {/* Contenido + Botón */}

          <div className="contents lg:flex lg:flex-col lg:col-start-2 lg:row-start-1">

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 text-center lg:order-none lg:text-left"
          >
            <h2 className="text-[34px] font-black leading-tight text-slate-900 lg:text-[42px]">
              ¿Por qué hacerlo
              <br />
              <span className="text-[#25D366]">desde casa?</span>
            </h2>

            <div className="mx-auto mt-8 w-full max-w-[340px] space-y-5 lg:mx-0 lg:mt-10 lg:max-w-none lg:space-y-6">
              {benefits.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-4 text-left"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-white">
                    ✓
                  </div>

                  <p className="pt-1 text-[17px] leading-snug text-slate-700 lg:text-[18px]">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

            {/* Botón WhatsApp */}

            <div className="relative order-4 mx-auto mt-0 w-full lg:order-none lg:mx-0 lg:mt-10 lg:w-fit">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/45 blur-2xl"></div>

              <motion.a
                href="https://wa.me/573118901570?text=Hola,%20quiero%20agendar%20una%20cita"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  transition: {
                    duration: 0.2,
                  },
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  relative
                  flex
                  w-full
                  max-w-[400px]
                  mx-auto

                  lg:max-w-[480px]
                  lg:mx-0
                  lg:w-auto

                  items-center
                  justify-center
                  gap-3

                  rounded-full
                  border
                  border-[#B9FFD0]

                  bg-gradient-to-b
                  from-[#31DD6E]/90
                  to-[#19B858]/90

                  px-7
                  py-3

                  lg:px-9
                  lg:py-5

                  shadow-[0_20px_45px_rgba(37,211,102,.35)]
                "
              >
                <div className="flex h-10 w-10 lg:h-[54px] lg:w-[54px] items-center justify-center rounded-full bg-white/10">
                  <FaWhatsapp className="text-[22px] lg:text-[28px] text-white" />
                </div>

                <div className="text-left">
                  <p className="text-[15px] lg:text-[18px] font-bold text-white">
                    Solicitar Toma de Muestra
                  </p>

                  <p className="text-[11px] lg:text-[12px] text-white/90">
                    Respuesta inmediata por WhatsApp
                  </p>
                </div>
              </motion.a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
