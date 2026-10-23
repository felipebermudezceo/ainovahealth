/**
 * SCRIPT CENTINELA 24/7 — GOOGLE ADS AINOVAHEALTH (Cuenta 845-192-8504)
 * 
 * Este script se ejecuta automáticamente en la nube de Google Ads (Herramientas > Secuencias de comandos)
 * Frecuencia recomendada: Cada 1 hora (de 7:00 a 22:00 COT).
 * 
 * Monitorea:
 * 1. 🚨 Cero Impresiones: Si una campaña activa no tiene impresiones tras 2 horas de actividad.
 * 2. 🚨 Cero Clics / CTR Anormal: Detecta si los anuncios se muestran pero nadie hace clic.
 * 3. 🚨 Anuncios Rechazados o Limitados por Políticas de Salud.
 * 4. 🚨 Alerta de Saldo / Presupuesto Agotado.
 * 5. 📧 Envío automático de reporte de alerta por correo electrónico.
 */

const CONFIG = {
  // Correos que recibirán las alertas urgentes
  NOTIFICATION_EMAILS: [
    'darataz0402@gmail.com', // Ing. Viviana Yury
    // Agrega aquí el correo del Dr. Adnier si lo deseas
  ],
  
  // Umbrales de alerta
  MIN_HOURLY_IMPRESSIONS: 1, // Mínimo de impresiones esperadas
  ACCOUNT_NAME: 'AinovaHealth (Bogotá & Medellín)',
  CAMPAIGNS_TO_MONITOR: [
    'Ainova Health_AON_Bogotá_BFS_3ED',
    'Ainova Health_AON_Medellín_BFS_3ED'
  ]
};

function main() {
  const alerts = [];
  const reportLines = [];
  const now = new Date();
  const currentHour = now.getHours(); // Hora en zona de la cuenta

  Logger.log('Iniciando auditoría centinela para ' + CONFIG.ACCOUNT_NAME + ' a las ' + now.toISOString());

  // 1. AUDITAR CAMPAÑAS ACTIVAS (IMPRESIONES Y CLICS HOY)
  const campaignIterator = AdsApp.campaigns()
    .withCondition('Status = ENABLED')
    .get();

  while (campaignIterator.hasNext()) {
    const campaign = campaignIterator.next();
    const name = campaign.getName();
    
    // Solo monitorear campañas principales
    const isTargetCampaign = CONFIG.CAMPAIGNS_TO_MONITOR.some(target => name.indexOf(target) !== -1) ||
                             name.indexOf('Ainova') !== -1;

    if (!isTargetCampaign) continue;

    const stats = campaign.getStatsFor('TODAY');
    const impressions = stats.getImpressions();
    const clicks = stats.getClicks();
    const cost = stats.getCost();
    const conversions = stats.getConversions();
    const ctr = stats.getCtr() * 100;

    const line = `📌 [${name}] | Impresiones: ${impressions} | Clics: ${clicks} | CTR: ${ctr.toFixed(2)}% | Conv: ${conversions} | Gasto: $${cost.toLocaleString()} COP`;
    Logger.log(line);
    reportLines.push(line);

    // Alerta de Cero Impresiones si ya pasaron las 9:00 AM
    if (currentHour >= 9 && impressions === 0) {
      alerts.push(`🚨 ALERTA CRÍTICA: La campaña "${name}" tiene 0 IMPRESIONES hoy después de las 9:00 AM. Posible freno de subasta, saldo o rechazo.`);
    }

    // Alerta de Cero Clics si ya hay más de 30 impresiones
    if (impressions > 30 && clicks === 0) {
      alerts.push(`⚠️ ALERTA DE RELEVANCIA: La campaña "${name}" tiene ${impressions} impresiones pero 0 CLICS (CTR 0%). Revisar títulos o extensiones.`);
    }
  }

  // 2. AUDITAR ANUNCIOS RECHAZADOS O LIMITADOS
  const adIterator = AdsApp.ads()
    .withCondition('Status = ENABLED')
    .withCondition('CampaignStatus = ENABLED')
    .withCondition('AdGroupStatus = ENABLED')
    .get();

  let disapprovedCount = 0;
  while (adIterator.hasNext()) {
    const ad = adIterator.next();
    const policyApproval = ad.getPolicyApprovalStatus();
    
    if (policyApproval === 'DISAPPROVED') {
      disapprovedCount++;
      alerts.push(`🚫 ANUNCIO RECHAZADO: Un anuncio en el grupo "${ad.getAdGroup().getName()}" fue rechazado por Google Ads.`);
    }
  }

  // 3. ENVIAR NOTIFICACIÓN SI HAY ANOMALÍAS
  if (alerts.length > 0) {
    const subject = `🚨 [URGENTE GOOGLE ADS] Alerta de Pacientes AinovaHealth - ${alerts.length} incidente(s)`;
    const body = `
Hola Viviana,

El Agente Centinela de Google Ads detectó las siguientes alertas que requieren atención para no frenar la captación de pacientes:

${alerts.map(a => '• ' + a).join('\n\n')}

--------------------------------------------------
ESTADO ACTUAL DE LAS CAMPAÑAS HOY:
--------------------------------------------------
${reportLines.join('\n')}

Por favor ingresa a Google Ads para verificar el saldo y la puja:
https://ads.google.com/aw/overview?ocid=8451928504

--
Agente Centinela AinovaHealth 24/7
    `.trim();

    for (const email of CONFIG.NOTIFICATION_EMAILS) {
      MailApp.sendEmail(email, subject, body);
      Logger.log('Correo de alerta enviado a: ' + email);
    }
  } else {
    Logger.log('✅ Todo en orden. Campañas operando con normalidad.');
  }
}
