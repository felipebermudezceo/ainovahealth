"use client";

import { useActionState } from "react";
import {
  DOCUMENT_TYPES,
  OPERATIONAL_STATUSES,
  SEX_VALUES,
  STATUS_LABELS,
  type OperationalStatusValue,
} from "@/lib/patients/constants";
import type { PatientFormState } from "@/lib/patients/validation";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] text-[#0A3D49] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2";

type PatientFormValues = {
  fullName?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  sex?: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  operationalStatus?: OperationalStatusValue;
};

export function PatientForm({
  action,
  patient,
  submitLabel,
}: {
  action: (state: PatientFormState, formData: FormData) => Promise<PatientFormState>;
  patient?: PatientFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      {state.error ? (
        <p className="sm:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold">Nombre completo</span>
        <input
          name="fullName"
          required
          defaultValue={patient?.fullName ?? ""}
          className={inputClass}
        />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Tipo de documento</span>
        <select
          name="documentType"
          required
          defaultValue={patient?.documentType ?? DOCUMENT_TYPES[0]}
          className={inputClass}
        >
          {DOCUMENT_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Número de documento</span>
        <input
          name="documentNumber"
          required
          defaultValue={patient?.documentNumber ?? ""}
          className={inputClass}
        />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Fecha de nacimiento</span>
        <input
          type="date"
          name="birthDate"
          required
          defaultValue={patient?.birthDate ?? ""}
          className={inputClass}
        />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Sexo</span>
        <select
          name="sex"
          required
          defaultValue={patient?.sex ?? SEX_VALUES[0]}
          className={inputClass}
        >
          {SEX_VALUES.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Teléfono</span>
        <input name="phone" defaultValue={patient?.phone ?? ""} className={inputClass} />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Correo</span>
        <input
          type="email"
          name="email"
          defaultValue={patient?.email ?? ""}
          className={inputClass}
        />
      </label>

      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-semibold">Dirección</span>
        <input name="address" defaultValue={patient?.address ?? ""} className={inputClass} />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Ciudad</span>
        <input name="city" defaultValue={patient?.city ?? ""} className={inputClass} />
      </label>

      <label>
        <span className="mb-1.5 block text-sm font-semibold">Estado operativo</span>
        <select
          name="operationalStatus"
          defaultValue={patient?.operationalStatus ?? "active"}
          className={inputClass}
        >
          {(OPERATIONAL_STATUSES).map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:col-span-2 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-b from-[#31DD6E] to-[#19B858] px-6 py-3 text-[15px] font-bold text-white disabled:opacity-60"
        >
          {pending ? "Guardando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
