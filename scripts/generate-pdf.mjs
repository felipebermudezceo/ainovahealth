import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const htmlPath = path.resolve("..", "PROPUESTA_ESTRATEGICA_PLAN_DE_CHOQUE_DR_ADNIER.html");
const pdfPath = path.resolve("..", "PROPUESTA_ESTRATEGICA_PLAN_DE_CHOQUE_DR_ADNIER.pdf");

const chromePaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

const browserExe = chromePaths.find((p) => fs.existsSync(p));

if (!browserExe) {
  console.error("No se encontró navegador para imprimir PDF.");
  process.exit(1);
}

try {
  execSync(
    `"${browserExe}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "file:///${htmlPath.replace(/\\/g, "/")}"`,
    { stdio: "inherit" }
  );
  console.log(`PDF compilado con éxito en: ${pdfPath}`);
} catch (err) {
  console.error("Error al generar PDF:", err.message);
  process.exit(1);
}
