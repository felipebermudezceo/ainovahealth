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
      <div className="w-full max-w-[620px] px-5 pt-8 pb-10 lg:px-16 lg:py-20">

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
  className="mt-6 leading-none"
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

<div className="text-center lg:hidden">

<span className="block text-[52px] font-black leading-[0.95] text-white">
  ¿Necesitas un
</span>

<span className="block text-[52px] font-black leading-[0.95] text-white">
  médico hoy?
</span>

{/* Línea + ECG */}

<div className="mt-6 flex items-center justify-center gap-3">

  <div className="h-[2px] w-[80px] rounded-full bg-[#25D366]/80"></div>

  <svg
    width="70"
    height="24"
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

  <div className="h-[2px] w-[80px] rounded-full bg-[#25D366]/80"></div>

</div>

{/* Subtítulo */}

<div className="mt-6">

  <p className="text-[24px] font-semibold leading-tight text-white">
    Atención médica a domicilio en
  </p>

  <p className="mt-2 text-[34px] font-black uppercase leading-none text-[#25D366]">
    Bogotá y Medellín
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
mt-5
max-w-[310px]
text-center
text-[16px]
leading-7
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
mt-7
flex
flex-wrap
justify-center
gap-4
lg:mt-8
lg:justify-start
"
>

<div
  className="
    rounded-full
    border
    border-white/20
    bg-white/10
    px-5
    py-[11px]
    text-[14px]
    font-medium
    text-white
    backdrop-blur-md
    lg:px-4
    lg:py-2
    lg:text-[13px]
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
    px-5
    py-[11px]
    text-[14px]
    font-medium
    text-white
    backdrop-blur-md
    lg:px-4
    lg:py-2
    lg:text-[13px]
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
    px-5
    py-[11px]
    text-[14px]
    font-medium
    text-white
    backdrop-blur-md
    lg:px-4
    lg:py-2
    lg:text-[13px]
  "
>
  Atención inmediata
</div>

          </motion.div>

        {/* Botón */}

        <div className="relative mt-6 w-full lg:w-fit">

        <div className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/45 blur-2xl"></div>

          <motion.a
  href="https://wa.me/573118901570?text=Hola,%20quiero%20agendar%20una%20cita"
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
    max-w-[380px]
    mx-auto
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
    px-6
    py-5
    shadow-[0_20px_45px_rgba(37,211,102,.35)]
  "
>

            <div className="flex h-14 w-14 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/10">
              <FaWhatsapp className="text-[31px] lg:text-[28px] text-white" />
            </div>

            <div className="text-left">
              <p className="text-[20px] lg:text-[18px] font-bold text-white">
                Solicitar Médico Ahora
              </p>

              <p className="text-[13px] text-white/90">
                Respuesta inmediata por WhatsApp
              </p>
            </div>

            </motion.a>
          

        </div>

      </div>
      </motion.div>
  );
}