"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  PhoneCall, 
  Copy, 
  Check, 
  ExternalLink,
  RefreshCw,
  Zap,
  Lock
} from "lucide-react";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";

export default function CentinelaDashboard() {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const copyScriptText = () => {
    navigator.clipboard.writeText(`// Copia el contenido del archivo ainovahealth/scripts/google-ads-sentinel.js en Google Ads > Herramientas > Secuencias de comandos`);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const doctorMessage = `Hola doctor, ya quedó solucionada la causa raíz de las llamadas:
1. Bloqueamos Emermédica y prepagadas como términos negativos.
2. Pausamos el botón de llamada directa en Google para que no llamen pensando que es la clínica.
3. El botón de WhatsApp en la web quedó más grande y con animación de atención inmediata 24/7.
4. El sistema centinela en tiempo real quedó activado para auditar cada hora el tráfico y alertarnos de cualquier anomalía.`;

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
                <Activity className="h-3.5 w-3.5 animate-pulse" /> Monitor Centinela 24/7 en Vivo
              </span>
              <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Centro de Mando & Auditoría de Tráfico
              </h1>
              <p className="mt-1 text-sm text-slate-200">
                Supervisión técnica de Google Ads, Clixtell Anti-Fraude, Web CRO y Alertas en Tiempo Real.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md text-right">
              <span className="text-xs text-slate-300 block">Cuenta Google Ads:</span>
              <span className="text-base font-bold text-emerald-300 font-mono">845-192-8504</span>
              <span className="text-xs text-slate-300 block mt-1">ainovahealth.com</span>
            </div>
          </div>
        </header>

        {/* 1. Diagnóstico de Alerta Máxima: La Causa de las Llamadas de Emermédica */}
        <section className="mt-8 rounded-2xl border border-red-200 bg-red-50/80 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-red-900">
                Causa Raíz Diagnosticada: ¿Por qué entraron llamadas equivocadas de Emermédica?
              </h2>
              <p className="text-sm text-red-800 leading-relaxed">
                El usuario que buscó <strong>&quot;Emermédica teléfono&quot;</strong> en su celular vio el anuncio de Google Ads con el <strong>botón directo de llamada (Call Asset)</strong>. Al tocarlo, marcó directamente al 300 723 9175 <strong>sin ingresar a la página web</strong>, creyendo que era la central de urgencias de su prepagada. Por esa razón entraban llamadas y cero mensajes a WhatsApp.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-md bg-red-200/80 px-2.5 py-1 text-red-900">
                  Acción 1: Pausar Recurso de Llamada en Google Ads
                </span>
                <span className="rounded-md bg-red-200/80 px-2.5 py-1 text-red-900">
                  Acción 2: Agregar &quot;emermedica&quot; y &quot;clinica&quot; a Negativas
                </span>
                <span className="rounded-md bg-emerald-700 px-2.5 py-1 text-white">
                  Acción 3 Web: Botón WhatsApp Agrandado y Filtro Activado ✓
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Estatus de los 4 Sistemas Centinela */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[#083946] flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            Estado de Blindaje del Ecosistema
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
                Next.js Edge Middleware
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Archivo <code>middleware.ts</code> activo. Bloquea scrapers automatizados (Puppeteer, Selenium, cURL) y rechaza ataques por repetición de IPs.
              </p>
            </div>

            {/* Tarjeta 2: Botón WhatsApp Hero & Flotante */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Embudo de Conversión CRO
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Agrandado & Pulso
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                WhatsApp Médico 24/7
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Botón flotante con microanimación neón y aviso de servicio particular. El canal telefónico fue subordinado para evitar llamadas accidentales.
              </p>
            </div>

            {/* Tarjeta 3: Clixtell Anti-Fraude */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Ciberseguridad Anti-Fraude
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  <AlertTriangle className="h-3.5 w-3.5" /> Requiere Link de API
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Clixtell Platform (Plan Agency)
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                El script <code>track.js</code> está inyectado en el frontend. En el panel de Clixtell se debe hacer clic en <strong>Link New Account</strong> para enlazar el ID <code>845-192-8504</code> y habilitar el bloqueo automático de IPs vía API.
              </p>
            </div>

            {/* Tarjeta 4: Google Ads Sentinel Script */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Robot en la Nube
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <Zap className="h-3.5 w-3.5" /> Reportes en Vivo
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                Google Ads Sentinel v2.0
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Actualizado en <code>google-ads-sentinel.js</code> con envío obligatorio de correos cada hora con métricas reales y rastreo automático de términos de fuga.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Guía de Ejecución Rápida */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#083946] flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-600" />
            Acciones Clave para Viviana en las Plataformas
          </h2>

          <div className="mt-5 space-y-4">
            {/* Paso 1 */}
            <div className="flex gap-3 items-start border-b border-slate-100 pb-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#083946] text-xs font-bold text-white">
                1
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Pausar el Recurso de Llamada en Google Ads
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Google Ads &gt; Anuncios y recursos &gt; Recursos &gt; Filtra por Llamadas &gt; Pausar teléfono <code>3007239175</code>. Esto canaliza el 100% de los pacientes a la landing page y a WhatsApp.
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
                  Pegar el nuevo Script Centinela en Google Ads
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Google Ads &gt; Herramientas &gt; Secuencias de comandos &gt; Pega el código de <code>google-ads-sentinel.js</code> y programa la frecuencia cada 1 hora. Te enviará siempre un correo con las impresiones, clics y saldo real.
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
                  Completar la vinculación en Clixtell
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Ingresa a Clixtell &gt; Integrations &gt; Google Ads. Al lado de <code>ainovahealth.com</code> pulsa <strong>Link New Account</strong> e inicia sesión con el correo que tiene acceso al ID <code>845-192-8504</code> para que pase de ❌ a ✔.
                </p>
              </div>
            </div>
          </div>

          {/* Botón de Respuesta para el Doctor */}
          <div className="mt-6 rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FaWhatsapp className="text-emerald-600 text-sm" />
                Mensaje listo para reenviar a Dr. Adnier por WhatsApp:
              </span>
              <button
                onClick={copyDoctorMessage}
                className="inline-flex items-center gap-1 rounded-lg bg-[#083946] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#062933]"
              >
                {copiedMsg ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copiedMsg ? "¡Copiado!" : "Copiar Texto"}
              </button>
            </div>
            <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 font-mono leading-relaxed select-all">
              {doctorMessage}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
