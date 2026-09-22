export function formatDateUtc(value: Date) {
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatTimeUtc(value: Date) {
  const hours = String(value.getUTCHours()).padStart(2, "0");
  const minutes = String(value.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function dateFromYmd(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

export function timeFromHm(value: string) {
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return new Date("1970-01-01T00:00:00.000Z");
  return new Date(`1970-01-01T${match[1]}:${match[2]}:00.000Z`);
}

export function nowInBogota() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    date: `${read("year")}-${read("month")}-${read("day")}`,
    time: `${read("hour")}:${read("minute")}`,
  };
}

export function formatDateTimeBogota(value: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "short",
    timeStyle: "short",
  }).format(value);
}

export function ageYearsAt(birthDate: Date, onDate: Date) {
  let age = onDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const month = onDate.getUTCMonth() - birthDate.getUTCMonth();
  if (month < 0 || (month === 0 && onDate.getUTCDate() < birthDate.getUTCDate())) {
    age -= 1;
  }
  return Math.max(0, age);
}

export function ageAtEncounter(birthDate: string, onDate: string) {
  if (!birthDate || !onDate) return "—";
  const birth = new Date(`${birthDate}T00:00:00`);
  const on = new Date(`${onDate}T00:00:00`);
  if (Number.isNaN(birth.getTime()) || Number.isNaN(on.getTime())) return "—";
  let age = on.getFullYear() - birth.getFullYear();
  const month = on.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && on.getDate() < birth.getDate())) age -= 1;
  return `${age} años`;
}
