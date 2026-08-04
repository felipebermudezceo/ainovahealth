"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Users,
  MapPin,
  Star,
  MessageCircle,
  Activity,
} from "lucide-react";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroImage() {
  const cards = [
    {
      icon: Users,
      badge: "EN VIVO",
      title: "14 personas",
      subtitle: "están viendo esta página",
      time: "Hace unos segundos",
      color: "text-emerald-500",
    },
    {
      icon: MessageCircle,
      badge: "CONSULTA",
      title: "Laura G.",
      subtitle: "Agendó una consulta",
      time: "Hace 8 minutos",
      color: "text-[#25D366]",
    },
    {
      icon: MapPin,
      badge: "DISPONIBLE",
      title: "Médico cerca de ti",
      subtitle: "Disponible en tu zona",
      time: "En este momento",
      color: "text-sky-500",
    },
    {
      icon: Star,
      badge: "CALIFICACIÓN",
      title: "4.9 / 5",
      subtitle: "Más de 2.500 familias",
      time: "Pacientes satisfechos",
      color: "text-yellow-500",
    },
    {
      icon: Activity,
      badge: "RESPUESTA",
      title: "Menos de 3 minutos",
      subtitle: "Tiempo promedio",
      time: "Vía WhatsApp",
      color: "text-emerald-500",
    },
  ];
  
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 4000);
  
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
    >
      {/* Imagen */}

      <div className="relative h-[340px] lg:h-[760px]">

        <Image
          src="/images/hero/medico-en-casa.webp"
          alt="Médico en casa"
          fill
          priority
          className="object-cover object-[54%_25%] lg:object-[58%_center]"
        />

        {/* Degradado Desktop */}

        <div
          className="
            absolute
            inset-0
            hidden
            lg:block
            bg-gradient-to-r
            from-[#0C5663]
            via-[#0C5663]/65
            via-[28%]
            to-transparent
          "
        />

        {/* Degradado Mobile */}

        <div
          className="
            absolute
            inset-0
            lg:hidden
            bg-gradient-to-b
            from-[#0C5663]
            via-[#0C5663]/45
            via-[30%]
            to-transparent
          "
        />

      </div>

      {/* Tarjeta flotante */}

      <motion.div
        className="absolute top-5 left-4 lg:left-auto lg:right-8"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

<div className="rounded-[18px] lg:rounded-[24px] border border-white/20 bg-white/30 px-4 py-3 lg:px-5 lg:py-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.18)] min-w-[230px] lg:min-w-[250px]">

<AnimatePresence mode="wait">

  <motion.div
    key={current}
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -20,
    }}
    transition={{
      duration: .45,
    }}
  >

    {(() => {

      const Icon = cards[current].icon;

      return (

        <>

          {/* Badge */}

          <div className="mb-3 flex items-center gap-2">

            <span className="relative flex h-3 w-3">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>

              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366]"></span>

            </span>

            <p className="text-[10px] font-bold tracking-[2px] text-slate-600">

              {cards[current].badge}

            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-md">

              <Icon
                className={`h-5 w-5 ${cards[current].color}`}
              />

            </div>

            <div>

              <p className="text-[17px] lg:text-[18px] font-black text-slate-900">

                {cards[current].title}

              </p>

              <p className="text-[14px] font-medium text-[#0C5663]">

                {cards[current].subtitle}

              </p>

              <p className="mt-1 text-[12px] text-slate-500">

                {cards[current].time}

              </p>

            </div>

          </div>

        </>

      );

    })()}

  </motion.div>

</AnimatePresence>

</div>

      </motion.div>

    </motion.div>
  );
}