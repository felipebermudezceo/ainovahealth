import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Conditions } from "@/components/sections/Conditions";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CTA } from "@/components/sections/CTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { FooterInfo } from "@/components/sections/FooterInfo";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsapp } from "@/components/ui/FloatingWhatsapp";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <Hero />

      <Stats />

      <Conditions />

      <WhyChoose />

      <CTA />

      <Testimonials />

      <FooterInfo />

      <Footer />

      <FloatingWhatsapp />
    </main>
  );
}