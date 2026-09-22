export const DEMO_CODE_PREFIX = "DEMO-";
export const DEMO_PRACTITIONER_EMAIL = "demo.portal@ainovahealth.local";

export function isDemoMode() {
  return process.env.DEMO_MODE === "true";
}

export function isDemoDisplayCode(displayCode: string) {
  return displayCode.startsWith(DEMO_CODE_PREFIX);
}

export function isVisibleInCurrentMode(displayCode: string) {
  return isDemoMode() === isDemoDisplayCode(displayCode);
}

export function patientScopeWhere() {
  const displayCode = { startsWith: DEMO_CODE_PREFIX };
  return isDemoMode() ? { displayCode } : { NOT: { displayCode } };
}

export function scopeMismatchMessage() {
  return isDemoMode()
    ? "Esta ficha no pertenece al modo demo."
    : "Esta ficha no está disponible.";
}
