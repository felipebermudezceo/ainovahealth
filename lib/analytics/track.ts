"use client";

export interface TrackLeadParams {
  type: "whatsapp" | "call";
  location: string;
  city?: string;
  service?: string;
  destination?: string;
}

/**
 * Registra eventos de conversión (WhatsApp y Llamadas) directamente en:
 * 1. Google Ads Conversion Tag (AW-8451928504)
 * 2. Google Tag Manager (dataLayer)
 * 3. GA4 y Google Analytics (generate_lead, contact, whatsapp_click)
 */
export function trackLeadClick({
  type,
  location,
  city = "bogota_medellin",
  service = "medicina_domiciliaria",
  destination = "+573007239175",
}: TrackLeadParams) {
  if (typeof window === "undefined") return;

  const eventName = type === "whatsapp" ? "whatsapp_click" : "call_click";
  const pagePath = window.location.pathname;

  const payload: Record<string, unknown> = {
    event: eventName,
    lead_type: type,
    lead_location: location,
    city,
    service,
    destination,
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
  win.dataLayer.push(payload);
  win.dataLayer.push({
    event: "conversion",
    send_to: "AW-8451928504",
    value: 140000,
    currency: "COP",
  });

  if (typeof win.gtag === "function") {
    // 1. Google Ads Conversion directa
    win.gtag("event", "conversion", {
      send_to: "AW-8451928504",
      value: 140000,
      currency: "COP",
    });

    // 2. Evento estandar GA4 / Google Ads Lead
    win.gtag("event", "generate_lead", {
      event_category: "lead",
      event_label: `${location}_${city}_${service}`,
      lead_type: type,
      value: 140000,
      currency: "COP",
    });

    // 3. Evento de contacto
    win.gtag("event", "contact", {
      event_category: "lead",
      event_label: `${location}_${city}_${service}`,
      method: type,
    });

    // 4. Evento especifico
    win.gtag("event", eventName, {
      event_category: "lead",
      event_label: `${location}_${city}_${service}`,
      lead_type: type,
      value: 140000,
      currency: "COP",
    });
  }
}
