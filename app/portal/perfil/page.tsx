import { prisma } from "@/lib/db/prisma";
import { requirePractitioner } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

type ProfileView = {
  fullName: string;
  specialty: string;
  email: string;
  license: string;
  phone: string | null;
  city: string | null;
};

function initialsFromName(fullName: string) {
  return fullName
    .split(" ")
    .filter((part: string) => part.length > 0)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function PortalPerfilPage() {
  const sessionPractitioner = await requirePractitioner();
  const practitioner = await prisma.practitioner.findUnique({
    where: { id: sessionPractitioner.id },
    select: {
      fullName: true,
      specialty: true,
      email: true,
      phone: true,
      license: true,
      city: true,
    },
  });

  const profile: ProfileView = practitioner
    ? {
        fullName: practitioner.fullName,
        specialty: practitioner.specialty,
        email: practitioner.email,
        license: practitioner.license,
        phone: practitioner.phone,
        city: practitioner.city,
      }
    : {
        fullName: sessionPractitioner.fullName,
        specialty: sessionPractitioner.specialty,
        email: sessionPractitioner.email,
        license: sessionPractitioner.license,
        phone: null,
        city: null,
      };
  const initials = initialsFromName(profile.fullName);

  const fields = [
    { label: "Nombre", value: profile.fullName },
    { label: "Especialidad", value: profile.specialty },
    { label: "Correo", value: profile.email },
    {
      label: "Teléfono",
      value: profile.phone || "—",
    },
    { label: "Registro médico", value: profile.license },
    { label: "Ciudad", value: profile.city || "—" },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-[30px] font-black tracking-tight text-[#0A3D49] lg:text-[36px]">
        Perfil
      </h1>
      <p className="mt-2 text-slate-500">
        Datos del profesional autenticado.
      </p>

      <div className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100 lg:p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5] text-xl font-black text-[#25D366]">
          {initials || "—"}
        </div>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {field.label}
              </dt>
              <dd className="mt-1 text-[16px] font-medium text-[#0A3D49]">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
