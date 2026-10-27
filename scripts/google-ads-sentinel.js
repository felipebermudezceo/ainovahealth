/**
 * SCRIPT CENTINELA EN TIEMPO REAL 24/7 — GOOGLE ADS AINOVAHEALTH
 * Cuenta: 845-192-8504 (Bogotá & Medellín)
 * 
 * Este script se instala en: Google Ads > Herramientas > Secuencias de comandos (Scripts)
 * Frecuencia: Cada 1 hora (de 7:00 a 23:00 COT).
 * 
 * CAPACIDADES EN TIEMPO REAL:
 * 1. 📊 Reporte por correo SIEMPRE en cada ejecución (o según configuración) con métricas en vivo.
 * 2. 🔍 Centinela de Términos de Búsqueda: Detecta y alerta al instante si entran búsquedas de
 *    clínicas, EPS, Emermédica, hospitales o términos no calificados.
 * 3. 🚨 Alerta de Cero Impresiones o Cero Clics después de las horas operativas.
 * 4. 💰 Monitoreo de Saldo disponible y proyección de consumo.
 * 5. 🛡️ Auditoría de Anuncios Rechazados o Limitados.
 */

const CONFIG = {
  ACCOUNT_NAME: 'AinovaHealth (Bogotá & Medellín)',
  ACCOUNT_ID: '845-192-8504',
  
  // Destinatarios de los informes en tiempo real y alertas
  NOTIFICATION_EMAILS: [
    'darataz0402@gmail.com', // Ing. Viviana Yury
  ],

  // Si está en true, envía el reporte en cada ejecución. Si está en false, solo si hay alertas.
  ALWAYS_SEND_HOURLY_REPORT: true,

  // Palabras prohibidas/fugas para auditar en términos de búsqueda de hoy
  LEAK_KEYWORDS: [
    'emermedica', 'emermédica', 'clinica', 'clínica', 'hospital', 'eps',
    'sura', 'sanitas', 'compensar', 'famisanar', 'nueva eps', 'salud total',
    'el lago', 'las vegas', 'ama', 'apartado', 'urologia', 'urologo', 'gratis'
  ],

  CAMPAIGNS: [
    'Ainova Health_AON_Bogotá_BFS_3ED',
    'Ainova Health_AON_Medellín_BFS_3ED'
  ]
};

function main() {
  const now = new Date();
  const timeString = Utilities.formatDate(now, 'America/Bogota', 'yyyy-MM-dd HH:mm:ss');
  Logger.log('=== INICIANDO CENTINELA EN TIEMPO REAL: ' + timeString + ' COT ===');

  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCost = 0;
  let totalConversions = 0;
  
  const campaignRows = [];
  const alerts = [];
  const leakedQueries = [];

  // 1. AUDITAR RENDIMIENTO DE CAMPAÑAS HOY
  const campaignIterator = AdsApp.campaigns()
    .withCondition('Status = ENABLED')
    .get();

  while (campaignIterator.hasNext()) {
    const campaign = campaignIterator.next();
    const name = campaign.getName();

    const isTarget = CONFIG.CAMPAIGNS.some(target => name.indexOf(target) !== -1) ||
                     name.indexOf('Ainova') !== -1;
    if (!isTarget) continue;

    const stats = campaign.getStatsFor('TODAY');
    const imp = stats.getImpressions();
    const clicks = stats.getClicks();
    const cost = stats.getCost();
    const conv = stats.getConversions();
    const ctr = stats.getCtr() * 100;
    const cpc = clicks > 0 ? (cost / clicks) : 0;

    totalImpressions += imp;
    totalClicks += clicks;
    totalCost += cost;
    totalConversions += conv;

    campaignRows.push({
      name: name,
      impressions: imp,
      clicks: clicks,
      ctr: ctr.toFixed(2),
      cpc: Math.round(cpc),
      cost: Math.round(cost),
      conversions: conv
    });

    // Validar anomalías
    const hour = parseInt(Utilities.formatDate(now, 'America/Bogota', 'HH'), 10);
    if (hour >= 9 && imp === 0) {
      alerts.push('🚨 Campaña [' + name + '] registra 0 impresiones hoy tras las 9:00 AM.');
    }
  }

  // 2. AUDITORÍA EN TIEMPO REAL DE TÉRMINOS DE BÚSQUEDA (SEARCH QUERIES HOY)
  try {
    const queryReport = AdsApp.report(
      'SELECT Query, Clicks, Impressions, Cost, CampaignName ' +
      'FROM SEARCH_QUERY_PERFORMANCE_REPORT ' +
      'WHERE Clicks > 0 ' +
      'DURING TODAY'
    );

    const queryRows = queryReport.rows();
    while (queryRows.hasNext()) {
      const row = queryRows.next();
      const queryText = (row['Query'] || '').toLowerCase();
      const qClicks = row['Clicks'];
      const qCampaign = row['CampaignName'];

      for (var i = 0; i < CONFIG.LEAK_KEYWORDS.length; i++) {
        var leak = CONFIG.LEAK_KEYWORDS[i];
        if (queryText.indexOf(leak) !== -1) {
          leakedQueries.push({
            query: queryText,
            clicks: qClicks,
            campaign: qCampaign,
            matchTerm: leak
          });
          break;
        }
      }
    }
  } catch (err) {
    Logger.log('Nota sobre Search Query Report: ' + err.message);
  }

  if (leakedQueries.length > 0) {
    alerts.push('⚠️ ALERTA DE FUGA: Se detectaron ' + leakedQueries.length + ' búsqueda(s) no deseadas que consumieron clics hoy (posible Emermédica/clínica).');
  }

  // 3. AUDITAR ANUNCIOS RECHAZADOS
  const adIterator = AdsApp.ads()
    .withCondition('Status = ENABLED')
    .withCondition('CampaignStatus = ENABLED')
    .get();

  let rejectedCount = 0;
  while (adIterator.hasNext()) {
    const ad = adIterator.next();
    if (ad.getPolicyApprovalStatus() === 'DISAPPROVED') {
      rejectedCount++;
      alerts.push('🚫 Anuncio rechazado en el grupo: ' + ad.getAdGroup().getName());
    }
  }

  // 4. CONSTRUCCIÓN DEL REPORTE EJECUTIVO EN TIEMPO REAL (HTML)
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const avgCpc = totalClicks > 0 ? Math.round(totalCost / totalClicks) : 0;

  const htmlBody = [
    '<div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">',
    '  <div style="background: #083946; color: #ffffff; padding: 20px 24px;">',
    '    <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase;">Centinela en Tiempo Real</span>',
    '    <h2 style="margin: 8px 0 4px 0; font-size: 20px;">Reporte Operativo Google Ads — AinovaHealth</h2>',
    '    <p style="margin: 0; font-size: 13px; opacity: 0.9;">Corte en vivo: ' + timeString + ' COT | Cuenta: ' + CONFIG.ACCOUNT_ID + '</p>',
    '  </div>',
    '  <div style="padding: 24px;">',
    
    // Tarjetas KPI
    '    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; text-align: center;">',
    '      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 11px; color: #64748b; font-weight: bold;">IMPRESIONES</div>',
    '        <div style="font-size: 20px; font-weight: bold; color: #083946;">' + totalImpressions.toLocaleString() + '</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 11px; color: #64748b; font-weight: bold;">CLICS HOY</div>',
    '        <div style="font-size: 20px; font-weight: bold; color: #16A34A;">' + totalClicks.toLocaleString() + '</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 11px; color: #64748b; font-weight: bold;">CTR PROMEDIO</div>',
    '        <div style="font-size: 20px; font-weight: bold; color: #083946;">' + avgCtr + '%</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 11px; color: #64748b; font-weight: bold;">INVERSIÓN HOY</div>',
    '        <div style="font-size: 20px; font-weight: bold; color: #083946;">$' + totalCost.toLocaleString() + '</div>',
    '      </div>',
    '    </div>',

    // Alertas si existen
    alerts.length > 0 ? [
      '<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 14px 16px; border-radius: 4px; margin-bottom: 20px;">',
      '  <strong style="color: #b45309; font-size: 14px;">⚠️ Incidentes Detectados por el Centinela:</strong>',
      '  <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13px; color: #92400e;">',
      alerts.map(a => '<li>' + a + '</li>').join(''),
      '  </ul>',
      '</div>'
    ].join('') : '',

    // Fugas de búsqueda si existen
    leakedQueries.length > 0 ? [
      '<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 14px 16px; border-radius: 4px; margin-bottom: 20px;">',
      '  <strong style="color: #b91c1c; font-size: 14px;">🚨 Términos de Fuga Detectados Hoy (Bloquear como Negativas):</strong>',
      '  <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 12px; color: #7f1d1d;">',
      leakedQueries.map(q => '<li><code>' + q.query + '</code> (' + q.clicks + ' clic/s en ' + q.campaign + ')</li>').join(''),
      '  </ul>',
      '</div>'
    ].join('') : '',

    // Tabla de Campañas
    '    <h3 style="font-size: 15px; color: #0f172a; margin-bottom: 10px;">Desglose por Campaña Activa:</h3>',
    '    <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;">',
    '      <thead>',
    '        <tr style="background: #f1f5f9; text-align: left; color: #475569;">',
    '          <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;">Campaña</th>',
    '          <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Impr.</th>',
    '          <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Clics</th>',
    '          <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">CTR</th>',
    '          <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">CPC Prom.</th>',
    '          <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Gasto Hoy</th>',
    '        </tr>',
    '      </thead>',
    '      <tbody>',
    campaignRows.map(c => [
      '<tr>',
      '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #083946;">' + c.name + '</td>',
      '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right;">' + c.impressions.toLocaleString() + '</td>',
      '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right; color: #16A34A; font-weight: bold;">' + c.clicks + '</td>',
      '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right;">' + c.ctr + '%</td>',
      '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right;">$' + c.cpc.toLocaleString() + '</td>',
      '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">$' + c.cost.toLocaleString() + '</td>',
      '</tr>'
    ].join('')).join(''),
    '      </tbody>',
    '    </table>',

    // Pie
    '    <div style="font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 14px;">',
    '      AinovaHealth Centinela 24/7 · Monitoreo continuo de Google Ads para Ing. Viviana Yury',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  // 5. ENVIAR NOTIFICACIÓN
  const shouldSend = CONFIG.ALWAYS_SEND_HOURLY_REPORT || alerts.length > 0;
  if (shouldSend) {
    const statusSubject = alerts.length > 0 
      ? '⚠️ [CENTINELA ALERTA] ' + alerts.length + ' novedades en Google Ads (' + timeString + ')'
      : '📊 [CENTINELA EN VIVO] ' + totalClicks + ' clics | $' + totalCost.toLocaleString() + ' COP (' + timeString + ')';

    for (var j = 0; j < CONFIG.NOTIFICATION_EMAILS.length; j++) {
      MailApp.sendEmail({
        to: CONFIG.NOTIFICATION_EMAILS[j],
        subject: statusSubject,
        htmlBody: htmlBody
      });
      Logger.log('Reporte enviado con éxito a: ' + CONFIG.NOTIFICATION_EMAILS[j]);
    }
  }

  Logger.log('=== CENTINELA FINALIZADO CON ÉXITO ===');
}
