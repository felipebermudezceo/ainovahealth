import { Users, HeartHandshake, Clock, CheckCircle2 } from "lucide-react";

export function Stats() {
  const items = [
    {
      icon: HeartHandshake,
      value: "100% Humano",
      subtitle: "Atención cercana, paciente y sin prisas",
    },
    {
      icon: Clock,
      value: "45 a 60 min",
      subtitle: "Tiempo estimado de llegada a tu casa",
    },
    {
      icon: Users,
      value: "24 / 7",
      subtitle: "Disponible de domingo a domingo",
    },
    {
      icon: CheckCircle2,
      value: "Sin Planes",
      subtitle: "Pagas solo la consulta que recibes",
    },
  ];

  return (
    <section className="relative z-30 -mt-8 px-4 sm:-mt-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md">
          <div className="grid grid-cols-2 divide-y divide-slate-100 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-5 text-center sm:flex-row sm:items-center sm:justify-start sm:p-6 sm:text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#083946] ring-1 ring-slate-200/70 sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 text-[#16A34A]" />
                  </div>

                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <p className="text-xl font-bold tracking-tight text-[#083946] sm:text-2xl">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}