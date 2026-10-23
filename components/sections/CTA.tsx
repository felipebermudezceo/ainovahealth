import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export function CTA() {
  return (
    <section className="px-4 pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="overflow-hidden rounded-3xl bg-[#083946] px-6 py-10 sm:px-12 sm:py-12">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                ¿Necesitas un médico en casa hoy?
              </h2>
              <p className="mt-3 max-w-[560px] text-base leading-relaxed text-slate-200">
                Escríbenos o llámanos ahora. Coordinamos la visita de un médico dedicado para atenderte en Bogotá o Medellín en 45 a 60 minutos, sin trámites de EPS ni suscripciones.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://wa.me/573007239175?text=Hola%20AinovaHealth%2C%20requiero%20atenci%C3%B3n%20m%C3%A9dica%20a%20domicilio.%20Mi%20nombre%20es..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl bg-[#22C55E] px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-[#16A34A]"
              >
                <FaWhatsapp className="text-2xl" />
                <div className="text-left">
                  <p className="text-sm font-bold">Solicitar por WhatsApp</p>
                  <p className="text-[11px] font-normal text-white/90">Respuesta y triaje ágil</p>
                </div>
              </a>

              <a
                href="tel:+573007239175"
                className="flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <FaPhoneAlt className="text-sm text-emerald-300" />
                <span>Llamar Ahora</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}