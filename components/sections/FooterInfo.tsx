import {
    MapPin,
    CreditCard,
    ShieldCheck,
  } from "lucide-react";
  
  export function FooterInfo() {
    return (
      <section className="border-t border-slate-100 py-10">
  
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-4 text-center lg:flex-row lg:text-left">
  
          {/* Cobertura */}
  
          <div className="flex items-center gap-4">
  
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5]">
  
              <MapPin className="text-[#27B96D]" />
  
            </div>
  
            <div>
  
              <p className="font-bold text-slate-900">
                Cobertura
              </p>
  
              <p className="text-slate-500">
                Bogotá y municipios cercanos
              </p>
  
            </div>
  
          </div>
  
          {/* Pagos */}
  
          <div className="flex items-center gap-4">
  
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5]">
  
              <CreditCard className="text-[#27B96D]" />
  
            </div>
  
            <div>
  
              <p className="font-bold text-slate-900">
                Métodos de pago
              </p>
  
              <p className="text-slate-500">
                Visa • Mastercard • Nequi • PSE
              </p>
  
            </div>
  
          </div>
  
          {/* Médicos */}
  
          <div className="flex items-center gap-4">
  
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5]">
  
              <ShieldCheck className="text-[#27B96D]" />
  
            </div>
  
            <div>
  
              <p className="font-bold text-slate-900">
                Profesionales
              </p>
  
              <p className="text-slate-500">
                Médicos certificados
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }