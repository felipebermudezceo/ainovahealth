import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ainovahealth.com"),

  title:
    "Médico a Domicilio en Bogotá | Atención Médica en Casa 24 Horas | AinovaHealth",

  description:
    "Solicita un médico a domicilio en Bogotá. Atención médica en casa, medicina general, pediatría, nebulizaciones, teleconsulta y atención médica 24 horas. Agenda tu consulta por WhatsApp.",

  keywords: [
    "médico a domicilio",
    "médico a domicilio Bogotá",
    "doctor a domicilio",
    "doctor a domicilio Bogotá",
    "consulta médica a domicilio",
    "servicio médico a domicilio",
    "atención médica en casa",
    "médico general",
    "pediatra a domicilio",
    "teleconsulta",
    "nebulizaciones a domicilio",
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
      "Médico a Domicilio en Bogotá | Atención Médica en Casa 24 Horas | AinovaHealth",

    description:
      "Solicita un médico a domicilio en Bogotá. Atención médica rápida y profesional en tu hogar.",

    url: "https://ainovahealth.com",

    siteName: "AinovaHealth",

    locale: "es_CO",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AinovaHealth",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Médico a Domicilio en Bogotá | Atención Médica en Casa 24 Horas | AinovaHealth",

    description:
      "Solicita un médico a domicilio en Bogotá. Agenda por WhatsApp.",

    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId="GTM-5MKF9RB8" />

      <body className="min-h-full flex flex-col">
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
      </body>
    </html>
  );
}