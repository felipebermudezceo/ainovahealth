import Image from "next/image";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      city: "Bogotá (Usaquén)",
      photo: "/images/testimonials/paciente1.jpg",
      text: "El médico llegó en 45 minutos a nuestro apartamento. Revisó con mucha calma a mi mamá, nos dio la fórmula médica y explicó cada síntoma con paciencia.",
    },
    {
      name: "Carlos Ramírez",
      city: "Chía / Sabana",
      photo: "/images/testimonials/paciente2.jpg",
      text: "Excelente servicio para mi hijo con fiebre alta. Evitamos llevarlo a urgencias a la medianoche con riesgo de contagio. Trato pediátrico impecable.",
    },
    {
      name: "Sandra López",
      city: "Medellín (El Poblado)",
      photo: "/images/testimonials/paciente3.jpg",
      text: "Puntualidad y profesionalismo total. Hicieron electrocardiograma en reposo y nos entregaron el reporte interpretado en el momento. Muy recomendados.",
    },
  ];

  return (
    <section id="testimonios" className="bg-slate-50/50 py-16 px-4 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
            Experiencias Reales
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#083946] sm:text-3xl lg:text-4xl">
            La confianza de nuestros pacientes
          </h2>
          <p className="mx-auto mt-2 text-sm text-slate-500 sm:text-base">
            Familias en Bogotá, Medellín y Sabana que reciben atención médica con tranquilidad en su hogar.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-700 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#083946]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {item.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}