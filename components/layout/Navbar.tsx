"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

const menu = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#servicios" },
  { name: "¿Cómo Funciona?", href: "#como-funciona" },
  { name: "Particular vs EPS", href: "#particular" },
  { name: "Preguntas", href: "#preguntas-frecuentes" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Header Fijo Permanente en el Top con Detección Dinámica de Scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-200 ${
          scrolled
            ? "border-b border-slate-200/90 shadow-sm py-2"
            : "border-b border-slate-200/60 py-3"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logoAinovaHealth.png"
              alt="AinovaHealth Médico Particular a Domicilio"
              width={200}
              height={50}
              priority
              className="h-[38px] w-auto sm:h-[44px]"
            />
          </Link>

          {/* Menú Desktop Limpio y sin Colisiones */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {menu.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-slate-700 transition hover:text-[#16A34A]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Acciones de Contacto Inmediato */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="tel:+573007239175"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs font-semibold text-[#083946] transition hover:bg-slate-100"
            >
              <Phone className="h-3.5 w-3.5 text-[#16A34A]" />
              <span>300 723 9175</span>
            </a>

            <a
              href="https://wa.me/573007239175?text=Hola%20AinovaHealth%2C%20requiero%20solicitar%20un%20m%C3%A9dico%20particular%20a%20domicilio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#15803D] hover:shadow-sm"
            >
              <FaWhatsapp className="text-base" />
              <span>Pedir Médico Particular</span>
            </a>
          </div>

          {/* Menú Móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+573007239175"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-[#083946]"
              aria-label="Llamar directamente al médico"
            >
              <Phone className="h-4 w-4 text-[#16A34A]" />
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desplegable Móvil */}
        {open && (
          <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-emerald-50 hover:text-[#16A34A]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <a
                href="https://wa.me/573007239175?text=Hola%20AinovaHealth%2C%20requiero%20solicitar%20un%20m%C3%A9dico%20particular%20a%20domicilio."
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#16A34A] py-2.5 text-xs font-semibold text-white shadow-xs"
              >
                <FaWhatsapp className="text-base" />
                <span>Pedir Médico por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Espaciador para evitar que el navbar fijo tape el contenido superior */}
      <div className="h-[62px] sm:h-[68px]" />
    </>
  );
}
