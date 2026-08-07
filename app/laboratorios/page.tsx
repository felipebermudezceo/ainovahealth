import { Navbar } from "@/components/layout/Navbar";
import { LaboratoryHero } from "@/components/laboratory/LaboratoryHero";
import { LaboratoryBenefits } from "@/components/laboratory/LaboratoryBenefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { FooterInfo } from "@/components/sections/FooterInfo";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsapp } from "@/components/ui/FloatingWhatsapp";

export default function LaboratoriosPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <LaboratoryHero />

      <LaboratoryBenefits />

      <Testimonials />

      <FooterInfo />

      <Footer />

      <FloatingWhatsapp />
    </main>
  );
}
