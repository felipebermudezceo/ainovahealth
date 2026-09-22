export const mockDoctor = {
  name: "Dra. Camila Restrepo",
  specialty: "Medicina General",
  email: "camila.restrepo@ainovahealth.com",
  phone: "+57 300 000 0000",
  license: "RM 123456",
  city: "Bogotá",
};

export const mockStats = [
  { label: "Pacientes atendidos", value: "128", hint: "Datos de demostración" },
  { label: "Historias clínicas", value: "64", hint: "Datos de demostración" },
  { label: "Atenciones esta semana", value: "12", hint: "Datos de demostración" },
];

export const mockPatients = [
  {
    id: "P-1001",
    name: "Laura Méndez",
    age: 34,
    lastVisit: "12 Sep 2026",
    service: "Medicina general",
    status: "Activo",
  },
  {
    id: "P-1002",
    name: "Andrés Castillo",
    age: 41,
    lastVisit: "10 Sep 2026",
    service: "Laboratorio clínico",
    status: "Activo",
  },
  {
    id: "P-1003",
    name: "Valentina Rojas",
    age: 8,
    lastVisit: "08 Sep 2026",
    service: "Pediatría",
    status: "Seguimiento",
  },
  {
    id: "P-1004",
    name: "Jorge Palacios",
    age: 67,
    lastVisit: "05 Sep 2026",
    service: "Electrocardiograma",
    status: "Activo",
  },
  {
    id: "P-1005",
    name: "Diana Herrera",
    age: 29,
    lastVisit: "01 Sep 2026",
    service: "Lavado de oídos",
    status: "Cerrado",
  },
];

export const mockRecentVisits = [
  {
    patient: "Laura Méndez",
    date: "12 Sep 2026",
    type: "Consulta general",
  },
  {
    patient: "Andrés Castillo",
    date: "10 Sep 2026",
    type: "Toma de muestra",
  },
  {
    patient: "Valentina Rojas",
    date: "08 Sep 2026",
    type: "Valoración pediátrica",
  },
  {
    patient: "Jorge Palacios",
    date: "05 Sep 2026",
    type: "Electrocardiograma",
  },
];
