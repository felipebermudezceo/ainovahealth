"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Image from "next/image";
import { useEffect, useState } from "react";

export function LaboratoryHeroImage() {
  const cards = [
    {
      icon: "🧪",
      title: "Más de 2.500",
      subtitle: "pacientes atendidos",
    },
    {
      icon: "📄",
      title: "Resultados",
      subtitle: "100% digitales",
    },
    {
      icon: "⏱️",
      title: "Menos de",
      subtitle: "60 minutos",
      time: "Tiempo promedio de llegada",
    },
  ];
  
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 4000);
  
    return () => clearInterval(interval);
  }, []);

  const cardWrapperClass = `
rounded-[18px]
lg:rounded-[24px]

border
border-white/30

bg-white/88
backdrop-blur-2xl

px-3
py-3

lg:px-5
lg:py-4

shadow-[0_18px_50px_rgba(15,23,42,.15)]

min-w-[255px]
lg:min-w-[250px]
`;

  const renderCardContent = (index: number) => (
    <div className="flex items-center gap-4">

      <div className="
flex
h-10
w-10

lg:h-11
lg:w-11

items-center
justify-center
rounded-xl
bg-white
shadow-md
text-[20px]
lg:text-[22px]
">

        {cards[index].icon}

      </div>

      <div>

        <p className="text-[15px] lg:text-[18px]
font-black font-black text-slate-900">

          {cards[index].title}

        </p>

        <p className="text-[13px] lg:text-[14px] font-medium text-[#0C5663]">

          {cards[index].subtitle}

        </p>

        {cards[index].time && (
          <p className="mt-1 text-[11px] lg:text-[12px] text-slate-500">

            {cards[index].time}

          </p>
        )}

      </div>

    </div>
  );

  return (
    <motion.div
      className="relative h-[340px] lg:h-[760px]"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
    >
      {/* Imagen */}

      <div className="relative h-full">

  {/* Imagen Desktop */}
<Image
  src="/images/hero/laboratorio-domicilio.png"
  alt="Laboratorio clínico a domicilio"
  fill
  priority
  className="
    hidden
    lg:block
    object-cover
    object-[62%_center]
  "
/>

{/* Imagen Mobile */}
<Image
  src="/images/hero/laboratorio-domicilio.png"
  alt="Laboratorio clínico a domicilio"
  fill
  priority
  className="
    block
    lg:hidden
    object-cover
    object-center
  "
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
    top-0
    left-0
    right-0
    h-[180px]
    lg:hidden
    bg-gradient-to-b
    from-[#0C5663]/90
    via-[#0C5663]/40
    to-transparent
  "
/>

</div>

      {/* Tarjetas Desktop */}

      <motion.div
        className="
        hidden
        lg:flex
        lg:absolute
        lg:inset-y-0
        lg:right-8
        lg:flex-col
        lg:justify-center
        lg:gap-4
        lg:z-40
        "
        animate={{
          y: [105, 95, 105],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

        {cards.map((_, index) => (
          <div key={index} className={cardWrapperClass}>
            {renderCardContent(index)}
          </div>
        ))}

      </motion.div>

      {/* Tarjeta flotante Mobile */}

      <motion.div
        className="
        fixed
        bottom-5
        left-4
        z-40
        
        w-[255px]
        
        lg:hidden
        "
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

<div className={cardWrapperClass}>

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

    {renderCardContent(current)}

  </motion.div>

</AnimatePresence>

</div>

      </motion.div>

    </motion.div>
  );
}
