import { FaWhatsapp } from "react-icons/fa";

export function CTA() {
  return (
    <section className="px-4 pb-20">

      <div className="mx-auto max-w-[1280px]">

      <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0A3D49] via-[#10685D] to-[#27B96D] px-8 lg:px-12 py-10">

          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            {/* Texto */}

            <div>

              <h2 className="text-[42px] font-black leading-none text-white">
                Tu salud no puede esperar.
              </h2>

              <p className="mt-3 max-w-[520px] text-[18px] text-white/90">
                Solicita un médico a domicilio 24/7 y recibe atención profesional sin salir de casa.
              </p>

            </div>

            {/* Botón */}

            <a
  href="https://wa.me/573105769818?text=Hola,%20quiero%20agendar%20una%20consulta"
  target="_blank"
  rel="noopener noreferrer"
  className="
    flex
    items-center
    gap-3
    rounded-full
    bg-[#25D366]
    px-7
    py-4
    lg:px-9
    shadow-[0_20px_45px_rgba(37,211,102,.30)]
    transition
    hover:scale-[1.02]
  "
>

<FaWhatsapp className="text-[28px] text-white" />

<div className="text-left">

<p className="text-[18px] font-bold text-white lg:text-[20px]">
  Solicitar Médico Ahora
</p>

<p className="mt-1 text-[13px] text-white/80">
  Respuesta inmediata por whatsapp
</p>

</div>

</a>

          </div>

        </div>

      </div>

    </section>
  );
}