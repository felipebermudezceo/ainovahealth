import { HeartHandshake, Stethoscope, FileCheck, Home, CheckCircle2, Clock, XCircle } from "lucide-react";

export function WhyChoose() {
  const steps = [
    {
      step: "Paso 1",
      title: "Escríbenos o llámanos",
      desc: "Cuéntanos brevemente qué síntomas presentas y en qué barrio o localidad te encuentras.",
    },
    {
      step: "Paso 2",
      title: "Coordinamos tu visita",
      desc: "Te confirmamos el tiempo de llegada estimado (habitualmente de 45 a 60 minutos).",
    },
    {
      step: "Paso 3",
      title: "Atención médica en tu hogar",
      desc: "El médico llega a tu casa, te examina con paciencia, revisa tus signos y te escucha.",
    },
    {
      step: "Paso 4",
      title: "Tratamiento y fórmula",
      desc: "Recibes tu diagnóstico, fórmula para comprar medicamentos e incapacidad si la necesitas.",
    },
  ];

  const benefits = [
    {
      icon: HeartHandshake,
      title: "Trato cercano y con vocación",
      desc: "Creemos en la medicina con empatía. Te escuchamos sin afán y te explicamos cada detalle con calma.",
    },
    {
      icon: Stethoscope,
      title: "Instrumental médico completo",
      desc: "Llevamos equipos portátiles para revisar presión, saturación, frecuencia cardíaca y examen físico.",
    },
    {
      icon: FileCheck,
      title: "Fórmula médica e incapacidad",
      desc: "Te entregamos la receta médica con indicaciones claras de dosis y certificado de incapacidad si lo requieres.",
    },
    {
      icon: Home,
      title: "Sin salir de tu cama",
      desc: "Evitas trancones, traslados difíciles bajo la lluvia y horas interminables en salas de espera.",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 px-4 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        {/* Encabezado Humano */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 px-3.5 py-1 text-xs font-medium text-emerald-900">
            <span>Cuidado médico con vocación humana</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#083946] sm:text-3xl lg:text-4xl">
            La tranquilidad de un médico en casa
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
            Atención médica particular y cercana. Sin cuotas mensuales, sin contratos de afiliación ni trámites engorrosos: simplemente nos llamas y vamos a cuidarte.
          </p>
        </div>

        {/* 4 Pilares de Atención Humana */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-[#16A34A]/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#16A34A]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#083946]">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparativa: Médico en Casa vs Sala de Urgencias */}
        <div id="particular" className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 text-center sm:text-left">
            <h3 className="text-xl font-bold text-[#083946] sm:text-2xl">
              ¿Por qué pedir un médico particular a domicilio?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Compara la experiencia de ser atendido en casa frente a una sala de espera tradicional.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-2 md:divide-y-0 md:divide-x">
            {/* AinovaHealth */}
            <div className="p-6 sm:p-8 bg-emerald-50/30">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[#16A34A]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold text-[#083946]">
                  Con AinovaHealth (En tu casa)
                </h4>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Llegada en 45 a 60 min:</strong> Te confirmamos el tiempo al contactarnos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Sin riesgo de contagio:</strong> Descansas en tu cama o sala, protegido de salas infecciosas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Tiempo dedicado y humano:</strong> El médico te escucha con calma, sin citas apresuradas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Fórmula médica oficial:</strong> Prescripción para farmacias e incapacidad médica.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Cero suscripciones:</strong> Pagas únicamente la visita que solicitas (Nequi, Daviplata, transferencia o efectivo).</span>
                </li>
              </ul>
            </div>

            {/* Urgencias Tradicionales */}
            <div className="p-6 sm:p-8 bg-slate-50/40">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <XCircle className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold text-slate-700">
                  Sala de Urgencias Tradicional
                </h4>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>4 a 8 horas de espera:</strong> Largas filas en triage si tu caso no es catalogado como riesgo vital.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Exposición a virus:</strong> Salas llenas de personas con tos, gripes y bacterias.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Consultas de 10 minutos:</strong> Médicos sobrecargados con poco tiempo para escucharte.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Traslados incómodos:</strong> Movilizar a un familiar enfermo en taxi o tráfico pesado.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Trámites y autorizaciones:</strong> Diligenciamiento de turnos, radicación y demoras.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Paso a Paso Simple */}
        <div className="mt-16 rounded-2xl border border-slate-200/90 bg-slate-50/60 p-6 sm:p-10">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-[#083946] sm:text-2xl">
              ¿Cómo solicitar tu atención médica en casa?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Un proceso sencillo y directo en solo 4 pasos.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <div
                key={s.step}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <span className="text-xs font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-md">
                  {s.step}
                </span>
                <h4 className="mt-3 text-base font-semibold text-[#083946]">
                  {s.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 sm:text-sm">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Sin contratos mensuales ni cobros por adelantado</span>
            </div>
            <a
              href="https://wa.me/573007239175?text=Hola%20AinovaHealth%2C%20quisiera%20agendar%20una%20atenci%C3%B3n%20m%C3%A9dica%20a%20domicilio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#083946] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#062933] sm:text-sm"
            >
              Solicitar médico ahora por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}