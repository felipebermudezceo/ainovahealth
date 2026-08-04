import { HeroContent } from "../hero/HeroContent";
import { HeroImage } from "../hero/HeroImage";

export function Hero() {
  return (
    <section className="pt-[105px] lg:pt-[125px]">
      <div className="mx-auto max-w-[1320px] px-4">

        <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-[#083946] via-[#0C5663] to-[#17816F]">

          <div className="grid lg:grid-cols-2">

            <HeroContent />

            <HeroImage />

          </div>

        </div>

      </div>
    </section>
  );
}