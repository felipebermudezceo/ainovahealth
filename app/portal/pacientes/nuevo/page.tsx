import Link from "next/link";
import { createPatient } from "../actions";
import { PatientForm } from "@/components/portal/PatientForm";
import { requirePractitioner } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function NuevoPacientePage() {
  await requirePractitioner();
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-slate-500">
        <Link href="/portal/pacientes" className="font-semibold text-[#0A3D49]">
          Pacientes
        </Link>{" "}
        / Nuevo
      </p>
      <h1 className="mt-2 text-[30px] font-black tracking-tight text-[#0A3D49] lg:text-[36px]">
        Nuevo paciente
      </h1>
      <p className="mt-2 text-slate-500">
        Crea la ficha maestra. La historia clínica de cada atención se asociará
        después.
      </p>

      <div className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100 lg:p-8">
        <PatientForm action={createPatient} submitLabel="Guardar paciente" />
      </div>
    </div>
  );
}
