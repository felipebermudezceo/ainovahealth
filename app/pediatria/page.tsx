import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PediatricsHero } from "@/components/pediatrics/PediatricsHero";
import { PediatricsBenefits } from "@/components/pediatrics/PediatricsBenefits";
import { HowToBook } from "@/components/shared/HowToBook";
import { FloatingWhatsapp } from "@/components/ui/FloatingWhatsapp";

export default function PediatriaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PediatricsHero />

      <PediatricsBenefits />

      <HowToBook />

      <Footer />

      <FloatingWhatsapp />
    </main>
  );
}
