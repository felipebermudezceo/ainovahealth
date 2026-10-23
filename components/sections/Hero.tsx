import { HeroContent } from "../hero/HeroContent";
import { HeroImage } from "../hero/HeroImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
}