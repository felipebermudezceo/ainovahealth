import { MapPin, CreditCard, HeartHandshake } from "lucide-react";

export function FooterInfo() {
  return (
    <section id="cobertura" className="border-t border-slate-100 py-10 bg-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Cobertura */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#083946] ring-1 ring-slate-200/80">
              <MapPin className="h-6 w-6 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-base font-bold text-[#083946]">Cobertura Urbana</p>
              <p className="text-xs text-slate-500">Bogotá y Medellín</p>
            </div>
          </div>

          {/* Métodos de pago */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#083946] ring-1 ring-slate-200/80">
              <CreditCard className="h-6 w-6 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-base font-bold text-[#083946]">Pagos Seguros</p>
              <p className="text-xs text-slate-500">PSE • Tarjeta Débito/Crédito • Nequi</p>
            </div>
          </div>

          {/* Profesionales */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#083946] ring-1 ring-slate-200/80">
              <HeartHandshake className="h-6 w-6 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-base font-bold text-[#083946]">Atención Humana</p>
              <p className="text-xs text-slate-500">Médicos dedicados y con vocación</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}