"use client";

export interface TrackLeadParams {
  type: "whatsapp" | "call";
  location: string;
  city?: string;
  service?: string;
  destination?: string;
}

/**
 * Registra eventos de conversión (WhatsApp y Llamadas) en Google Tag Manager (dataLayer)
 * y Google Ads / GA4 (gtag) para alimentar el algoritmo de pujas de Google Ads.
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

  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push(payload);
  } else {
    win.dataLayer = [payload];
  }

  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, {
      event_category: "lead",
      event_label: `${location}_${city}_${service}`,
      lead_type: type,
      value: 140000,
      currency: "COP",
    });
  }
}

