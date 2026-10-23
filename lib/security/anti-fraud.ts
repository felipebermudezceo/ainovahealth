/**
 * AinovaHealth Anti-Fraud & Bot Shield
 * Protección perimetral para Next.js / Vercel Edge
 * Detecta y bloquea bots, raspado automatizado y clics repetitivos de competidores.
 */

interface IpRecord {
  count: number;
  firstSeen: number;
  lastSeen: number;
}

// Ventana de 60 segundos, máximo 35 peticiones por IP en páginas públicas
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 35;

// Almacén en memoria de peticiones recientes por IP
const ipHistory = new Map<string, IpRecord>();

// Limpieza periódica para evitar fugas de memoria
let lastCleanup = Date.now();
function cleanupOldRecords() {
  const now = Date.now();
  if (now - lastCleanup > 5 * 60 * 1000) {
    lastCleanup = now;
    for (const [ip, record] of ipHistory.entries()) {
      if (now - record.lastSeen > WINDOW_MS * 2) {
        ipHistory.delete(ip);
      }
    }
  }
}

// User-Agents sospechosos o de herramientas de automatización
const SUSPICIOUS_AGENTS = [
  /headlesschrome/i,
  /puppeteer/i,
  /selenium/i,
  /phantomjs/i,
  /python-requests/i,
  /python-urllib/i,
  /aiohttp/i,
  /scrapy/i,
  /curl/i,
  /wget/i,
  /httpclient/i,
  /go-http-client/i,
  /postman/i,
  /bytespider/i,
  /petalbot/i,
];

// Motores de búsqueda legítimos permitidos
const VERIFIED_CRAWLERS = [
  /googlebot/i,
  /bingbot/i,
  /google-inspectiontool/i,
  /mediapartners-google/i,
  /adsbot-google/i,
];

export interface ShieldResult {
  allowed: boolean;
  reason?: string;
  ip: string;
}

export function evaluateRequest(req: Request): ShieldResult {
  cleanupOldRecords();

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") ?? "127.0.0.1";
  const userAgent = req.headers.get("user-agent") ?? "";

  // 1. Permitir rastreadores oficiales de Google y Bing (para SEO y revisión de Ads)
  if (VERIFIED_CRAWLERS.some((bot) => bot.test(userAgent))) {
    return { allowed: true, ip };
  }

  // 2. Bloquear bots de automatización y scraping
  if (SUSPICIOUS_AGENTS.some((bot) => bot.test(userAgent))) {
    return {
      allowed: false,
      reason: "Suspicious User-Agent detected (Automated bot/scraper)",
      ip,
    };
  }

  // 3. Control de frecuencia y repetición por IP (Competitor click/traffic flood)
  const now = Date.now();
  const record = ipHistory.get(ip);

  if (!record) {
    ipHistory.set(ip, { count: 1, firstSeen: now, lastSeen: now });
    return { allowed: true, ip };
  }

  // Si está dentro de la misma ventana de tiempo
  if (now - record.firstSeen < WINDOW_MS) {
    record.count += 1;
    record.lastSeen = now;

    if (record.count > MAX_REQUESTS_PER_WINDOW) {
      return {
        allowed: false,
        reason: `Rate limit exceeded (${record.count} requests in 60s). Possible click flood.`,
        ip,
      };
    }
  } else {
    // Reiniciar ventana
    record.count = 1;
    record.firstSeen = now;
    record.lastSeen = now;
  }

  return { allowed: true, ip };
}
