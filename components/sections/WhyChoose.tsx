"use client";

import { motion } from "framer-motion";

export function WhyChoose() {
  return (
    <section
      id="como-funciona"
      className="py-20 px-4"
    >
      <div className="mx-auto max-w-[1280px]">

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_.85fr]">

          {/* VIDEO */}

          <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.08)]">

            <div className="relative aspect-video overflow-hidden">

              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="/videos/testimonio.mp4"
                  type="video/mp4"
                />
              </video>

            </div>

            <div className="bg-white p-6 text-center">

              <p className="font-bold text-slate-900">
                "Gracias por confiar en AinovaHealth"
              </p>

              <p className="mt-2 text-slate-500">
                Atención médica rápida y segura.
              </p>

            </div>

          </div>

          {/* POR QUÉ ELEGIR */}

          <div className="rounded-[30px] bg-[#F4FBF8] p-8">

            <h2 className="text-[34px] font-black text-slate-900">
              ¿Por qué elegir AinovaHealth?
            </h2>

            <div className="mt-8 space-y-6">

              {[
                "Médicos certificados",
                "Atención rápida",
                "Llegamos hasta tu hogar",
                "Sin largas esperas",
                "Atención cálida y humana",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#22C55E] text-white">
                    ✓
                  </div>

                  <p className="text-[18px] text-slate-700">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* ASÍ FUNCIONA */}

          <div className="rounded-[30px] bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,.08)]">

            <h2 className="text-[34px] font-black text-slate-900">
              Así funciona
            </h2>

            <div className="mt-8 space-y-5">

              {[
                {
                  text: "Escríbenos por WhatsApp",
                  link: "https://wa.me/573118901570?text=Hola,%20quiero%20solicitar%20un%20médico%20en%20casaahora."
                },
                {
                  text: "Cuéntanos qué sucede",
                  link: "https://wa.me/573118901570?text=Hola,%20necesito%20orientación%20médic@."
                },
                {
                  text: "Asignamos un médico",
                  link: "https://wa.me/573118901570?text=Hola,%20quiero%20solicitar%20la%20visita%20de%20un%20especialista."
                },
                {
                  text: "Llegamos a tu domicilio",
                  link: "https://wa.me/573118901570?text=Hola,%20quiero%20agendar%20una%20atención%20médica%20a%20domicili@."
                },
              ].map((item, index) => (

                <a
                  key={item.text}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -60,
                      scale: 0.95,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.18,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.03,
                    }}
                    className={
                      index === 0
                        ? "flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#19B858] p-4 shadow-[0_18px_45px_rgba(37,211,102,.40)] transition-all duration-300"
                        : "flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-all duration-300 hover:bg-[#F4FBF8]"
                    }
                  >

                    <div
                      className={
                        index === 0
                          ? "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 font-bold text-white"
                          : "flex h-11 w-11 items-center justify-center rounded-full bg-[#22C55E] font-bold text-white"
                      }
                    >
                      {index + 1}
                    </div>

                    <p
                      className={
                        index === 0
                          ? "font-semibold text-white"
                          : "font-medium text-slate-700"
                      }
                    >
                      {item.text}
                    </p>

                  </motion.div>

                </a>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}