"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Bone,
  HeartPulse,
  FlaskConical,
  Ear,
  ScanLine,
  Droplets,
  Baby,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export function Conditions() {
  const items = [
    {
      icon: Stethoscope,
      title: "Medicina General",
    },
    {
      icon: Bone,
      title: "Ortopedia y Traumatología",
    },
    {
      icon: HeartPulse,
      title: "Electrocardiograma",
    },
    {
      icon: FlaskConical,
      title: "Laboratorio Clínico",
    },
    {
      icon: Ear,
      title: "Lavado de Oídos",
    },
    {
      icon: ScanLine,
      title: "Ultrasonografía",
    },
    {
      icon: Droplets,
      title: "Sueroterapia",
    },
    {
      icon: Baby,
      title: "Valoración Pediátrica",
    },
  ];

  return (
    <section
      id="servicios"
      className="py-16 px-4"
    >
      <div className="mx-auto max-w-[1280px]">

        <h2 className="text-center text-[42px] font-black text-slate-900">
          ¿Qué atendemos?
        </h2>

        <p className="mt-2 text-center text-slate-500">
          Atención para niños, adultos y adultos mayores
        </p>

        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#21C56A]" />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">

          {items.map((item, index) => {
            const Icon = item.icon;

            const message = encodeURIComponent(
              `Hola, me interesa el servicio de ${item.title}. Quisiera recibir más información.`
            );

            return (
              <a
                key={item.title}
                href={`https://wa.me/573118901570?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="
                    flex
                    min-h-[215px]
                    flex-col
                    items-center
                    justify-between
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-6
                    text-center
                    shadow-sm
                    transition-all
                    duration-300
                    cursor-pointer
                    group-hover:border-[#22C55E]
                    group-hover:bg-[#F7FFF9]
                    group-hover:shadow-[0_25px_45px_rgba(34,197,94,.22)]
                  "
                >

                  {/* ICONO */}

                  <motion.div
                    className="
                      mb-2
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-[#ECFDF5]
                      transition-all
                      duration-300
                      group-hover:bg-[#22C55E]
                    "
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    whileHover={{
                      rotate: 10,
                      scale: 1.15,
                    }}
                  >
                    <Icon
                      size={34}
                      strokeWidth={2.2}
                      className="
                        text-[#22C55E]
                        transition-all
                        duration-300
                        group-hover:text-white
                      "
                    />
                  </motion.div>

                  {/* TITULO */}

                  <p
                    className="
                      text-[15px]
                      lg:text-[13px]
                      font-semibold
                      leading-6
                      text-slate-700
                      transition-colors
                      duration-300
                      group-hover:text-[#15803D]
                    "
                  >
                    {item.title}
                  </p>

                  {/* BOTÓN */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      gap-1
                      rounded-full
                      bg-[#ECFDF5]
                      px-3
                      py-1.5
                      text-[12px]
                      font-semibold
                      text-[#16A34A]
                      opacity-0
                      translate-y-2
                      transition-all
                      duration-300
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    <MessageCircle size={14} />
                    <span>Consultar</span>
                    <ArrowRight size={13} />
                  </div>

                </motion.div>
              </a>
            );
          })}

        </div>

      </div>
    </section>
  );
}