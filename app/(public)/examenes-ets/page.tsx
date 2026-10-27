import { Navbar } from @/components/layout/Navbar;
import { HowToBook } from @/components/shared/HowToBook;
import { Testimonials } from @/components/sections/Testimonials;
import { FooterInfo } from @/components/sections/FooterInfo;
import { Footer } from @/components/sections/Footer;
import { FloatingWhatsapp } from @/components/ui/FloatingWhatsapp;
import { FaShieldAlt, FaWhatsapp, FaPhoneAlt, FaCheckCircle, FaLock, FaFlask } from react-icons/fa;
import Link from next/link;

export default function ExamenesEtsPage() {
  const waUrl = https://wa.me/573007239175?text= + encodeURIComponent(Hola AinovaHealth, solicito informacion confidencial para toma de examenes de ETS a domicilio. Mi nombre es...);

  const tests = [
    {
      title: Panel Completo de ETS,
      desc: Descarte integral: VIH 1 y 2, Sifilis (VDRL), Hepatitis B, Hepatitis C, Clamidia y Gonorrea en una sola toma.,
      badge: Recomendado,
    },
    {
      title: Prueba Rapida VIH & Sifilis,
      desc: Deteccion de alta precision con resultados de confirmacion rapida en sangre por personal de laboratorio.,
      badge: Resultado Express,
    },
    {
      title: Panel Urogenital (Clamidia & Gonorrea),
      desc: Pruebas moleculares y de frotis urogenital con maxima sensibilidad y especificidad clinica.,
      badge: Alta Precision,
    },
    {
      title: Perfil Hepatitis Viral (B y C),
      desc: Antigenos de superficie y anticuerpos serologicos para diagnostico certero y seguro.,
      badge: Salud Hepática,
    },
  ];

  return (
    <main className=min-h-screen overflow-x-hidden bg-white>
      <Navbar />

      <section className=pt-[105px] lg:pt-[125px]>
        <div className=mx-auto max-w-[1320px] px-4>
          <div className=overflow-hidden rounded-[36px] bg-gradient-to-r from-[#083946] via-[#0C5663] to-[#17816F] p-8 md:p-14 text-white>
            <div className=max-w-3xl>
              <div className=inline-flex items-center gap-2 rounded-full bg-emerald-400/20 border border-emerald-300/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-6>
                <FaLock className=text-emerald-300 />
                100% Confidencial • Privacidad Absoluta Garantizada
              </div>

              <h1 className=text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight>
                Pruebas y Exámenes de ETS a Domicilio
              </h1>

              <p className=mt-5 text-base md:text-xl text-teal-50 font-normal leading-relaxed>
                Toma de muestras en la total intimidad y comodidad de tu hogar en Bogotá y Medellín. Sin filas, sin salas de espera ni preguntas incómodas. Resultados digitales seguros en 24 horas.
              </p>

              <div className=mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4>
                <Link
                  href={waUrl}
                  target=_blank
                  rel=noopener noreferrer
                  className=flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-950/20 transition-all hover:bg-emerald-600 hover:scale-[1.02]
                >
                  <FaWhatsapp className=text-xl />
                  <span>Cotizar por WhatsApp Privado</span>
                </Link>

                <a
                  href=tel:+573007239175
                  className=flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20
                >
                  <FaPhoneAlt />
                  <span>Llamar al Laboratorio 24/7</span>
                </a>
              </div>

              <p className=mt-4 text-xs text-teal-200/90 flex items-center gap-2>
                <FaShieldAlt className=text-emerald-400 />
                Bacteriólogos certificados • Manejo ético y seguro de datos • Bogotá, Medellín y Sabana Norte
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=py-16 md:py-24 bg-slate-50>
        <div className=mx-auto max-w-[1320px] px-4>
          <div className=text-center max-w-2xl mx-auto mb-12>
            <h2 className=text-2xl md:text-4xl font-bold text-slate-900>
              Paneles de Detección en la Intimidad de tu Hogar
            </h2>
            <p className=mt-3 text-slate-600 text-sm md:text-base>
              Tu salud e intimidad son nuestra prioridad. Recibe la visita de un profesional de salud con maletín sellado y embalaje neutro.
            </p>
          </div>

          <div className=grid md:grid-cols-2 lg:grid-cols-4 gap-6>
            {tests.map((t, idx) => (
              <div
                key={idx}
                className=rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-teal-500/40 flex flex-col justify-between
              >
                <div>
                  <span className=inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 mb-4>
                    {t.badge}
                  </span>
                  <h3 className=text-lg font-bold text-slate-900 mb-2>
                    {t.title}
                  </h3>
                  <p className=text-sm text-slate-600 leading-relaxed>
                    {t.desc}
                  </p>
                </div>
                <div className=mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-600 font-semibold>
                  <FaCheckCircle /> Resultados en 24h por canal seguro
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowToBook />
      <Testimonials />
      <FooterInfo />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}
