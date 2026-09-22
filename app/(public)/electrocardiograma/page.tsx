import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ElectrocardiogramaHero } from "@/components/electrocardiograma/ElectrocardiogramaHero";
import { ElectrocardiogramaBenefits } from "@/components/electrocardiograma/ElectrocardiogramaBenefits";
import { HowToBook } from "@/components/shared/HowToBook";
import { FloatingWhatsapp } from "@/components/ui/FloatingWhatsapp";

export default function ElectrocardiogramaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <ElectrocardiogramaHero />

      <ElectrocardiogramaBenefits />

      <HowToBook />

      <Footer />

      <FloatingWhatsapp />
    </main>
  );
}
