import {
  MapPin,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export function FooterInfo() {
  return (
    <section
      id="cobertura"
      className="border-t border-slate-100 py-10"
    >
      <div className="mx-auto max-w-[1280px] px-6">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Cobertura */}

          <div className="flex items-start gap-4 lg:items-center">

            <div className="mt-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF5] lg:mt-0">

              <MapPin
                size={30}
                className="text-[#27B96D]"
              />

            </div>

            <div className="flex-1">

              <p className="text-[18px] font-bold text-slate-900">
                Cobertura
              </p>

              <p className="mt-1 text-slate-500">
                Bogotá y municipios cercanos
              </p>

            </div>

          </div>

          {/* Métodos de pago */}

          <div className="flex items-start gap-4 lg:items-center">

            <div className="mt-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF5] lg:mt-0">

              <CreditCard
                size={30}
                className="text-[#27B96D]"
              />

            </div>

            <div className="flex-1">

              <p className="text-[18px] font-bold text-slate-900">
                Métodos de pago
              </p>

              <p className="mt-1 text-slate-500">
                Visa • Mastercard • Nequi • PSE
              </p>

            </div>

          </div>

          {/* Profesionales */}

          <div className="flex items-start gap-4 lg:items-center">

            <div className="mt-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF5] lg:mt-0">

              <ShieldCheck
                size={30}
                className="text-[#27B96D]"
              />

            </div>

            <div className="flex-1">

              <p className="text-[18px] font-bold text-slate-900">
                Profesionales
              </p>

              <p className="mt-1 text-slate-500">
                Médicos certificados
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}