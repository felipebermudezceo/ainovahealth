import type { Metadata } from "next";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://ainovahealth.com"),

  title:
    "Médico a Domicilio en Bogotá y Medellín 24/7 | AinovaHealth",

  description:
    "Servicio médico particular a domicilio en Bogotá y Medellín las 24 horas. Médicos dedicados y humanos en tu casa para medicina general, pediatría, lavado de oídos y procedimientos sin esperas de EPS ni suscripciones.",

  keywords: [
    "médico a domicilio particular",
    "médico a domicilio Bogotá",
    "médico a domicilio Medellín",
    "doctor a domicilio sin suscripción",
    "consulta médica particular en casa",
    "médico general a domicilio",
    "pediatra a domicilio",
    "lavado de oídos a domicilio",
    "electrocardiograma a domicilio",
    "laboratorios a domicilio",
    "AinovaHealth",
  ],

  alternates: {
    canonical: "https://ainovahealth.com",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "Médico a Domicilio en Bogotá y Medellín 24/7 | AinovaHealth",

    description:
      "Atención médica profesional en casa. Diagnóstico clínico completo, recetas oficiales y cuidados de salud sin desplazamientos.",

    url: "https://ainovahealth.com",
    siteName: "AinovaHealth",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AinovaHealth - Atención Médica Domiciliaria",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Médico a Domicilio en Bogotá y Medellín | AinovaHealth",
    description:
      "Atención médica profesional en casa 24/7. Agende por WhatsApp o llamada directa.",
    images: ["/og-image.png"],
  },
};

const medicalSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "AinovaHealth",
  legalName: "AinovaHealth Atención Médica Domiciliaria",
  description:
    "Servicio de atención médica a domicilio profesional en Bogotá, Medellín y Sabana de Bogotá.",
  url: "https://ainovahealth.com",
  telephone: "+573007239175",
  priceRange: "$$",
  currenciesAccepted: "COP",
  paymentAccepted: "Cash, Credit Card, Debit Card, PSE, Nequi",
  areaServed: [
    { "@type": "City", name: "Bogotá" },
    { "@type": "City", name: "Medellín" },
    { "@type": "City", name: "Chía" },
    { "@type": "City", name: "Cota" },
    { "@type": "City", name: "Envigado" },
  ],
  availableService: [
    {
      "@type": "MedicalProcedure",
      name: "Medicina General a Domicilio",
    },
    {
      "@type": "MedicalProcedure",
      name: "Pediatría a Domicilio",
    },
    {
      "@type": "MedicalProcedure",
      name: "Lavado de Oídos a Domicilio",
    },
    {
      "@type": "MedicalProcedure",
      name: "Electrocardiograma a Domicilio",
    },
    {
      "@type": "MedicalProcedure",
      name: "Laboratorio Clínico a Domicilio",
    },
  ],
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleTagManager gtmId="GTM-5MKF9RB8" />
      <GoogleAnalytics gaId="G-2S250ZE0EG" />

      {/* Marcado Schema.org Médico para SEO y SEM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
      />

      {/* Script Oficial de Clixtell */}
      <Script id="clixtell-tracking" strategy="afterInteractive">
        {`
            (function() {
              var script = document.createElement('script');
              var prefix = document.location.protocol;
              script.async = true;
              script.type = 'text/javascript';
              script.src = prefix + '//scripts.clixtell.com/track.js';
              document.head.appendChild(script);
            })();
          `}
      </Script>

      {children}
    </>
  );
}
