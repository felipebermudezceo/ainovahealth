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
  title: "AinovaHealth | Atención Médica a Domicilio",
  description:
    "Atención médica profesional a domicilio en Bogotá y municipios cercanos.",
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
