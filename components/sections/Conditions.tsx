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

            return (
              <motion.div
                key={item.title}
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
                  transition
                  hover:shadow-[0_25px_45px_rgba(0,0,0,.12)]
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
                    className="text-[#21C56A]"
                    strokeWidth={2.2}
                  />
                </motion.div>

                <p className="text-[15px] lg:text-[13px] font-medium leading-6 text-slate-700">
                  {item.title}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}