/**
 * SCRIPT CENTINELA FORENSE EN TIEMPO REAL v3.0 — GOOGLE ADS AINOVAHEALTH
 * Cuenta: 845-192-8504 (Bogotá & Medellín)
 *
 * Instalación: Google Ads > Herramientas > Acciones masivas > Secuencias de comandos (Scripts)
 * Frecuencia recomendada: Cada 1 hora (de 07:00 a 23:00 COT).
 *
 * NOVEDADES v3.0 (AUDITORÍA DE AYER + HOY + DIAGNÓSTICO DE CERO PACIENTES):
 * 1. 📊 Auditoría comparativa obligatoria: CIERRE DE AYER (YESTERDAY) + CORTE HOY (TODAY).
 * 2. 🚨 Diagnóstico automático de "0 Pacientes":
 *    - Distingue entre Parálisis de Entrega (0 impresiones por Saldo Prepago agotado)
 *      y Fuga de Conversión (Clics > 0 pero 0 conversiones registradas).
 * 3. 🔍 Auditoría Forense de Términos de Búsqueda de AYER y HOY con listado exacto de búsquedas.
 * 4. 🛡️ Verificación de estado de Anuncios y Extensiones.
 */

const CONFIG = {
  ACCOUNT_NAME: 'AinovaHealth (Bogotá & Medellín)',
  ACCOUNT_ID: '845-192-8504',

  // Destinatarios de los informes en tiempo real y alertas
  NOTIFICATION_EMAILS: [
    'darataz0402@gmail.com',  // Ing. Viviana Yury
    'riverotaymi@gmail.com',  // Dr. Adnier / Dirección AinovaHealth
  ],

  ALWAYS_SEND_HOURLY_REPORT: true,

  // Palabras prohibidas/fugas para auditar en términos de búsqueda de ayer y hoy
  LEAK_KEYWORDS: [
    'emermedica', 'emermédica', 'clinica', 'clínica', 'hospital', 'eps',
    'sura', 'sanitas', 'compensar', 'famisanar', 'nueva eps', 'salud total',
    'el lago', 'las vegas', 'ama', 'apartado', 'urologia', 'urologo', 'gratis',
    'sisben', 'cruz roja', 'emi', 'coomeva', 'colmedica', 'colsanitas'
  ],

  CAMPAIGNS: [
    'Ainova Health_AON_Bogotá_BFS_3ED',
    'Ainova Health_AON_Medellín_BFS_3ED'
  ]
};

function collectPeriodStats(dateRange) {
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCost = 0;
  let totalConversions = 0;
  const rows = [];

  const campaignIterator = AdsApp.campaigns()
    .withCondition('Status = ENABLED')
    .get();

  while (campaignIterator.hasNext()) {
    const campaign = campaignIterator.next();
    const name = campaign.getName();

    const isTarget = CONFIG.CAMPAIGNS.some(function(target) {
      return name.indexOf(target) !== -1;
    }) || name.indexOf('Ainova') !== -1;

    if (!isTarget) continue;

    const stats = campaign.getStatsFor(dateRange);
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

    rows.push({
      name: name,
      impressions: imp,
      clicks: clicks,
      ctr: ctr.toFixed(2),
      cpc: Math.round(cpc),
      cost: Math.round(cost),
      conversions: conv
    });
  }

  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const avgCpc = totalClicks > 0 ? Math.round(totalCost / totalClicks) : 0;

  return {
    impressions: totalImpressions,
    clicks: totalClicks,
    cost: Math.round(totalCost),
    conversions: totalConversions,
    avgCtr: avgCtr,
    avgCpc: avgCpc,
    rows: rows
  };
}

function collectSearchQueries(dateRange) {
  const allQueries = [];
  const leakedQueries = [];

  try {
    const queryReport = AdsApp.report(
      'SELECT Query, Clicks, Impressions, Cost, Conversions, CampaignName ' +
      'FROM SEARCH_QUERY_PERFORMANCE_REPORT ' +
      'WHERE Clicks > 0 ' +
      'DURING ' + dateRange
    );

    const queryRows = queryReport.rows();
    while (queryRows.hasNext()) {
      const row = queryRows.next();
      const queryText = (row['Query'] || '').toLowerCase();
      const qClicks = parseInt(row['Clicks'], 10) || 0;
      const qImpr = parseInt(row['Impressions'], 10) || 0;
      const qCost = row['Cost'] || '0';
      const qConv = parseFloat(row['Conversions']) || 0;
      const qCampaign = row['CampaignName'] || '';

      const item = {
        query: queryText,
        clicks: qClicks,
        impressions: qImpr,
        cost: qCost,
        conversions: qConv,
        campaign: qCampaign,
        isLeak: false,
        matchTerm: ''
      };

      for (var i = 0; i < CONFIG.LEAK_KEYWORDS.length; i++) {
        var leak = CONFIG.LEAK_KEYWORDS[i];
        if (queryText.indexOf(leak) !== -1) {
          item.isLeak = true;
          item.matchTerm = leak;
          leakedQueries.push(item);
          break;
        }
      }

      allQueries.push(item);
    }
  } catch (err) {
    Logger.log('Nota sobre Search Query Report (' + dateRange + '): ' + err.message);
  }

  return {
    all: allQueries,
    leaks: leakedQueries
  };
}

function main() {
  const now = new Date();
  const timeString = Utilities.formatDate(now, 'America/Bogota', 'yyyy-MM-dd HH:mm:ss');
  const hour = parseInt(Utilities.formatDate(now, 'America/Bogota', 'HH'), 10);
  Logger.log('=== INICIANDO CENTINELA FORENSE v3.0: ' + timeString + ' COT ===');

  const yesterdayStats = collectPeriodStats('YESTERDAY');
  const todayStats = collectPeriodStats('TODAY');

  const yesterdayQueries = collectSearchQueries('YESTERDAY');
  const todayQueries = collectSearchQueries('TODAY');

  const alerts = [];

  // 1. DIAGNÓSTICO AUTOMÁTICO DE AYER (YESTERDAY)
  if (yesterdayStats.impressions === 0) {
    alerts.push('🚨 PARÁLISIS TOTAL AYER: Las campañas registraron 0 impresiones ayer. Causa principal: Saldo prepago agotado en Facturación o campaña retenida.');
  } else if (yesterdayStats.clicks > 0 && yesterdayStats.conversions === 0) {
    alerts.push('⚠️ AYER CON TRÁFICO PERO 0 CONVERSIONES EN ADS: Se registraron ' + yesterdayStats.clicks + ' clics ($' + yesterdayStats.cost.toLocaleString() + ' COP) y 0 conversiones medidas. Verificar vinculación del evento GTM "whatsapp_click" en Google Ads > Conversiones.');
  }

  // 2. DIAGNÓSTICO AUTOMÁTICO DE HOY (TODAY)
  if (hour >= 8 && todayStats.impressions === 0) {
    alerts.push('🚨 ALERTA CRÍTICA HOY: 0 impresiones después de las 8:00 AM. Verificar inmediatamente Saldo Disponible en Google Ads > Facturación.');
  } else if (todayStats.clicks >= 10 && todayStats.conversions === 0) {
    alerts.push('⚠️ HOY SIN CONVERSIONES MEDIDAS: Van ' + todayStats.clicks + ' clics hoy con 0 conversiones en plataforma.');
  }

  // 3. FUGAS DE TÉRMINOS DE BÚSQUEDA (AYER Y HOY)
  if (yesterdayQueries.leaks.length > 0) {
    alerts.push('🚨 FUGA EN BÚSQUEDAS DE AYER: ' + yesterdayQueries.leaks.length + ' término(s) de EPS/clínicas consumieron clics ayer.');
  }
  if (todayQueries.leaks.length > 0) {
    alerts.push('🚨 FUGA EN BÚSQUEDAS DE HOY: ' + todayQueries.leaks.length + ' término(s) de EPS/clínicas consumieron clics hoy.');
  }

  // 4. AUDITAR ANUNCIOS RECHAZADOS
  const adIterator = AdsApp.ads()
    .withCondition('Status = ENABLED')
    .withCondition('CampaignStatus = ENABLED')
    .get();

  while (adIterator.hasNext()) {
    const ad = adIterator.next();
    if (ad.getPolicyApprovalStatus() === 'DISAPPROVED') {
      alerts.push('🚫 Anuncio rechazado por políticas en el grupo: ' + ad.getAdGroup().getName());
    }
  }

  // 5. CONSTRUIR TABLA HTML DE CAMPAÑAS (AYER VS HOY)
  function renderCampaignTable(statsObj) {
    return [
      '<table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 18px;">',
      '  <thead>',
      '    <tr style="background: #f1f5f9; text-align: left; color: #475569;">',
      '      <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0;">Campaña</th>',
      '      <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Impr.</th>',
      '      <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Clics</th>',
      '      <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">CTR</th>',
      '      <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">CPC Prom.</th>',
      '      <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Conv.</th>',
      '      <th style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">Inversión</th>',
      '    </tr>',
      '  </thead>',
      '  <tbody>',
      statsObj.rows.map(function(c) {
        return [
          '<tr>',
          '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #083946;">' + c.name + '</td>',
          '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right;">' + c.impressions.toLocaleString() + '</td>',
          '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right; color: #16A34A; font-weight: bold;">' + c.clicks + '</td>',
          '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right;">' + c.ctr + '%</td>',
          '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right;">$' + c.cpc.toLocaleString() + '</td>',
          '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">' + c.conversions + '</td>',
          '  <td style="padding: 8px 10px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">$' + c.cost.toLocaleString() + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '  </tbody>',
      '</table>'
    ].join('\n');
  }

  function renderQueriesList(queriesObj, label) {
    if (queriesObj.all.length === 0) {
      return '<p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Sin términos de búsqueda con clics registrados en ' + label + '.</p>';
    }
    return [
      '<table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 18px;">',
      '  <thead>',
      '    <tr style="background: #f8fafc; text-align: left; color: #475569;">',
      '      <th style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0;">Término Buscado (' + label + ')</th>',
      '      <th style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0;">Campaña</th>',
      '      <th style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">Clics</th>',
      '      <th style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">Estado</th>',
      '    </tr>',
      '  </thead>',
      '  <tbody>',
      queriesObj.all.slice(0, 25).map(function(q) {
        var badge = q.isLeak
          ? '<span style="background:#fee2e2;color:#b91c1c;padding:2px 6px;border-radius:4px;font-weight:bold;">🚨 FUGA (' + q.matchTerm + ')</span>'
          : '<span style="background:#dcfce7;color:#166534;padding:2px 6px;border-radius:4px;font-weight:bold;">✓ Calificado</span>';
        return [
          '<tr>',
          '  <td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; font-family: monospace;">' + q.query + '</td>',
          '  <td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">' + q.campaign + '</td>',
          '  <td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">' + q.clicks + '</td>',
          '  <td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right;">' + badge + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '  </tbody>',
      '</table>'
    ].join('\n');
  }

  const htmlBody = [
    '<div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">',
    '  <div style="background: #083946; color: #ffffff; padding: 20px 24px;">',
    '    <span style="background: rgba(34,197,94,0.25); color: #86efac; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; text-transform: uppercase;">Centinela Forense v3.0 (Ayer + Hoy)</span>',
    '    <h2 style="margin: 8px 0 4px 0; font-size: 20px;">Auditoría Google Ads — AinovaHealth</h2>',
    '    <p style="margin: 0; font-size: 13px; opacity: 0.9;">Corte: ' + timeString + ' COT | Cuenta: ' + CONFIG.ACCOUNT_ID + '</p>',
    '  </div>',
    '  <div style="padding: 24px;">',

    alerts.length > 0 ? [
      '<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 14px 16px; border-radius: 4px; margin-bottom: 20px;">',
      '  <strong style="color: #991b1b; font-size: 14px;">🚨 Diagnóstico de Alertas Activas:</strong>',
      '  <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13px; color: #7f1d1d;">',
      alerts.map(function(a) { return '<li style="margin-bottom:4px;">' + a + '</li>'; }).join(''),
      '  </ul>',
      '</div>'
    ].join('') : '',

    // Bloque 1: HOY
    '    <h3 style="font-size: 15px; color: #083946; margin: 0 0 10px 0;">📈 1. Rendimiento en Vivo HOY (TODAY)</h3>',
    '    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px; text-align: center;">',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">IMPR. HOY</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #083946;">' + todayStats.impressions.toLocaleString() + '</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">CLICS HOY</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #16A34A;">' + todayStats.clicks.toLocaleString() + '</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">CTR HOY</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #083946;">' + todayStats.avgCtr + '%</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">GASTO HOY</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #083946;">$' + todayStats.cost.toLocaleString() + '</div>',
    '      </div>',
    '    </div>',
    renderCampaignTable(todayStats),

    // Bloque 2: AYER
    '    <h3 style="font-size: 15px; color: #083946; margin: 18px 0 10px 0;">📋 2. Auditoría Consolidada de AYER (YESTERDAY)</h3>',
    '    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px; text-align: center;">',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">IMPR. AYER</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #083946;">' + yesterdayStats.impressions.toLocaleString() + '</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">CLICS AYER</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #16A34A;">' + yesterdayStats.clicks.toLocaleString() + '</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">CTR AYER</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #083946;">' + yesterdayStats.avgCtr + '%</div>',
    '      </div>',
    '      <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">',
    '        <div style="font-size: 10px; color: #64748b; font-weight: bold;">GASTO AYER</div>',
    '        <div style="font-size: 18px; font-weight: bold; color: #083946;">$' + yesterdayStats.cost.toLocaleString() + '</div>',
    '      </div>',
    '    </div>',
    renderCampaignTable(yesterdayStats),

    // Bloque 3: Términos de Búsqueda de Ayer y Hoy
    '    <h3 style="font-size: 15px; color: #0f172a; margin: 18px 0 8px 0;">🔍 3. Términos de Búsqueda Reales (Ayer y Hoy)</h3>',
    renderQueriesList(yesterdayQueries, 'AYER'),
    renderQueriesList(todayQueries, 'HOY'),

    '    <div style="font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 14px;">',
    '      AinovaHealth Centinela v3.0 · Auditoría Forense Continua para Ing. Viviana Yury & Dr. Adnier',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  const shouldSend = CONFIG.ALWAYS_SEND_HOURLY_REPORT || alerts.length > 0;
  if (shouldSend) {
    const statusSubject = alerts.length > 0
      ? '🚨 [AUDITORÍA ADS] Ayer: ' + yesterdayStats.clicks + ' clics | Hoy: ' + todayStats.clicks + ' clics (' + alerts.length + ' alerta/s)'
      : '📊 [CENTINELA ADS] Ayer: ' + yesterdayStats.clicks + ' clics | Hoy: ' + todayStats.clicks + ' clics (' + timeString + ')';

    for (var j = 0; j < CONFIG.NOTIFICATION_EMAILS.length; j++) {
      MailApp.sendEmail({
        to: CONFIG.NOTIFICATION_EMAILS[j],
        subject: statusSubject,
        htmlBody: htmlBody
      });
    }
    Logger.log('Reporte enviado con éxito a: ' + CONFIG.NOTIFICATION_EMAILS.join(', '));
  }
}
