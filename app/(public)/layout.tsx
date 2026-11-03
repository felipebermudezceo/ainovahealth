import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
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
      {/* Contenedor Oficial Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-5MKF9RB8" />

      {/* Google Tag Oficial para Google Ads (AW-8451928504) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-8451928504"
        strategy="afterInteractive"
      />
      <Script id="google-ads-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'AW-8451928504', {
            send_page_view: true
          });
        `}
      </Script>

      {/* Escuchador Global de Conversiones Automáticas para WhatsApp y Teléfono */}
      <Script id="auto-conversion-listener" strategy="afterInteractive">
        {`
          (function() {
            if (typeof window === 'undefined') return;
            document.addEventListener('click', function(e) {
              try {
                var target = e.target.closest('a');
                if (!target) return;
                var href = target.getAttribute('href') || '';
                
                // Conversión WhatsApp
                if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
                  if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-8451928504',
                      'value': 140000.0,
                      'currency': 'COP'
                    });
                    window.gtag('event', 'generate_lead', {
                      'event_category': 'lead',
                      'event_label': 'whatsapp_click',
                      'value': 140000.0,
                      'currency': 'COP'
                    });
                  }
                  if (Array.isArray(window.dataLayer)) {
                    window.dataLayer.push({
                      'event': 'whatsapp_conversion',
                      'event_category': 'lead',
                      'lead_type': 'whatsapp',
                      'value': 140000,
                      'currency': 'COP'
                    });
                  }
                }
                
                // Conversión Llamada Telefónica
                if (href.indexOf('tel:') !== -1) {
                  if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-8451928504',
                      'value': 140000.0,
                      'currency': 'COP'
                    });
                    window.gtag('event', 'generate_lead', {
                      'event_category': 'lead',
                      'event_label': 'phone_call',
                      'value': 140000.0,
                      'currency': 'COP'
                    });
                  }
                  if (Array.isArray(window.dataLayer)) {
                    window.dataLayer.push({
                      'event': 'call_conversion',
                      'event_category': 'lead',
                      'lead_type': 'call',
                      'value': 140000,
                      'currency': 'COP'
                    });
                  }
                }
              } catch (err) {
                console.error('Error tracking conversion:', err);
              }
            }, true);
          })();
        `}
      </Script>

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
