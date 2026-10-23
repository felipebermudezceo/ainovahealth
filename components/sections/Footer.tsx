import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { Clock, Home, Stethoscope, HeartHandshake, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contacto" className="px-4 pb-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="overflow-hidden rounded-3xl bg-[#083946] text-white">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1.4fr_1fr] lg:gap-12">
            {/* Columna 1: Marca y Propuesta */}
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ainova<span className="text-[#25D366]">Health</span>
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Atención médica domiciliaria certificada en Bogotá y Medellín. Profesionales capacitados con instrumental portátil para resolver sus necesidades de salud en casa.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/573007239175?text=Hola%20AinovaHealth%2C%20requiero%20solicitar%20un%20m%C3%A9dico%20a%20domicilio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#22C55E] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#16A34A]"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>Solicitar por WhatsApp</span>
                </a>

                <a
                  href="tel:+573007239175"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <FaPhoneAlt className="text-xs text-emerald-300" />
                  <span>300 723 9175</span>
                </a>
              </div>
            </div>

            {/* Columna 2: Compromisos Médicos Reales (Sin emojis) */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Disponibilidad 24/7</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Atención médica todos los días del año, incluyendo fines de semana y festivos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Atención en Casa</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Sin filas ni desplazamientos innecesarios para usted o sus seres queridos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Médicos Dedicados</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Profesionales con vocación y experiencia en atención presencial.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Trato Humano y Cercano</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Atención con empatía, respeto y privacidad total en tu hogar.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna 3: Cobertura Urbana */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2.5 text-emerald-300">
                <MapPin className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Zonas de Cobertura
                </h3>
              </div>

              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• <strong>Bogotá D.C.:</strong> Cobertura norte, centro, occidente y sur.</li>
                <li>• <strong>Sabana Norte:</strong> Chía, Cota, Cajicá, Zipaquirá.</li>
                <li>• <strong>Medellín:</strong> Valle de Aburrá, Poblado, Laureles, Envigado.</li>
              </ul>
            </div>
          </div>

          {/* Barra Inferior */}
          <div className="border-t border-white/10 px-8 py-5 text-xs text-slate-400">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p>© {new Date().getFullYear()} AinovaHealth. Todos los derechos reservados.</p>

              <div className="flex items-center gap-6">
                <Link href="/portal/login" className="transition hover:text-white">
                  Portal Médico
                </Link>
                <a href="#contacto" className="transition hover:text-white">
                  Contacto Directo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}