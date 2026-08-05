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
      className="flex justify-center"
    >
      <div className="w-full max-w-[620px] px-6 py-8 lg:px-16 lg:py-20">

        {/* Badge */}
        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex justify-center lg:justify-start"
>

  <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[2px] text-white backdrop-blur-md">
    Atención médica a domicilio
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
      Médico
    </span>

    <span className="block text-[72px] font-black text-white">
      en Casa
    </span>

    <div className="mt-2 flex items-center gap-5">

    <span className="text-[30px] font-black text-[#25D366]">
  60–90 min
</span>

      <svg
        width="150"
        height="45"
        viewBox="0 0 180 60"
        fill="none"
      >
        <path
          d="M0 30 H40 L55 30 L68 12 L80 48 L93 8 L108 30 H180"
          stroke="#25D366"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

    </div>

  </div>

  {/* MÓVIL */}

  <div className="text-center lg:hidden">

<span className="block text-[54px] font-black text-white">
  Médico
</span>

<span className="block text-[54px] font-black text-white">
  en Casa
</span>

<div className="mt-5 flex justify-center">

<span className="text-[40px] font-black text-[#25D366]">
  60–90 min
</span>


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
  className="mx-auto mt-4 max-w-[520px] text-center text-[18px] leading-7 text-white/90 lg:text-left lg:text-[22px] lg:leading-9"
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
  className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
>

          <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] text-white backdrop-blur-md">
            Sin filas
          </div>

          <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] text-white backdrop-blur-md">
            Sin desplazamientos
          </div>

          <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] text-white backdrop-blur-md">
            Atención inmediata
          </div>

          </motion.div>

        {/* Botón */}

        <div className="relative mt-6 w-full lg:w-fit">

          <div className="absolute inset-0 rounded-full bg-[#25D366]/50 blur-2xl"></div>

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
    max-w-[360px]
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
    py-4
    shadow-[0_20px_45px_rgba(37,211,102,.35)]
  "
>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <FaWhatsapp className="text-[28px] text-white" />
            </div>

            <div className="text-left">
              <p className="text-[18px] font-bold text-white">
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