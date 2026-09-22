import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePatient } from "../../actions";
import { getPatient } from "@/lib/patients/queries";
import { PatientForm } from "@/components/portal/PatientForm";

export const dynamic = "force-dynamic";

export default async function EditarPacientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await getPatient(id);
  if (!patient) notFound();

  const action = updatePatient.bind(null, patient.id);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-slate-500">
        <Link href={`/portal/pacientes/${patient.id}`} className="font-semibold text-[#0A3D49]">
          {patient.displayCode}
        </Link>{" "}
        / Editar
      </p>
      <h1 className="mt-2 text-[30px] font-black tracking-tight text-[#0A3D49] lg:text-[36px]">
        Editar paciente
      </h1>
      <p className="mt-2 text-slate-500">
        Actualiza la ficha viva. No se eliminan pacientes; use el estado
        operativo Cerrado si corresponde.
      </p>

      <div className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.06)] ring-1 ring-slate-100 lg:p-8">
        <PatientForm
          action={action}
          submitLabel="Guardar cambios"
          patient={patient}
        />
      </div>
    </div>
  );
}
