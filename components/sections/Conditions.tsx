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
                href={`https://wa.me/573105769818?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.04,
                  }}
                  className="
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
                    group-hover:border-[#21C56A]
                    group-hover:bg-[#F4FFF7]
                    group-hover:shadow-[0_25px_45px_rgba(33,197,106,.20)]
                  "
                >

                  <motion.div
                    className="mb-4 flex justify-center"
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
                      scale: 1.25,
                      rotate: 8,
                    }}
                  >
                    <Icon
                      size={36}
                      strokeWidth={2.2}
                      className="text-[#21C56A] transition-colors duration-300 group-hover:text-[#16A34A]"
                    />
                  </motion.div>

                  <div>

  <p className="text-[15px] lg:text-[13px] font-medium leading-6 text-slate-700 transition-colors duration-300 group-hover:text-[#15803D]">
    {item.title}
  </p>

  <motion.p
    initial={{ opacity: 0, y: 6 }}
    whileHover={{}}
    className="
      mt-2
      text-[12px]
      font-semibold
      text-[#22C55E]
      opacity-0
      transition-all
      duration-300
      group-hover:translate-y-0
      group-hover:opacity-100
    "
  >
    💬 Consultar por WhatsApp
  </motion.p>

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