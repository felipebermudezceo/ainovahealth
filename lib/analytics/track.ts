"use client";

export interface TrackLeadParams {
  type: "whatsapp" | "call";
  location: string;
  city?: string;
  service?: string;
  destination?: string;
}

/**
 * Registra eventos de conversión (WhatsApp y Llamadas) en Google Tag Manager (GTM-5MKF9RB8)
 * y Google Analytics 4 / Google Tag (G-2S250ZE0EG / GT-TQR2BF2W) para activar los objetivos
 * de Google Ads:
 * - Contacto (2 acciones principales: qualify_lead y close_convert_lead / contact)
 * - Clic saliente (1 acción principal: whatsapp_click / click)
 * - Leads obtenidos por mensajes y Cliente potencial de llamada telefónica
 */
export function trackLeadClick({
  type,
  location,
  city = "bogota_medellin",
  service = "medicina_domiciliaria",
  destination = "+573007239175",
}: TrackLeadParams) {
  if (typeof window === "undefined") return;

  const primaryEvent = type === "whatsapp" ? "whatsapp_click" : "call_click";
  const pagePath = window.location.pathname;
  const outboundUrl =
    type === "whatsapp"
      ? `https://wa.me/${destination.replace(/\D/g, "")}`
      : `tel:${destination}`;

  const baseParams: Record<string, unknown> = {
    lead_type: type,
    lead_location: location,
    city,
    service,
    destination,
    link_url: outboundUrl,
    outbound: true,
    page_path: pagePath,
    value: 140000,
    currency: "COP",
  };

  const win = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  if (!Array.isArray(win.dataLayer)) {
    win.dataLayer = [];
  }

  // Eventos configurados como conversiones clave en G-2S250ZE0EG / Google Ads
  const conversionEvents = [
    primaryEvent,
    "qualify_lead",
    "close_convert_lead",
    "contact",
  ];

  for (const evt of conversionEvents) {
    win.dataLayer.push({
      event: evt,
      ...baseParams,
    });
  }

  if (typeof win.gtag === "function") {
    for (const evt of conversionEvents) {
      win.gtag("event", evt, {
        event_category: "lead",
        event_label: `${location}_${city}_${service}`,
        ...baseParams,
      });
    }

    // Evento de clic saliente estándar de Google Tag (Categoría: Clic saliente)
    win.gtag("event", "click", {
      event_category: "outbound",
      event_label: outboundUrl,
      transport_type: "beacon",
      ...baseParams,
    });
  }
}
