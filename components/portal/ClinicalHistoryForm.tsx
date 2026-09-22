"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import {
  finalizeEncounter,
  markEncounterInReview,
  saveDraftEncounter,
} from "@/app/portal/historia-clinica/actions";
import { ageAtEncounter } from "@/lib/encounters/datetime";
import type { ClinicalFormValues, EncounterEditorData } from "@/lib/encounters/types";
import { buildClinicalHistoryPdf, type ClinicalPdfInput } from "./clinical-history-pdf";

const ATTENTION_TYPES = [
  "Médico a domicilio",
  "Lavado de oídos",
  "Sutura",
] as const;

type AttentionType = (typeof ATTENTION_TYPES)[number];
type View = "edit" | "review" | "pdf";
type MedsStatus = "Sí" | "No" | "No sabe";
type EncounterStatus = "draft" | "in_review" | "finished";

type ReportedMedication = ClinicalFormValues["reportedMeds"][number];
type HistoryForm = ClinicalFormValues;

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[14px] text-[#0A3D49] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2";

function ageAt(birthDate: string, onDate: string) {
  return ageAtEncounter(birthDate, onDate);
}

function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[12px] font-semibold text-[#0A3D49]">
        {label}
      </span>
      {hint ? <span className="mb-1.5 block text-[11px] text-slate-400">{hint}</span> : null}
      {children}
    </label>
  );
}

function Fold({
  title,
  entity,
  defaultOpen = true,
  children,
}: {
  title: string;
  entity: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 text-left lg:px-5"
      >
        <span>
          <span className="block text-[13px] font-bold uppercase tracking-[0.12em] text-[#0A3D49]">
            {title}
          </span>
          <span className="mt-0.5 block font-mono text-[10px] text-slate-400">{entity}</span>
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:p-5">{children}</div> : null}
    </section>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 whitespace-pre-wrap text-[14px] leading-6 text-[#0A3D49]">
        {value || "—"}
      </dd>
    </div>
  );
}

function statusLabel(status: EncounterStatus) {
  if (status === "finished") return "Finalizada";
  if (status === "in_review") return "En revisión";
  return "Borrador";
}

function toPdfInput(
  form: HistoryForm,
  age: string,
  practitioner: EncounterEditorData["practitioner"],
  displayCode: string,
): ClinicalPdfInput {
  return {
    ...form,
    age,
    specialty: practitioner.specialty,
    license: practitioner.license,
    professionalEmail: practitioner.email,
    patientId: displayCode,
  };
}

export function ClinicalHistoryForm({
  encounterId,
  patientId,
  displayCode,
  version: initialVersion,
  status: persistedStatus,
  finalizedAtLabel: initialFinalizedAtLabel,
  finalizedByName: initialFinalizedByName,
  form: initialForm,
  practitioner,
}: EncounterEditorData) {
  const [status, setStatus] = useState<EncounterStatus>(persistedStatus);
  const [finalizedAtLabel, setFinalizedAtLabel] = useState(initialFinalizedAtLabel);
  const [finalizedByName, setFinalizedByName] = useState(initialFinalizedByName);
  const readOnly = status === "finished";
  const [view, setView] = useState<View>(persistedStatus === "draft" ? "edit" : "review");
  const [form, setForm] = useState<HistoryForm>(initialForm);
  const [version, setVersion] = useState(initialVersion);
  const [draftNotice, setDraftNotice] = useState("");
  const [saveError, setSaveError] = useState("");
  const [missingSections, setMissingSections] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [confirmFinalize, setConfirmFinalize] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [pdfReturnView, setPdfReturnView] = useState<Exclude<View, "pdf">>("edit");
  const [practitionerInfo, setPractitionerInfo] = useState(practitioner);

  const applyEditor = (editor: EncounterEditorData) => {
    setForm(editor.form);
    setVersion(editor.version);
    setStatus(editor.status);
    setFinalizedAtLabel(editor.finalizedAtLabel);
    setFinalizedByName(editor.finalizedByName);
    setPractitionerInfo(editor.practitioner);
  };

  const age = useMemo(
    () => ageAt(form.birthDate, form.date),
    [form.birthDate, form.date],
  );

  const update = (key: keyof HistoryForm, value: string) => {
    if (readOnly) return;
    setForm((current) => ({ ...current, [key]: value }));
    setDraftNotice("");
    setSaveError("");
    setMissingSections([]);
  };

  const updateMed = (index: number, key: keyof ReportedMedication, value: string) => {
    if (readOnly) return;
    setForm((current) => ({
      ...current,
      reportedMeds: current.reportedMeds.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
    setDraftNotice("");
    setSaveError("");
    setMissingSections([]);
  };

  const persistDraft = async () => {
    setSaving(true);
    setSaveError("");
    setDraftNotice("");
    setMissingSections([]);
    try {
      const result = await saveDraftEncounter({
        encounterId,
        patientId,
        version,
        form,
      });
      if (result.error || !result.form || result.version == null) {
        setSaveError(result.error ?? "No se pudo guardar el borrador.");
        return null;
      }
      setForm(result.form);
      setVersion(result.version);
      return result;
    } finally {
      setSaving(false);
    }
  };

  const snapshot = {
    fullName: form.fullName,
    documentType: form.documentType,
    documentNumber: form.documentNumber,
    phone: form.phone,
    email: form.email,
    city: form.city,
    address: form.patientAddress,
  };

  const handleDraft = async () => {
    const result = await persistDraft();
    if (result) {
      setDraftNotice("Borrador guardado en esta atención. No se creó un Encounter nuevo.");
    }
  };

  const handleReview = async (event: FormEvent) => {
    event.preventDefault();
    if (readOnly) {
      setView("review");
      return;
    }
    const result = await persistDraft();
    if (!result || result.version == null) return;
    const review = await markEncounterInReview({
      encounterId,
      version: result.version,
    });
    if (review.error || !review.editor) {
      setSaveError(review.error ?? "No se pudo pasar la historia a revisión.");
      return;
    }
    applyEditor(review.editor);
    setView("review");
  };

  const handleFinalize = async () => {
    if (readOnly || finalizing) return;
    setFinalizing(true);
    setSaveError("");
    setMissingSections([]);
    try {
      const result = await finalizeEncounter({ encounterId, version });
      if (result.error || !result.editor) {
        setSaveError(result.error ?? "No se pudo finalizar la atención.");
        setMissingSections(result.missingSections ?? []);
        setConfirmFinalize(false);
        return;
      }
      applyEditor(result.editor);
      setConfirmFinalize(false);
      setView("review");
    } finally {
      setFinalizing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handlePdfPreview = async () => {
    setPdfBusy(true);
    setPdfError("");
    try {
      const bytes = await buildClinicalHistoryPdf(
        toPdfInput(form, age, practitionerInfo, displayCode),
      );
      const copy = Uint8Array.from(bytes);
      const url = URL.createObjectURL(new Blob([copy], { type: "application/pdf" }));
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(url);
      setPdfReturnView(view === "pdf" ? pdfReturnView : view);
      setView("pdf");
    } catch {
      setPdfError("No se pudo generar la vista previa del PDF.");
    } finally {
      setPdfBusy(false);
    }
  };

  const closePdfPreview = () => {
    setView(pdfReturnView);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl("");
    }
  };

  const pdfButton = (
    <button
      type="button"
      onClick={handlePdfPreview}
      disabled={pdfBusy}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-[14px] font-semibold text-[#0A3D49] disabled:opacity-60"
    >
      <FileText size={16} />
      {pdfBusy ? "Generando PDF…" : "Vista previa del PDF"}
    </button>
  );

  if (view === "pdf") {
    return (
      <div className="mx-auto max-w-5xl">
        <Header
          status={status}
          age={age}
          name={form.fullName}
          displayCode={displayCode}
          finalizedAtLabel={finalizedAtLabel}
          finalizedByName={finalizedByName}
        />
        <p className="mt-2 text-[13px] text-slate-500">
          Previsualización temporal del PDF. El archivo no se guarda ni se envía
          por correo.
        </p>
        <div className="sticky top-16 z-20 mt-4 flex flex-col gap-3 bg-[#F4FBF8] py-3 sm:flex-row">
          <button
            type="button"
            onClick={closePdfPreview}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-[14px] font-semibold text-[#0A3D49]"
          >
            Cerrar vista previa
          </button>
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#0A3D49] px-5 py-2.5 text-[14px] font-semibold text-white"
            >
              Abrir PDF en el navegador
            </a>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {pdfUrl ? (
            <iframe
              title="Vista previa del PDF de historia clínica"
              src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
              className="h-[min(88vh,1120px)] w-full bg-white"
            />
          ) : (
            <p className="px-5 py-10 text-center text-[14px] text-slate-500">
              No hay un PDF temporal para mostrar.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (view === "review") {
    return (
      <div className="mx-auto max-w-5xl">
        <Header
          status={status}
          age={age}
          name={form.fullName}
          displayCode={displayCode}
          finalizedAtLabel={finalizedAtLabel}
          finalizedByName={finalizedByName}
        />
        <p className="mt-2 text-[13px] text-slate-500">
          Revisión de los datos guardados de esta atención. No se vuelven a
          leer antecedentes vivos ni otra visita.
        </p>

        <div className="mt-5 space-y-4">
          <ReviewBlock title="EncounterIdentitySnapshot" subtitle="Identidad al momento de la atención">
            <ReviewItem label="Nombre" value={snapshot.fullName} />
            <ReviewItem label="Documento" value={`${snapshot.documentType} ${snapshot.documentNumber}`} />
            <ReviewItem label="Teléfono" value={snapshot.phone} />
            <ReviewItem label="Correo" value={snapshot.email} />
            <ReviewItem label="Ciudad" value={snapshot.city} />
            <ReviewItem label="Dirección" value={snapshot.address} />
          </ReviewBlock>

          <ReviewBlock title="Patient" subtitle="Datos del paciente">
            <ReviewItem label="Nombre completo" value={form.fullName} />
            <ReviewItem label="Sexo" value={form.sex} />
            <ReviewItem label="Fecha de nacimiento" value={form.birthDate} />
            <ReviewItem label="Edad al encuentro" value={age} />
            <ReviewItem label="Contacto de emergencia" value={`${form.emergencyName} (${form.emergencyRelation}) ${form.emergencyPhone}`} />
          </ReviewBlock>

          <ReviewBlock title="Encounter" subtitle="Datos de la atención">
            <ReviewItem label="Fecha" value={form.date} />
            <ReviewItem label="Hora" value={form.time} />
            <ReviewItem label="Profesional" value={form.professional} />
            <ReviewItem label="Tipo de atención" value={form.attentionType} />
            <ReviewItem label="Modalidad" value={form.modality} />
            <ReviewItem label="Dirección de atención" value={form.attentionAddress} />
            <ReviewItem label="Estado" value={statusLabel(status)} />
          </ReviewBlock>

          <ReviewBlock title="EncounterClinical" subtitle="Motivo y enfermedad actual">
            <ReviewItem label="Motivo de consulta" value={form.reason} />
            <ReviewItem label="Inicio" value={form.illnessOnset} />
            <ReviewItem label="Evolución" value={form.illnessEvolution} />
            <ReviewItem label="Síntomas asociados" value={form.associatedSymptoms} />
            <ReviewItem label="Tratamientos previos" value={form.previousTreatments} />
            <ReviewItem label="Observaciones" value={form.illnessNotes} />
          </ReviewBlock>

          <ReviewBlock title="PatientAntecedent" subtitle="Antecedentes">
            <ReviewItem label="Personales" value={form.antPersonal} />
            <ReviewItem label="Quirúrgicos" value={form.antSurgical} />
            <ReviewItem label="Hospitalarios" value={form.antHospital} />
            <ReviewItem label="Familiares" value={form.antFamily} />
            <ReviewItem label="Farmacológicos" value={form.antPharmacological} />
            <ReviewItem label="Toxicológicos" value={form.antToxicological} />
            <ReviewItem label="Gineco-obstétricos" value={form.antGyneco} />
            <ReviewItem label="Inmunizaciones" value={form.antImmunization} />
          </ReviewBlock>

          <ReviewBlock title="EncounterReportedMedication" subtitle="Medicamentos actuales">
            <ReviewItem label="¿Actualmente toma medicamentos?" value={form.currentMedsStatus} />
            {form.currentMedsStatus === "Sí"
              ? form.reportedMeds.map((med, index) => (
                  <ReviewItem
                    key={`${med.name}-${index}`}
                    label={`Medicamento ${index + 1}`}
                    value={`${med.name} · ${med.dose} · ${med.frequency} · ${med.route} · ${med.indication}${med.notes ? ` · ${med.notes}` : ""}`}
                  />
                ))
              : null}
          </ReviewBlock>

          <ReviewBlock title="PatientAllergy" subtitle="Alergias">
            <ReviewItem label="Alergias" value={form.allergies} />
          </ReviewBlock>

          <ReviewBlock title="EncounterClinical · vitales y examen">
            <ReviewItem label="Presión arterial" value={form.bp} />
            <ReviewItem label="Frecuencia cardíaca" value={form.hr} />
            <ReviewItem label="Frecuencia respiratoria" value={form.rr} />
            <ReviewItem label="Temperatura" value={form.temperature} />
            <ReviewItem label="Saturación de oxígeno" value={form.spo2} />
            <ReviewItem label="Peso" value={form.weight} />
            <ReviewItem label="Talla" value={form.height} />
            <ReviewItem label="Otros" value={form.vitalsOther} />
            <ReviewItem label="Examen físico" value={form.physicalExam} />
            <ReviewItem label="Hallazgos" value={form.findings} />
            <ReviewItem label="Impresión diagnóstica" value={form.diagnosis} />
            <ReviewItem label="Diagnósticos diferenciales" value={form.differentials} />
            <ReviewItem label="Observaciones" value={form.evaluationNotes} />
          </ReviewBlock>

          <ReviewBlock title="EncounterClinical · plan">
            <ReviewItem label="Tratamiento" value={form.treatment} />
            <ReviewItem label="Medicamentos formulados" value={form.prescribedMeds} />
            <ReviewItem label="Procedimientos realizados" value={form.proceduresDone} />
            <ReviewItem label="Recomendaciones" value={form.recommendations} />
            <ReviewItem label="Signos de alarma" value={form.alarmSigns} />
            <ReviewItem label="Seguimiento" value={form.followUp} />
            <ReviewItem label="Remisión" value={form.referral} />
          </ReviewBlock>

          <ReviewBlock
            title="EncounterProcedure"
            subtitle={`${form.attentionType} · campos específicos pendientes de validación clínica`}
          >
            <ReviewItem
              label="Notas del procedimiento"
              value={form.procedureNotes || "Sin diligenciar. Bloque reservado hasta validación clínica."}
            />
          </ReviewBlock>

          <ReviewBlock title="Cierre de la atención">
            <ReviewItem label="Profesional responsable" value={form.closingProfessional} />
            <ReviewItem label="Fecha y hora de finalización" value={form.finishedAt} />
            <ReviewItem label="Observaciones" value={form.closingNotes} />
            <ReviewItem label="Estado" value={statusLabel(status)} />
            <ReviewItem label="Firma / autenticación" value={form.signatureNote} />
          </ReviewBlock>
        </div>

        {saveError ? <p className="mt-4 text-[13px] text-red-600">{saveError}</p> : null}
        {missingSections.length > 0 ? (
          <ul className="mt-2 list-disc pl-5 text-[13px] text-red-600">
            {missingSections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ul>
        ) : null}
        {pdfError ? <p className="mt-4 text-[13px] text-red-600">{pdfError}</p> : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {readOnly ? null : (
            <button
              type="button"
              onClick={() => setView("edit")}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-[14px] font-semibold text-[#0A3D49]"
            >
              Volver a editar
            </button>
          )}
          {pdfButton}
          {readOnly ? (
            <button
              type="button"
              disabled
              className="rounded-lg bg-[#0A3D49] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-50"
            >
              Atención finalizada
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmFinalize(true)}
              disabled={finalizing}
              className="rounded-lg bg-[#0A3D49] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-50"
            >
              Finalizar atención
            </button>
          )}
        </div>
        {confirmFinalize ? (
          <FinalizeConfirm
            busy={finalizing}
            onCancel={() => setConfirmFinalize(false)}
            onConfirm={handleFinalize}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Header
        status={status}
        age={age}
        name={form.fullName}
        displayCode={displayCode}
        finalizedAtLabel={finalizedAtLabel}
        finalizedByName={finalizedByName}
      />
      <p className="mt-2 text-[13px] text-slate-500">
        Atención persistida en PostgreSQL. Guardar borrador actualiza este
        Encounter y no crea otra visita.
      </p>
      {readOnly ? (
        <p className="mt-2 text-[13px] text-amber-800">
          Esta atención está finalizada y no se puede editar.
        </p>
      ) : null}

      <form className="mt-5 space-y-3" onSubmit={handleReview}>
        <fieldset disabled={readOnly || saving} className="space-y-3">
        <Fold title="1. Datos del paciente" entity="Patient">
          <Field label="Nombre completo">
            <input className={inputClass} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
          </Field>
          <Field label="Tipo de documento" hint="Catálogo pendiente de validación">
            <select className={inputClass} value={form.documentType} onChange={(e) => update("documentType", e.target.value)}>
              <option>Cédula de ciudadanía</option>
              <option>Cédula de extranjería</option>
              <option>Tarjeta de identidad</option>
              <option>Pasaporte</option>
            </select>
          </Field>
          <Field label="Número de documento">
            <input className={inputClass} value={form.documentNumber} onChange={(e) => update("documentNumber", e.target.value)} />
          </Field>
          <Field label="Fecha de nacimiento">
            <input type="date" className={inputClass} value={form.birthDate} onChange={(e) => update("birthDate", e.target.value)} suppressHydrationWarning />
          </Field>
          <Field label="Edad" hint="Calculada a la fecha del encuentro">
            <input className={inputClass} value={age} readOnly />
          </Field>
          <Field label="Sexo" hint="Valores permitidos pendientes de validación">
            <select className={inputClass} value={form.sex} onChange={(e) => update("sex", e.target.value)}>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Otro</option>
              <option>No registrado</option>
            </select>
          </Field>
          <Field label="Teléfono">
            <input className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </Field>
          <Field label="Correo">
            <input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
          </Field>
          <Field label="Dirección" className="sm:col-span-2">
            <input className={inputClass} value={form.patientAddress} onChange={(e) => update("patientAddress", e.target.value)} />
          </Field>
          <Field label="Ciudad">
            <input className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)} />
          </Field>
          <Field label="Contacto de emergencia · nombre">
            <input className={inputClass} value={form.emergencyName} onChange={(e) => update("emergencyName", e.target.value)} />
          </Field>
          <Field label="Parentesco">
            <input className={inputClass} value={form.emergencyRelation} onChange={(e) => update("emergencyRelation", e.target.value)} />
          </Field>
          <Field label="Teléfono de emergencia">
            <input className={inputClass} value={form.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="2. Datos de la atención" entity="Encounter">
          <Field label="Fecha">
            <input type="date" className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} suppressHydrationWarning />
          </Field>
          <Field label="Hora">
            <input type="time" className={inputClass} value={form.time} onChange={(e) => update("time", e.target.value)} suppressHydrationWarning />
          </Field>
          <Field label="Profesional responsable" hint="Practitioner autenticado que atiende esta consulta.">
            <input className={inputClass} value={form.professional} readOnly />
          </Field>
          <Field label="Tipo de atención">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {ATTENTION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("attentionType", type)}
                  className={`rounded-lg px-3 py-2 text-[13px] font-semibold ${
                    form.attentionType === type
                      ? "bg-[#0A3D49] text-white"
                      : "border border-slate-200 bg-white text-[#0A3D49]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Modalidad" hint="Catálogo pendiente de validación">
            <select className={inputClass} value={form.modality} onChange={(e) => update("modality", e.target.value)}>
              <option>Domicilio</option>
              <option>Consultorio</option>
              <option>Teleorientación</option>
            </select>
          </Field>
          <Field label="Dirección de atención" className="sm:col-span-2">
            <input className={inputClass} value={form.attentionAddress} onChange={(e) => update("attentionAddress", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="3. Motivo de consulta / enfermedad actual" entity="EncounterClinical">
          <Field label="Motivo de consulta" className="sm:col-span-2">
            <input className={inputClass} value={form.reason} onChange={(e) => update("reason", e.target.value)} />
          </Field>
          <Field label="Inicio">
            <input className={inputClass} value={form.illnessOnset} onChange={(e) => update("illnessOnset", e.target.value)} />
          </Field>
          <Field label="Evolución">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.illnessEvolution} onChange={(e) => update("illnessEvolution", e.target.value)} />
          </Field>
          <Field label="Síntomas asociados">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.associatedSymptoms} onChange={(e) => update("associatedSymptoms", e.target.value)} />
          </Field>
          <Field label="Tratamientos previos">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.previousTreatments} onChange={(e) => update("previousTreatments", e.target.value)} />
          </Field>
          <Field label="Observaciones" className="sm:col-span-2">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.illnessNotes} onChange={(e) => update("illnessNotes", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="4. Antecedentes" entity="PatientAntecedent" defaultOpen={false}>
          <Field label="Personales">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antPersonal} onChange={(e) => update("antPersonal", e.target.value)} />
          </Field>
          <Field label="Quirúrgicos">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antSurgical} onChange={(e) => update("antSurgical", e.target.value)} />
          </Field>
          <Field label="Hospitalarios">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antHospital} onChange={(e) => update("antHospital", e.target.value)} />
          </Field>
          <Field label="Familiares">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antFamily} onChange={(e) => update("antFamily", e.target.value)} />
          </Field>
          <Field label="Farmacológicos">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antPharmacological} onChange={(e) => update("antPharmacological", e.target.value)} />
          </Field>
          <Field label="Toxicológicos">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antToxicological} onChange={(e) => update("antToxicological", e.target.value)} />
          </Field>
          <Field label="Gineco-obstétricos" hint="Completar cuando corresponda. Criterio clínico pendiente de validar.">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antGyneco} onChange={(e) => update("antGyneco", e.target.value)} />
          </Field>
          <Field label="Inmunizaciones" hint="Completar cuando corresponda. Esquema pendiente de validar.">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.antImmunization} onChange={(e) => update("antImmunization", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="5. Medicamentos actuales" entity="EncounterReportedMedication">
          <Field label="¿Actualmente toma medicamentos?" className="sm:col-span-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              {(["Sí", "No", "No sabe"] as MedsStatus[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (readOnly) return;
                    setForm((current) => ({
                      ...current,
                      currentMedsStatus: option,
                      reportedMeds:
                        option === "Sí" && current.reportedMeds.length === 0
                          ? [{ name: "", dose: "", frequency: "", route: "", indication: "", notes: "" }]
                          : current.reportedMeds,
                    }));
                    setDraftNotice("");
                    setSaveError("");
                  }}
                  className={`rounded-lg px-3 py-2 text-[13px] font-semibold ${
                    form.currentMedsStatus === option
                      ? "bg-[#0A3D49] text-white"
                      : "border border-slate-200 text-[#0A3D49]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </Field>
          {form.currentMedsStatus === "Sí"
            ? form.reportedMeds.map((med, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-2">
                  <Field label="Medicamento">
                    <input className={inputClass} value={med.name} onChange={(e) => updateMed(index, "name", e.target.value)} />
                  </Field>
                  <Field label="Dosis">
                    <input className={inputClass} value={med.dose} onChange={(e) => updateMed(index, "dose", e.target.value)} />
                  </Field>
                  <Field label="Frecuencia">
                    <input className={inputClass} value={med.frequency} onChange={(e) => updateMed(index, "frequency", e.target.value)} />
                  </Field>
                  <Field label="Vía" hint="Catálogo pendiente de validación">
                    <input className={inputClass} value={med.route} onChange={(e) => updateMed(index, "route", e.target.value)} />
                  </Field>
                  <Field label="Motivo / indicación">
                    <input className={inputClass} value={med.indication} onChange={(e) => updateMed(index, "indication", e.target.value)} />
                  </Field>
                  <Field label="Observaciones">
                    <input className={inputClass} value={med.notes} onChange={(e) => updateMed(index, "notes", e.target.value)} />
                  </Field>
                </div>
              ))
            : null}
        </Fold>

        <Fold title="6. Alergias" entity="PatientAllergy" defaultOpen={false}>
          <Field label="Alergias" hint="Campo de seguridad. Catálogo y severidad pendientes de validación." className="sm:col-span-2">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.allergies} onChange={(e) => update("allergies", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="7. Signos vitales" entity="EncounterClinical">
          <Field label="Presión arterial">
            <input className={inputClass} value={form.bp} onChange={(e) => update("bp", e.target.value)} />
          </Field>
          <Field label="Frecuencia cardíaca">
            <input className={inputClass} value={form.hr} onChange={(e) => update("hr", e.target.value)} />
          </Field>
          <Field label="Frecuencia respiratoria">
            <input className={inputClass} value={form.rr} onChange={(e) => update("rr", e.target.value)} />
          </Field>
          <Field label="Temperatura">
            <input className={inputClass} value={form.temperature} onChange={(e) => update("temperature", e.target.value)} />
          </Field>
          <Field label="Saturación de oxígeno">
            <input className={inputClass} value={form.spo2} onChange={(e) => update("spo2", e.target.value)} />
          </Field>
          <Field label="Peso">
            <input className={inputClass} value={form.weight} onChange={(e) => update("weight", e.target.value)} />
          </Field>
          <Field label="Talla">
            <input className={inputClass} value={form.height} onChange={(e) => update("height", e.target.value)} />
          </Field>
          <Field label="Otros" hint="Unidades y rangos pendientes de validación">
            <input className={inputClass} value={form.vitalsOther} onChange={(e) => update("vitalsOther", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="8. Examen físico" entity="EncounterClinical" defaultOpen={false}>
          <Field label="Examen físico" hint="Estructura por sistemas pendiente de validación clínica." className="sm:col-span-2">
            <textarea rows={5} className={`${inputClass} resize-y`} value={form.physicalExam} onChange={(e) => update("physicalExam", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="9. Impresión / evaluación clínica" entity="EncounterClinical">
          <Field label="Hallazgos" className="sm:col-span-2">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.findings} onChange={(e) => update("findings", e.target.value)} />
          </Field>
          <Field label="Diagnóstico o impresión diagnóstica" hint="Codificación CIE-10 no se asume. Pendiente de validar.">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.diagnosis} onChange={(e) => update("diagnosis", e.target.value)} />
          </Field>
          <Field label="Diagnósticos diferenciales" hint="Cuando corresponda">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.differentials} onChange={(e) => update("differentials", e.target.value)} />
          </Field>
          <Field label="Observaciones" className="sm:col-span-2">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.evaluationNotes} onChange={(e) => update("evaluationNotes", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="10. Plan y conducta" entity="EncounterClinical / EncounterPrescription">
          <Field label="Tratamiento">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.treatment} onChange={(e) => update("treatment", e.target.value)} />
          </Field>
          <Field label="Medicamentos formulados" hint="Distintos de los medicamentos actuales reportados">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.prescribedMeds} onChange={(e) => update("prescribedMeds", e.target.value)} />
          </Field>
          <Field label="Procedimientos realizados">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.proceduresDone} onChange={(e) => update("proceduresDone", e.target.value)} />
          </Field>
          <Field label="Recomendaciones">
            <textarea rows={3} className={`${inputClass} resize-y`} value={form.recommendations} onChange={(e) => update("recommendations", e.target.value)} />
          </Field>
          <Field label="Signos de alarma">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.alarmSigns} onChange={(e) => update("alarmSigns", e.target.value)} />
          </Field>
          <Field label="Seguimiento">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.followUp} onChange={(e) => update("followUp", e.target.value)} />
          </Field>
          <Field label="Remisión" hint="Cuando corresponda" className="sm:col-span-2">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.referral} onChange={(e) => update("referral", e.target.value)} />
          </Field>
        </Fold>

        <Fold title="11. Procedimiento" entity="EncounterProcedure">
          <div className="sm:col-span-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-900">
            Tipo actual: <strong>{form.attentionType}</strong>. Los campos
            específicos de este procedimiento están pendientes de definición y
            validación por el responsable clínico de AinovaHealth. No se
            incluyen protocolos médicos.
          </div>
          <Field
            label="Notas del procedimiento"
            hint="Campo reservado. No sustituye un protocolo validado."
            className="sm:col-span-2"
          >
            <textarea
              rows={4}
              className={`${inputClass} resize-y`}
              value={form.procedureNotes}
              onChange={(e) => update("procedureNotes", e.target.value)}
              placeholder="Pendiente de validación clínica"
            />
          </Field>
        </Fold>

        <Fold title="12. Cierre de la atención" entity="Encounter + EncounterIdentitySnapshot" defaultOpen={false}>
          <Field label="Profesional responsable">
            <input className={inputClass} value={form.closingProfessional} readOnly />
          </Field>
          <Field label="Fecha y hora de finalización" hint="La asigna el servidor al finalizar.">
            <input className={inputClass} value={form.finishedAt || "Se asignará al finalizar"} readOnly />
          </Field>
          <Field label="Observaciones" className="sm:col-span-2">
            <textarea rows={2} className={`${inputClass} resize-y`} value={form.closingNotes} onChange={(e) => update("closingNotes", e.target.value)} />
          </Field>
          <Field label="Estado de la atención">
            <input className={inputClass} value={statusLabel(status)} readOnly />
          </Field>
          <Field label="Firma / autenticación" hint="Pendiente de definir (D)">
            <input className={inputClass} value={form.signatureNote} readOnly />
          </Field>
        </Fold>

        </fieldset>
        {draftNotice ? (
          <p className="text-[13px] text-[#0A3D49]">{draftNotice}</p>
        ) : null}
        {saveError ? <p className="text-[13px] text-red-600">{saveError}</p> : null}
        {missingSections.length > 0 ? (
          <ul className="list-disc pl-5 text-[13px] text-red-600">
            {missingSections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ul>
        ) : null}
        {pdfError ? <p className="text-[13px] text-red-600">{pdfError}</p> : null}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row">
          {readOnly ? null : (
            <button
              type="button"
              onClick={handleDraft}
              disabled={saving}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-[14px] font-semibold text-[#0A3D49] disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar borrador"}
            </button>
          )}
          {pdfButton}
          {readOnly ? (
            <button
              type="button"
              onClick={() => setView("review")}
              className="rounded-lg bg-[#0A3D49] px-5 py-2.5 text-[14px] font-semibold text-white"
            >
              Ver atención finalizada
            </button>
          ) : (
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#0A3D49] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Revisar historia"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Header({
  status,
  age,
  name,
  displayCode,
  finalizedAtLabel,
  finalizedByName,
}: {
  status: EncounterStatus;
  age: string;
  name: string;
  displayCode: string;
  finalizedAtLabel: string | null;
  finalizedByName: string | null;
}) {
  return (
    <div className="border-b border-slate-200 pb-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#27B96D]">
            Encounter · {status}
          </p>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight text-[#0A3D49] lg:text-[30px]">
            Historia clínica
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            {name} · {age} · {displayCode}
          </p>
        </div>
        <span className="w-fit rounded-md bg-slate-100 px-3 py-1 text-[12px] font-semibold text-[#0A3D49]">
          Estado: {statusLabel(status)}
        </span>
      </div>
      {status === "finished" ? (
        <div className="mt-3 rounded-lg border border-[#D7EEE4] bg-[#ECFDF5] px-4 py-3 text-[13px] text-[#0A3D49]">
          <p className="font-bold uppercase tracking-wide">ATENCIÓN FINALIZADA</p>
          {finalizedAtLabel || finalizedByName ? (
            <p className="mt-1 text-slate-600">
              Finalizada el {finalizedAtLabel || "—"}
              {finalizedByName ? ` por ${finalizedByName}` : ""}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function FinalizeConfirm({
  busy,
  onCancel,
  onConfirm,
}: {
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A3D49]/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,.16)]">
        <h2 className="text-[20px] font-bold text-[#0A3D49]">¿Finalizar atención?</h2>
        <p className="mt-2 text-[14px] leading-6 text-slate-600">
          Una vez finalizada, la historia quedará cerrada y no podrá editarse
          mediante el flujo normal.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-[14px] font-semibold text-[#0A3D49] disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="rounded-lg bg-[#0A3D49] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Finalizando…" : "Finalizar atención"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 lg:p-5">
      <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#27B96D]">
        {title}
      </h2>
      {subtitle ? <p className="mt-1 text-[12px] text-slate-400">{subtitle}</p> : null}
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}
