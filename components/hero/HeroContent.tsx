"use client";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
      className="flex justify-center items-center"
    >
      <div className="w-full max-w-[620px] px-5 pt-6 pb-6 lg:px-16 lg:py-20">

        {/* Badge */}
        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex justify-center lg:justify-start"
>

<div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[2px] text-white backdrop-blur-md">

<span className="relative flex h-3 w-3">

  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-70"></span>

  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366] shadow-[0_0_16px_rgba(37,211,102,1)]"></span>

</span>

<span>
  Atención médica a domicilio
</span>

</div>

  </motion.div>

        {/* Título */}
        <motion.h1
  className="mt-4 leading-none lg:mt-6"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    delay: 0.2,
    duration: 0.7,
  }}
>

  {/* DESKTOP */}

  <div className="hidden lg:block">

    <span className="block text-[72px] font-black text-white">
    ¿Necesitas un
    </span>

    <span className="block text-[72px] font-black text-white">
    médico hoy?
    </span>

    <div className="mt-6">

  <div className="flex items-center gap-8">

    <div className="h-[2px] w-[170px] lg:w-[230px] rounded-full bg-[#25D366]/80"></div>

    <svg
      width="90"
      height="32"
      viewBox="0 0 120 40"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M0 20
           H28
           L38 8
           L48 32
           L58 5
           L68 20
           H120"
        stroke="#25D366"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  </div>

  <h2 className="mt-6 text-[32px] font-semibold leading-tight text-white">

    Atención médica a domicilio en{" "}

    <span className="font-black text-[#25D366] uppercase tracking-wide">
      BOGOTÁ Y MEDELLÍN
    </span>

  </h2>

</div>

  </div>

  {/* MÓVIL */}

  <div className="mx-auto max-w-[340px] text-center lg:hidden">

<span className="block text-[40px] font-black leading-[1.08] tracking-[-0.02em] text-white">
  ¿Necesitas
</span>

<span className="block text-[38px] font-black leading-[1.08] tracking-[-0.02em] text-white">
  un médico hoy?
</span>

{/* Línea + ECG */}

<div className="mt-4 flex items-center justify-center gap-2.5">

  <div className="h-[2px] w-[66px] rounded-full bg-[#25D366]/80"></div>

  <svg
    width="58"
    height="20"
    viewBox="0 0 120 40"
    fill="none"
  >
    <path
      d="M0 20
         H28
         L38 8
         L48 32
         L58 5
         L68 20
         H120"
      stroke="#25D366"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  <div className="h-[2px] w-[66px] rounded-full bg-[#25D366]/80"></div>

</div>

{/* Subtítulo */}

<div className="mt-4">

  <p className="mx-auto max-w-[340px] text-[19px] font-semibold leading-[1.35] text-white">
    Atención médica a domicilio en
  </p>

  <p className="mx-auto mt-1.5 max-w-[340px] text-[24px] font-black uppercase leading-[1.18] text-[#25D366]">
    BOGOTÁ Y MEDELLÍN
  </p>

</div>

</div>

</motion.h1>

        {/* Descripción */}

        <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: 0.45,
    duration: 0.6,
  }}
  className="
mx-auto
mt-3
max-w-[280px]
text-center
text-[13px]
leading-[1.72]
font-medium
text-white/90
lg:mx-0
lg:mt-4
lg:max-w-[520px]
lg:text-left
lg:text-[22px]
lg:leading-9
"
>
          Recibe atención médica profesional en la comodidad de tu hogar.
          Atención rápida, segura y sin desplazamientos.
          </motion.p>

        {/* Chips */}

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.6,
    duration: 0.5,
  }}
  className="
mt-4
flex
flex-wrap
justify-center
gap-2
lg:mt-8
lg:gap-4
lg:justify-start
"
>

<div
  className="
    rounded-full
    border
    border-white/20
    bg-white/10
    px-3
    py-1.5
    text-[11px]
    font-medium
    text-white/90
    backdrop-blur-md
    lg:px-4
    lg:py-2
    lg:text-[13px]
    lg:text-white
  "
>
  Sin filas
</div>

<div
  className="
    rounded-full
    border
    border-white/20
    bg-white/10
    px-3
    py-1.5
    text-[11px]
    font-medium
    text-white/90
    backdrop-blur-md
    lg:px-4
    lg:py-2
    lg:text-[13px]
    lg:text-white
  "
>
  Vamos hasta tu hogar
</div>

<div
  className="
    rounded-full
    border
    border-white/20
    bg-white/10
    px-3
    py-1.5
    text-[11px]
    font-medium
    text-white/90
    backdrop-blur-md
    lg:px-4
    lg:py-2
    lg:text-[13px]
    lg:text-white
  "
>
  Atención inmediata
</div>

          </motion.div>

        {/* Botón */}

<div className="relative mt-4 w-full lg:mt-6 lg:w-fit">

<div className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/45 blur-2xl"></div>

<motion.a
  href="https://wa.me/573007239175?text=Hola,%20quiero%20agendar%20una%20cita"
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, scale: 0.7 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    delay: 0.9,
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
    max-w-[320px]
    mx-auto

    lg:max-w-[380px]
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

    px-5
    py-3

    lg:px-6
    lg:py-5

    shadow-[0_20px_45px_rgba(37,211,102,.35)]
  "
>

  <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-white/10">
    <FaWhatsapp className="text-[24px] lg:text-[31px] text-white" />
  </div>

  <div className="text-left">
    <p className="text-[16px] lg:text-[20px] font-bold text-white">
      Solicitar Médico Ahora
    </p>

    <p className="text-[12px] lg:text-[13px] text-white/90">
      Respuesta inmediata por WhatsApp
    </p>
  </div>

</motion.a>

</div>

      </div>
      </motion.div>
  );
}