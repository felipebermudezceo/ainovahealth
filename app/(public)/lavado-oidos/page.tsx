import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { EarWashHero } from "@/components/ear-wash/EarWashHero";
import { EarWashBenefits } from "@/components/ear-wash/EarWashBenefits";
import { HowToBook } from "@/components/shared/HowToBook";
import { FloatingWhatsapp } from "@/components/ui/FloatingWhatsapp";

export default function LavadoOidosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <EarWashHero />

      <EarWashBenefits />

      <HowToBook />

      <Footer />

      <FloatingWhatsapp />
    </main>
  );
}
