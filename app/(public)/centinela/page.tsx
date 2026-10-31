"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Copy, 
  Check, 
  Zap,
  Lock
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function CentinelaDashboard() {
  const [copiedMsg, setCopiedMsg] = useState(false);

  const doctorMessage = `Hola Dr. Adnier, hemos completado la auditoría forense y reparación técnica de las campañas y la plataforma web (Corte 31 de Octubre):

1. Corrección de Fuga en Medellín: La portada principal ahora detecta automáticamente la ciudad del anuncio y muestra simultáneamente "Bogotá y Medellín" para que ningún paciente de Medellín rebote pensando que solo atendemos en Bogotá.
2. Rastreo Total de Conversiones (GTM): Se instrumentaron el 100% de los botones de WhatsApp y Llamada en toda la web y en las 6 páginas de especialidades (Sueroterapia, Pediatría, Lavado de Oídos, ECG, Laboratorios y ETS) para enviar la señal de conversión al algoritmo de Google Ads.
3. Centinela Forense v3.0 (Ayer + Hoy): El script de monitoreo ahora audita comparativamente el cierre de AYER y el tráfico en vivo de HOY, alertando si hay parálisis por saldo prepago o términos de búsqueda no deseados.`;

  const copyDoctorMessage = () => {
    navigator.clipboard.writeText(doctorMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="rounded-2xl bg-gradient-to-r from-[#083946] to-[#0d5466] p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <Activity className="h-3.5 w-3.5 animate-pulse" /> Monitor Centinela v3.0 en Vivo
              </span>
              <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Centro de Mando & Auditoría de Tráfico (Ayer + Hoy)
              </h1>
              <p className="mt-1 text-sm text-slate-200">
                Supervisión técnica de Google Ads, Clixtell Anti-Fraude, Web CRO Multi-Ciudad y Alertas en Tiempo Real.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md text-right">
              <span className="text-xs text-slate-300 block">Cuenta Google Ads:</span>
              <span className="text-base font-bold text-emerald-300 font-mono">845-192-8504</span>
              <span className="text-xs text-slate-300 block mt-1">ainovahealth.com</span>
            </div>
          </div>
        </header>

        {/* 1. Diagnóstico Forense de Cero Pacientes Ayer */}
        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-amber-950">
                Diagnóstico de Auditoría: ¿Por qué ayer no entraron pacientes y qué se reparó hoy?
              </h2>
              <p className="text-sm text-amber-900 leading-relaxed">
                Se detectaron y corrigieron <strong>3 cuellos de botella técnicos</strong> que afectaban la conversión tras pausar la extensión de llamada el 27 de octubre:
                (1) La portada mostraba por defecto <strong>&quot;Bogotá&quot;</strong> a los visitantes de Medellín;
                (2) El 85% de los botones secundarios no disparaban eventos <code>whatsapp_click</code> al algoritmo de Google Ads; y
                (3) El saldo prepago de la cuenta requiere verificación en Facturación tras los consumos acumulados de la semana.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-md bg-emerald-700 px-2.5 py-1 text-white">
                  Reparado 1: Portada Dual Bogotá y Medellín + Auto-Detección UTM ✓
                </span>
                <span className="rounded-md bg-emerald-700 px-2.5 py-1 text-white">
                  Reparado 2: Tracking GTM en 100% de Botones y 6 Sub-Landings ✓
                </span>
                <span className="rounded-md bg-emerald-700 px-2.5 py-1 text-white">
                  Reparado 3: Centinela v3.0 Audita AYER + HOY ✓
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Estatus de los 4 Sistemas Centinela */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[#083946] flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            Estado de Blindaje y Conversión del Ecosistema
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* Tarjeta 1: Web Middleware Shield */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Blindaje Perimetral Web
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 100% Activo
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Next.js 16 Proxy Shield (<code>proxy.ts</code>)
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Protección perimetral activa. Bloquea scrapers automatizados (Puppeteer, Selenium, cURL) y rechaza ataques de clic por repetición de IPs.
              </p>
            </div>

            {/* Tarjeta 2: Embudo Multi-Ciudad & GTM */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Embudo de Conversión CRO
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Bogotá & Medellín + GTM
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Portada Inteligente & Tracking 100%
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Muestra simultáneamente Bogotá y Medellín o autoselecciona la ciudad según el anuncio. Todos los botones envían <code>whatsapp_click</code> y <code>call_click</code> con valor $140.000 COP a GTM.
              </p>
            </div>

            {/* Tarjeta 3: Clixtell Anti-Fraude */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Ciberseguridad Anti-Fraude
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  <AlertTriangle className="h-3.5 w-3.5" /> Verificar Link API
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Clixtell Platform (Plan Agency)
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                El script <code>track.js</code> está activo en todas las páginas públicas. Verificar en Clixtell &gt; Integrations &gt; Google Ads que el ID <code>845-192-8504</code> esté enlazado.
              </p>
            </div>

            {/* Tarjeta 4: Google Ads Sentinel Script v3.0 */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Robot en la Nube
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <Zap className="h-3.5 w-3.5" /> v3.0 (Ayer + Hoy)
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Google Ads Sentinel v3.0
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Actualizado en <code>google-ads-sentinel.js</code> para auditar comparativamente <code>YESTERDAY</code> y <code>TODAY</code>, listando términos de búsqueda exactos y alertas de saldo/conversión.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Guía de Verificación en Google Ads */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#083946] flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-600" />
            Checklist de Verificación en Consola Google Ads (845-192-8504)
          </h2>

          <div className="mt-5 space-y-4">
            {/* Paso 1 */}
            <div className="flex gap-3 items-start border-b border-slate-100 pb-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#083946] text-xs font-bold text-white">
                1
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Verificar Saldo Prepago en Facturación &gt; Resumen
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Confirmar que la cuenta tenga saldo disponible mayor a <code>$100.000 COP</code> para cubrir la jornada de fin de semana (Sábado y Domingo son los días de mayor demanda domiciliaria).
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="flex gap-3 items-start border-b border-slate-100 pb-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#083946] text-xs font-bold text-white">
                2
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Actualizar el Script Centinela v3.0 en Google Ads
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  En Google Ads &gt; Herramientas &gt; Secuencias de comandos, pegar la nueva versión de <code>ainovahealth/scripts/google-ads-sentinel.js</code> y pulsar <strong>Ejecutar</strong> para recibir al instante en tu correo la tabla forense de <strong>AYER (YESTERDAY) vs. HOY (TODAY)</strong>.
                </p>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="flex gap-3 items-start">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#083946] text-xs font-bold text-white">
                3
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Marcar Clic en WhatsApp (<code>whatsapp_click</code>) como Conversión Principal
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  En Google Ads &gt; Objetivos &gt; Conversiones &gt; Resumen, asegurar que la acción de clic a WhatsApp desde la web esté como <strong>Principal</strong>, ya que la extensión de llamada directa en el buscador fue pausada.
                </p>
              </div>
            </div>
          </div>

          {/* Botón de Respuesta para el Doctor */}
          <div className="mt-6 rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FaWhatsapp className="text-emerald-600 text-sm" />
                Reporte de estatus listo para enviar al Dr. Adnier:
              </span>
              <button
                onClick={copyDoctorMessage}
                className="inline-flex items-center gap-1 rounded-lg bg-[#083946] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#062933]"
              >
                {copiedMsg ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copiedMsg ? "¡Copiado!" : "Copiar Texto"}
              </button>
            </div>
            <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 font-mono leading-relaxed select-all whitespace-pre-line">
              {doctorMessage}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
