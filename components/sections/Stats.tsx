export function Stats() {
  const items = [
    {
      icon: "👨‍👩‍👧",
      title: "Más de",
      value: "+2.500",
      subtitle: "Familias atendidas",
    },
    {
      icon: "🛡️",
      value: "Médicos",
      subtitle: "certificados",
    },
    {
      icon: "🏠",
      value: "Llegamos",
      subtitle: "hasta tu hogar",
    },
    {
      icon: "💚",
      value: "Atención cálida",
      subtitle: "y humana",
    },
  ];

  return (
    <section className="relative z-30 -mt-10 px-4">
      <div className="mx-auto max-w-[1280px]">

        <div className="overflow-hidden rounded-[30px] border border-white/60 bg-white/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,.12)]">

          <div className="grid grid-cols-2 lg:grid-cols-4">

            {items.map((item, index) => (

              <div
                key={index}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  px-4
                  py-8
                  border-b
                  border-r
                  border-slate-100
                  last:border-r-0
                  even:border-r-0
                  lg:flex-row
                  lg:items-center
                  lg:justify-start
                  lg:text-left
                  lg:px-7
                  lg:py-8
                  lg:border-b-0
                  lg:border-r
                  lg:last:border-r-0
                "
              >

                {/* Icono */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#ECFDF5]
                    to-[#D1FAE5]
                    text-[30px]
                    shadow-md
                  "
                >
                  {item.icon}
                </div>

                {/* Texto */}

                <div className="mt-4 lg:mt-0 lg:ml-5">

                  {item.title && (
                    <p className="text-[15px] text-slate-500">
                      {item.title}
                    </p>
                  )}

                  <p className="mt-1 text-[24px] font-black leading-none text-slate-900 lg:text-[22px]">
                    {item.value}
                  </p>

                  <p className="mt-2 text-[17px] leading-6 text-slate-500 lg:mt-1 lg:text-[15px] lg:leading-5">
                    {item.subtitle}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}