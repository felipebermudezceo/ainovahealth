export type ClinicalPdfMedication = {
  name: string;
  dose: string;
  frequency: string;
  route: string;
  indication: string;
  notes: string;
};

export type ClinicalPdfInput = {
  fullName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  sex: string;
  phone: string;
  email: string;
  patientAddress: string;
  city: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  date: string;
  time: string;
  professional: string;
  attentionType: string;
  modality: string;
  attentionAddress: string;
  reason: string;
  illnessOnset: string;
  illnessEvolution: string;
  associatedSymptoms: string;
  previousTreatments: string;
  illnessNotes: string;
  antPersonal: string;
  antSurgical: string;
  antHospital: string;
  antFamily: string;
  antPharmacological: string;
  antToxicological: string;
  antGyneco: string;
  antImmunization: string;
  currentMedsStatus: string;
  reportedMeds: ClinicalPdfMedication[];
  allergies: string;
  bp: string;
  hr: string;
  rr: string;
  temperature: string;
  spo2: string;
  weight: string;
  height: string;
  vitalsOther: string;
  physicalExam: string;
  findings: string;
  diagnosis: string;
  differentials: string;
  evaluationNotes: string;
  treatment: string;
  prescribedMeds: string;
  proceduresDone: string;
  recommendations: string;
  alarmSigns: string;
  followUp: string;
  referral: string;
  procedureNotes: string;
  closingProfessional: string;
  finishedAt: string;
  closingNotes: string;
  age: string;
  specialty: string;
  license: string;
  professionalEmail: string;
  patientId: string;
};

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 50;
const HEADER_H = 62;
const FOOTER_H = 44;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const TEAL: [number, number, number] = [0.039, 0.239, 0.286];
const GREEN: [number, number, number] = [0.153, 0.725, 0.427];
const SLATE: [number, number, number] = [0.42, 0.48, 0.55];
const INK: [number, number, number] = [0.08, 0.14, 0.18];
const LINE: [number, number, number] = [0.82, 0.86, 0.88];
const ALLERGY_BG: [number, number, number] = [1, 0.97, 0.94];
const ALLERGY_BD: [number, number, number] = [0.9, 0.62, 0.35];

const HELVETICA = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];

const HELVETICA_BOLD = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

const WINANSI: Record<string, number> = {
  "¡": 0xa1, "¢": 0xa2, "£": 0xa3, "¤": 0xa4, "¥": 0xa5, "§": 0xa7, "©": 0xa9,
  ª: 0xaa, "«": 0xab, "®": 0xae, "°": 0xb0, "±": 0xb1, "´": 0xb4, "µ": 0xb5,
  "¶": 0xb6, "·": 0xb7, "º": 0xba, "»": 0xbb, "¿": 0xbf, À: 0xc0, Á: 0xc1,
  Â: 0xc2, Ã: 0xc3, Ä: 0xc4, Å: 0xc5, Æ: 0xc6, Ç: 0xc7, È: 0xc8, É: 0xc9,
  Ê: 0xca, Ë: 0xcb, Ì: 0xcc, Í: 0xcd, Î: 0xce, Ï: 0xcf, Ñ: 0xd1, Ò: 0xd2,
  Ó: 0xd3, Ô: 0xd4, Õ: 0xd5, Ö: 0xd6, Ø: 0xd8, Ù: 0xd9, Ú: 0xda, Û: 0xdb,
  Ü: 0xdc, Ý: 0xdd, ß: 0xdf, à: 0xe0, á: 0xe1, â: 0xe2, ã: 0xe3, ä: 0xe4,
  å: 0xe5, æ: 0xe6, ç: 0xe7, è: 0xe8, é: 0xe9, ê: 0xea, ë: 0xeb, ì: 0xec,
  í: 0xed, î: 0xee, ï: 0xef, ñ: 0xf1, ò: 0xf2, ó: 0xf3, ô: 0xf4, õ: 0xf5,
  ö: 0xf6, ø: 0xf8, ù: 0xf9, ú: 0xfa, û: 0xfb, ü: 0xfc, ý: 0xfd, ÿ: 0xff,
  "–": 0x96, "—": 0x97, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95,
};

type LogoImage = { bytes: Uint8Array; width: number; height: number };

function toWinAnsi(ch: string): number {
  const code = ch.codePointAt(0) ?? 63;
  if (code >= 32 && code <= 126) return code;
  if (WINANSI[ch] !== undefined) return WINANSI[ch];
  return 63;
}

function pdfString(text: string): string {
  let out = "(";
  for (const ch of text) {
    const code = toWinAnsi(ch);
    if (code === 40 || code === 41 || code === 92) {
      out += `\\${String.fromCharCode(code)}`;
    } else if (code < 32 || code > 126) {
      out += `\\${code.toString(8).padStart(3, "0")}`;
    } else {
      out += String.fromCharCode(code);
    }
  }
  return `${out})`;
}

function charWidth(code: number, bold: boolean): number {
  if (code >= 32 && code <= 126) {
    return (bold ? HELVETICA_BOLD : HELVETICA)[code - 32] / 1000;
  }
  return 0.556;
}

function textWidth(text: string, size: number, bold = false): number {
  let width = 0;
  for (const ch of text) width += charWidth(toWinAnsi(ch), bold) * size;
  return width;
}

function wrapText(text: string, size: number, maxWidth: number, bold = false): string[] {
  const source = display(text);
  const paragraphs = source.split(/\n/);
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.trim() === "" ? [""] : paragraph.split(/\s+/);
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (textWidth(candidate, size, bold) <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      if (textWidth(word, size, bold) <= maxWidth) {
        line = word;
        continue;
      }
      let chunk = "";
      for (const ch of word) {
        const next = chunk + ch;
        if (chunk && textWidth(next, size, bold) > maxWidth) {
          lines.push(chunk);
          chunk = ch;
        } else {
          chunk = next;
        }
      }
      line = chunk;
    }
    lines.push(line);
  }

  return lines.length ? lines : [""];
}

function display(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : "—";
}

function rgb(color: [number, number, number]) {
  return `${color[0].toFixed(3)} ${color[1].toFixed(3)} ${color[2].toFixed(3)}`;
}

function strBytes(value: string) {
  const bytes = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i += 1) bytes[i] = value.charCodeAt(i) & 0xff;
  return bytes;
}

function concatBytes(parts: Uint8Array[]) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function formatDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return display(iso);
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${Number(match[3])} de ${months[Number(match[2]) - 1]} de ${match[1]}`;
}

function formatBirth(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return display(iso);
  return `${match[3]}/${match[2]}/${match[1]}`;
}

function formatDateTime(value: string) {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(value);
  if (!match) return display(value);
  return `${formatDate(match[1])}, ${match[2]}`;
}

async function loadLogo(): Promise<LogoImage | null> {
  if (typeof document === "undefined") return null;
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("logo"));
      img.src = "/images/logoAinovaHealth.png";
    });
    const width = 780;
    const height = Math.max(1, Math.round((image.naturalHeight / image.naturalWidth) * width));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const base64 = dataUrl.split(",")[1];
    if (!base64) return null;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return { bytes, width, height };
  } catch {
    return null;
  }
}

function textOp(
  x: number,
  y: number,
  value: string,
  size: number,
  bold: boolean,
  color: [number, number, number],
) {
  return [
    "BT",
    `${rgb(color)} rg`,
    `${bold ? "/F2" : "/F1"} ${size} Tf`,
    `1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm`,
    `${pdfString(value)} Tj`,
    "ET",
  ].join("\n");
}

function rectOp(
  x: number,
  y: number,
  w: number,
  h: number,
  fill?: [number, number, number],
  stroke?: [number, number, number],
  lineWidth = 0.8,
) {
  const ops = [`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re`];
  if (fill && stroke) {
    ops.unshift(`${rgb(fill)} rg`, `${rgb(stroke)} RG`, `${lineWidth} w`);
    ops.push("B");
  } else if (fill) {
    ops.unshift(`${rgb(fill)} rg`);
    ops.push("f");
  } else if (stroke) {
    ops.unshift(`${rgb(stroke)} RG`, `${lineWidth} w`);
    ops.push("S");
  }
  return ops.join("\n");
}

function lineOp(x1: number, y1: number, x2: number, y2: number, color: [number, number, number], width = 0.8) {
  return [
    `${rgb(color)} RG`,
    `${width} w`,
    `${x1.toFixed(2)} ${y1.toFixed(2)} m`,
    `${x2.toFixed(2)} ${y2.toFixed(2)} l`,
    "S",
  ].join("\n");
}

type Block = {
  height: number;
  keepTogether?: boolean;
  preferRoom?: number;
  draw: (top: number) => string;
};

function fieldHeight(label: string, value: string, width: number) {
  const lines = wrapText(value, 10, width);
  return 11 + lines.length * 12 + 8;
}

function fieldBlock(label: string, value: string, x: number, width: number): Block {
  const lines = wrapText(value, 10, width);
  return {
    height: 11 + lines.length * 12 + 8,
    draw: (top) => {
      const ops = [textOp(x, top - 9, label.toUpperCase(), 7.5, true, SLATE)];
      lines.forEach((line, index) => {
        ops.push(textOp(x, top - 22 - index * 12, line, 10, false, INK));
      });
      return ops.join("\n");
    },
  };
}

function gridBlock(cells: { label: string; value: string }[], columns: number): Block {
  const gap = 10;
  const colW = (CONTENT_W - gap * (columns - 1)) / columns;
  const rows: { label: string; value: string }[][] = [];
  for (let i = 0; i < cells.length; i += columns) {
    rows.push(cells.slice(i, i + columns));
  }
  const rowHeights = rows.map((row) =>
    Math.max(...row.map((cell) => fieldHeight(cell.label, cell.value, colW))),
  );
  return {
    height: rowHeights.reduce((sum, h) => sum + h, 0),
    keepTogether: true,
    draw: (top) => {
      const ops: string[] = [];
      let y = top;
      rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          ops.push(fieldBlock(cell.label, cell.value, MARGIN_X + colIndex * (colW + gap), colW).draw(y));
        });
        y -= rowHeights[rowIndex];
      });
      return ops.join("\n");
    },
  };
}

function sectionBlock(title: string): Block {
  return {
    height: 24,
    preferRoom: 64,
    draw: (top) =>
      [
        rectOp(MARGIN_X, top - 18, CONTENT_W, 18, TEAL),
        textOp(MARGIN_X + 8, top - 13, title, 8.5, true, [1, 1, 1]),
      ].join("\n"),
  };
}

function noteBlock(text: string): Block {
  const lines = wrapText(text, 9, CONTENT_W - 16);
  const height = lines.length * 11 + 16;
  return {
    height,
    keepTogether: true,
    draw: (top) => {
      const ops = [
        rectOp(MARGIN_X, top - height, CONTENT_W, height, [1, 0.98, 0.93], ALLERGY_BD, 0.7),
      ];
      lines.forEach((line, index) => {
        ops.push(textOp(MARGIN_X + 8, top - 12 - index * 11, line, 9, false, INK));
      });
      return ops.join("\n");
    },
  };
}

function spaceBlock(height: number): Block {
  return { height, draw: () => "" };
}

function titleBlock(): Block {
  return {
    height: 46,
    keepTogether: true,
    draw: (top) =>
      [
        textOp(MARGIN_X, top - 18, "HISTORIA CLÍNICA", 16, true, TEAL),
        textOp(
          MARGIN_X,
          top - 34,
          "Documento de prueba · datos ficticios · sin validez clínica ni jurídica",
          8,
          false,
          SLATE,
        ),
        lineOp(MARGIN_X, top - 42, MARGIN_X + CONTENT_W, top - 42, GREEN, 1.4),
      ].join("\n"),
  };
}

function headerOps(logo: LogoImage | null, input: ClinicalPdfInput) {
  const ops = [
    rectOp(0, PAGE_H - 8, PAGE_W, 8, TEAL),
    lineOp(MARGIN_X, PAGE_H - HEADER_H + 8, MARGIN_X + CONTENT_W, PAGE_H - HEADER_H + 8, GREEN, 1.2),
    textOp(MARGIN_X + (logo ? 128 : 0), PAGE_H - 32, "Atención médica a domicilio", 8, false, SLATE),
    textOp(MARGIN_X + (logo ? 128 : 0), PAGE_H - 44, "Bogotá, Colombia", 8, false, SLATE),
    textOp(PAGE_W - MARGIN_X - textWidth("DOCUMENTO DE PRUEBA", 8, true), PAGE_H - 28, "DOCUMENTO DE PRUEBA", 8, true, TEAL),
    textOp(
      PAGE_W - MARGIN_X - textWidth(input.patientId, 8, false),
      PAGE_H - 42,
      input.patientId,
      8,
      false,
      SLATE,
    ),
  ];

  if (logo) {
    const drawH = 28;
    const drawW = (logo.width / logo.height) * drawH;
    ops.unshift(
      "q",
      `${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${MARGIN_X.toFixed(2)} ${(PAGE_H - 50).toFixed(2)} cm`,
      "/Im1 Do",
      "Q",
    );
  } else {
    ops.unshift(textOp(MARGIN_X, PAGE_H - 36, "AinovaHealth", 14, true, TEAL));
  }

  return ops.join("\n");
}

function footerOps(page: number, total: number) {
  const left = "AinovaHealth · Documento de demostración · no se almacena ni se envía";
  const pages = `Página ${page} de ${total}`;
  return [
    lineOp(MARGIN_X, FOOTER_H, MARGIN_X + CONTENT_W, FOOTER_H, LINE, 0.7),
    textOp(MARGIN_X, 28, left, 7, false, SLATE),
    textOp(PAGE_W - MARGIN_X - textWidth(pages, 7, true), 28, pages, 7, true, TEAL),
    textOp(MARGIN_X, 16, "www.ainovahealth.com", 7, false, SLATE),
  ].join("\n");
}

function medicationText(input: ClinicalPdfInput) {
  if (input.currentMedsStatus !== "Sí") {
    return `¿Actualmente toma medicamentos?: ${display(input.currentMedsStatus)}`;
  }
  const rows = input.reportedMeds.map((med, index) => {
    const parts = [
      med.name,
      med.dose,
      med.frequency,
      med.route,
      med.indication,
      med.notes,
    ].filter((part) => part.trim());
    return `${index + 1}. ${parts.join(" · ")}`;
  });
  return `¿Actualmente toma medicamentos?: Sí\n${rows.join("\n") || "—"}`;
}

function showProcedure(input: ClinicalPdfInput) {
  return (
    input.attentionType === "Lavado de oídos" ||
    input.attentionType === "Sutura" ||
    Boolean(input.procedureNotes.trim())
  );
}

function procedureText(input: ClinicalPdfInput) {
  const reserved =
    "Campos específicos de este procedimiento pendientes de validación clínica. No se incluye protocolo médico.";
  if (input.procedureNotes.trim()) {
    return `${reserved}\n${input.procedureNotes.trim()}`;
  }
  return reserved;
}

function buildBlocks(input: ClinicalPdfInput): Block[] {
  const blocks: Block[] = [
    titleBlock(),
    spaceBlock(4),
    sectionBlock("1. IDENTIFICACIÓN DEL PACIENTE"),
    gridBlock(
      [
        { label: "Nombre completo", value: input.fullName },
        { label: "Documento", value: `${input.documentType} ${input.documentNumber}` },
        { label: "Fecha de nacimiento", value: formatBirth(input.birthDate) },
        { label: "Edad al encuentro", value: input.age },
        { label: "Sexo", value: input.sex },
        { label: "Teléfono", value: input.phone },
        { label: "Correo", value: input.email },
        { label: "Ciudad", value: input.city },
      ],
      2,
    ),
    fieldBlock("Dirección", input.patientAddress, MARGIN_X, CONTENT_W),
    fieldBlock(
      "Contacto de emergencia",
      `${input.emergencyName} (${input.emergencyRelation}) · ${input.emergencyPhone}`,
      MARGIN_X,
      CONTENT_W,
    ),
    sectionBlock("2. DATOS DE LA ATENCIÓN"),
    gridBlock(
      [
        { label: "Fecha", value: formatDate(input.date) },
        { label: "Hora", value: input.time },
        { label: "Tipo de atención", value: input.attentionType },
        { label: "Modalidad", value: input.modality },
      ],
      2,
    ),
    fieldBlock("Dirección de atención", input.attentionAddress, MARGIN_X, CONTENT_W),
    sectionBlock("3. MOTIVO DE CONSULTA"),
    fieldBlock("Motivo de consulta", input.reason, MARGIN_X, CONTENT_W),
    sectionBlock("4. ENFERMEDAD ACTUAL"),
    gridBlock(
      [
        { label: "Inicio", value: input.illnessOnset },
        { label: "Síntomas asociados", value: input.associatedSymptoms },
      ],
      2,
    ),
    fieldBlock("Evolución", input.illnessEvolution, MARGIN_X, CONTENT_W),
    fieldBlock("Tratamientos previos", input.previousTreatments, MARGIN_X, CONTENT_W),
    fieldBlock("Observaciones", input.illnessNotes, MARGIN_X, CONTENT_W),
    sectionBlock("5. ANTECEDENTES"),
    gridBlock(
      [
        { label: "Personales", value: input.antPersonal },
        { label: "Quirúrgicos", value: input.antSurgical },
        { label: "Hospitalarios", value: input.antHospital },
        { label: "Familiares", value: input.antFamily },
        { label: "Farmacológicos", value: input.antPharmacological },
        { label: "Toxicológicos", value: input.antToxicological },
        { label: "Gineco-obstétricos", value: input.antGyneco },
        { label: "Inmunizaciones", value: input.antImmunization },
      ],
      2,
    ),
    sectionBlock("6. MEDICAMENTOS ACTUALES"),
    fieldBlock("Medicamentos reportados", medicationText(input), MARGIN_X, CONTENT_W),
    sectionBlock("7. ALERGIAS"),
    noteBlock(`Alergias: ${display(input.allergies)}`),
    spaceBlock(8),
    sectionBlock("8. SIGNOS VITALES"),
    gridBlock(
      [
        { label: "Presión arterial", value: input.bp ? `${input.bp} mmHg` : "—" },
        { label: "Frecuencia cardíaca", value: input.hr ? `${input.hr} lpm` : "—" },
        { label: "Frecuencia respiratoria", value: input.rr ? `${input.rr} rpm` : "—" },
        { label: "Temperatura", value: input.temperature ? `${input.temperature} °C` : "—" },
        { label: "Saturación de oxígeno", value: input.spo2 ? `${input.spo2} %` : "—" },
        { label: "Peso", value: input.weight ? `${input.weight} kg` : "—" },
        { label: "Talla", value: input.height ? `${input.height} cm` : "—" },
        { label: "Otros", value: input.vitalsOther },
      ],
      4,
    ),
    sectionBlock("9. EXAMEN FÍSICO"),
    fieldBlock("Examen físico", input.physicalExam, MARGIN_X, CONTENT_W),
    sectionBlock("10. EVALUACIÓN CLÍNICA"),
    fieldBlock("Hallazgos", input.findings, MARGIN_X, CONTENT_W),
    fieldBlock("Observaciones", input.evaluationNotes, MARGIN_X, CONTENT_W),
    sectionBlock("11. DIAGNÓSTICO / IMPRESIÓN CLÍNICA"),
    fieldBlock("Impresión diagnóstica", input.diagnosis, MARGIN_X, CONTENT_W),
    fieldBlock("Diagnósticos diferenciales", input.differentials, MARGIN_X, CONTENT_W),
    sectionBlock("12. PLAN Y CONDUCTA"),
    fieldBlock("Tratamiento", input.treatment, MARGIN_X, CONTENT_W),
    fieldBlock("Medicamentos formulados", input.prescribedMeds, MARGIN_X, CONTENT_W),
    fieldBlock("Procedimientos realizados", input.proceduresDone, MARGIN_X, CONTENT_W),
    fieldBlock("Signos de alarma", input.alarmSigns, MARGIN_X, CONTENT_W),
    fieldBlock("Seguimiento", input.followUp, MARGIN_X, CONTENT_W),
    fieldBlock("Remisión", input.referral, MARGIN_X, CONTENT_W),
  ];

  if (showProcedure(input)) {
    blocks.push(
      sectionBlock("13. PROCEDIMIENTO"),
      noteBlock(`Tipo de atención: ${input.attentionType}`),
      spaceBlock(6),
      fieldBlock("Notas del procedimiento", procedureText(input), MARGIN_X, CONTENT_W),
    );
  }

  blocks.push(
    sectionBlock(showProcedure(input) ? "14. RECOMENDACIONES" : "13. RECOMENDACIONES"),
    fieldBlock("Recomendaciones", input.recommendations, MARGIN_X, CONTENT_W),
    sectionBlock(showProcedure(input) ? "15. PROFESIONAL RESPONSABLE" : "14. PROFESIONAL RESPONSABLE"),
    gridBlock(
      [
        { label: "Profesional", value: input.closingProfessional || input.professional },
        { label: "Especialidad", value: input.specialty },
        { label: "Registro", value: input.license },
        { label: "Correo", value: input.professionalEmail },
      ],
      2,
    ),
    fieldBlock("Observaciones de cierre", input.closingNotes, MARGIN_X, CONTENT_W),
    sectionBlock(showProcedure(input) ? "16. FECHA Y HORA DE LA ATENCIÓN" : "15. FECHA Y HORA DE LA ATENCIÓN"),
    gridBlock(
      [
        { label: "Fecha de atención", value: formatDate(input.date) },
        { label: "Hora de atención", value: input.time },
        { label: "Finalización", value: formatDateTime(input.finishedAt) },
        { label: "Ciudad", value: input.city },
      ],
      2,
    ),
    spaceBlock(10),
    fieldBlock(
      "Firma / autenticación",
      "Mecanismo de firma y autenticación pendiente de definir. Este documento es únicamente una previsualización de diseño.",
      MARGIN_X,
      CONTENT_W,
    ),
  );

  return blocks;
}

function paginate(blocks: Block[]) {
  const firstTop = PAGE_H - HEADER_H - 8;
  const otherTop = PAGE_H - HEADER_H - 6;
  const bottom = FOOTER_H + 12;
  const usable = firstTop - bottom;
  const pages: { ops: string[]; cursor: number }[] = [{ ops: [], cursor: firstTop }];

  const newPage = () => {
    pages.push({ ops: [], cursor: otherTop });
  };

  for (const block of blocks) {
    if (block.height <= 0) continue;
    let current = pages[pages.length - 1];
    const remaining = current.cursor - bottom;
    const needsRoom = block.preferRoom ?? (block.keepTogether ? block.height : 0);
    if (remaining < 22 || (needsRoom > 0 && remaining < Math.min(needsRoom, usable))) {
      newPage();
      current = pages[pages.length - 1];
    }
    if (current.cursor - block.height < bottom) {
      newPage();
      current = pages[pages.length - 1];
    }
    current.ops.push(block.draw(current.cursor));
    current.cursor -= block.height;
  }

  return pages;
}

function objectBody(content: string | Uint8Array) {
  return typeof content === "string" ? strBytes(content) : content;
}

function streamObject(dict: string, data: Uint8Array) {
  return concatBytes([
    strBytes(`${dict}\nstream\n`),
    data,
    strBytes("\nendstream"),
  ]);
}

export async function buildClinicalHistoryPdf(input: ClinicalPdfInput): Promise<Uint8Array> {
  const logo = await loadLogo();
  const pages = paginate(buildBlocks(input));
  const total = Math.max(pages.length, 1);

  const objects: Uint8Array[] = [];
  const add = (body: string | Uint8Array) => {
    objects.push(objectBody(body));
    return objects.length;
  };

  const fontRegularId = add(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  );
  const fontBoldId = add(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );

  let imageId: number | null = null;
  if (logo) {
    imageId = add(
      streamObject(
        `<< /Type /XObject /Subtype /Image /Width ${logo.width} /Height ${logo.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logo.bytes.length} >>`,
        logo.bytes,
      ),
    );
  }

  const contentBodies = pages.map((page, index) => {
    const content = [
      headerOps(logo, input),
      footerOps(index + 1, total),
      page.ops.filter(Boolean).join("\n"),
    ].join("\n");
    return strBytes(content);
  });

  const xobjects = imageId ? ` /XObject << /Im1 ${imageId} 0 R >>` : "";
  const contentIds = contentBodies.map((bytes) =>
    add(streamObject(`<< /Length ${bytes.length} >>`, bytes)),
  );
  const pagesId = objects.length + contentIds.length + 1;

  const pageIds = contentIds.map((contentId) =>
    add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Rotate 0 /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >>${xobjects} >> >>`,
    ),
  );

  const actualPagesId = add(
    `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`,
  );
  if (actualPagesId !== pagesId) {
    throw new Error("PDF object graph mismatch");
  }

  const catalogId = add(`<< /Type /Catalog /Pages ${actualPagesId} 0 R >>`);
  add(
    `<< /Title ${pdfString(`Historia clínica · ${input.fullName}`)} /Author ${pdfString("AinovaHealth")} /Subject ${pdfString("Previsualización de diseño · documento de prueba")} /Creator ${pdfString("AinovaHealth")} /Producer ${pdfString("AinovaHealth")} >>`,
  );

  const header = strBytes("%PDF-1.4\n%\x80\x81\x82\x83\n");
  const parts: Uint8Array[] = [header];
  const offsets = [0];
  let offset = header.length;
  objects.forEach((body, index) => {
    const prefix = strBytes(`${index + 1} 0 obj\n`);
    const suffix = strBytes("\nendobj\n");
    offsets.push(offset);
    parts.push(prefix, body, suffix);
    offset += prefix.length + body.length + suffix.length;
  });

  const xrefPos = offset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i += 1) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  parts.push(strBytes(xref), strBytes(trailer));
  return concatBytes(parts);
}
