export function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      city: "Bogotá",
      photo: "/images/testimonials/paciente1.jpg",
      text: "El médico llegó en menos de una hora. Excelente servicio y muy profesional.",
    },
    {
      name: "Carlos Ramírez",
      city: "Chía",
      photo: "/images/testimonials/paciente2.jpg",
      text: "Solicité atención para mi hijo y la experiencia fue increíble. Muy recomendados.",
    },
    {
      name: "Sandra López",
      city: "Cajicá",
      photo: "/images/testimonials/paciente3.jpg",
      text: "La atención fue rápida, humana y sin salir de casa. Volvería a usar el servicio.",
    },
  ];

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden pt-20 pb-8 lg:pt-28 lg:pb-20"
    >
      {/* Banda de color */}

      <div className="absolute left-0 top-1/2 h-[180px] w-full -translate-y-1/2 bg-gradient-to-r from-[#0A3D49] via-[#0E6E60] to-[#27B96D]" />

      <div className="relative mx-auto max-w-[1280px] px-4">

        {/* Título */}

        <div className="mb-12 text-center lg:mb-20">

          <span className="font-semibold uppercase tracking-[3px] text-[#27B96D]">
            Testimonios
          </span>

          <h2 className="mt-3 text-[34px] font-black leading-tight text-slate-900 lg:text-5xl">
            Lo que dicen nuestros pacientes
          </h2>

          <p className="mt-3 text-slate-500">
            Miles de familias ya confían en AinovaHealth.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className={`
                overflow-hidden
                rounded-[30px]
                bg-white
                shadow-[0_20px_55px_rgba(15,23,42,.10)]
                transition-all
                duration-500
                hover:-translate-y-4
                hover:shadow-[0_35px_90px_rgba(15,23,42,.18)]
                ${index === 1 ? "lg:translate-y-12" : ""}
              `}
            >

              <img
                src={item.photo}
                alt={item.name}
                className="h-[180px] w-full object-cover lg:h-[240px]"
              />

              <div className="px-6 py-6 lg:px-8 lg:py-8">

                <div className="flex justify-center text-[30px] leading-none text-[#FACC15]">
                  ★★★★★
                </div>

                <p className="mt-5 text-center text-[18px] leading-8 text-slate-600 lg:text-[20px]">
                  "{item.text}"
                </p>

                <div className="mt-6 text-center">

                  <h3 className="text-[24px] font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-[18px] text-[#27B96D]">
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