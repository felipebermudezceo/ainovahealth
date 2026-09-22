-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "EncounterStatus" AS ENUM ('draft', 'in_review', 'finished');

-- CreateEnum
CREATE TYPE "AttentionType" AS ENUM ('home_visit', 'ear_wash', 'suture');

-- CreateEnum
CREATE TYPE "ProcedureType" AS ENUM ('ear_wash', 'suture');

-- CreateEnum
CREATE TYPE "MedsStatus" AS ENUM ('yes', 'no', 'unknown');

-- CreateEnum
CREATE TYPE "OperationalStatus" AS ENUM ('active', 'follow_up', 'closed');

-- CreateEnum
CREATE TYPE "AntecedentType" AS ENUM ('personal', 'surgical', 'hospital', 'family', 'pharmacological', 'toxicological', 'gyneco', 'immunization');

-- CreateTable
CREATE TABLE "practitioners" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "license" TEXT NOT NULL,
    "city" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practitioners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "displayCode" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "sex" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "operationalStatus" "OperationalStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_contacts" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergency_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_antecedents" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "type" "AntecedentType" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_antecedents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_allergies" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounters" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "practitionerId" TEXT NOT NULL,
    "attendedOn" DATE NOT NULL,
    "attendedAtTime" TIME NOT NULL,
    "attentionType" "AttentionType" NOT NULL,
    "modality" TEXT,
    "attentionAddress" TEXT,
    "status" "EncounterStatus" NOT NULL DEFAULT 'draft',
    "currentMedsStatus" "MedsStatus",
    "finalizedAt" TIMESTAMP(3),
    "finalizedById" TEXT,
    "closingNotes" TEXT,
    "practitionerNameSnapshot" TEXT,
    "practitionerSpecialtySnapshot" TEXT,
    "practitionerLicenseSnapshot" TEXT,
    "practitionerEmailSnapshot" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encounters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounter_clinical" (
    "id" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "reason" TEXT,
    "illnessOnset" TEXT,
    "illnessEvolution" TEXT,
    "associatedSymptoms" TEXT,
    "previousTreatments" TEXT,
    "illnessNotes" TEXT,
    "bp" TEXT,
    "hr" TEXT,
    "rr" TEXT,
    "temperature" TEXT,
    "spo2" TEXT,
    "weight" TEXT,
    "height" TEXT,
    "vitalsOther" TEXT,
    "physicalExam" TEXT,
    "findings" TEXT,
    "diagnosis" TEXT,
    "differentials" TEXT,
    "evaluationNotes" TEXT,
    "treatment" TEXT,
    "proceduresDone" TEXT,
    "recommendations" TEXT,
    "alarmSigns" TEXT,
    "followUp" TEXT,
    "referral" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encounter_clinical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounter_reported_medications" (
    "id" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dose" TEXT,
    "frequency" TEXT,
    "route" TEXT,
    "indication" TEXT,
    "notes" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encounter_reported_medications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounter_prescriptions" (
    "id" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "prescribedText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encounter_prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounter_procedures" (
    "id" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "kind" "ProcedureType" NOT NULL,
    "notes" TEXT,
    "clinicalSchemaPending" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encounter_procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounter_identity_snapshots" (
    "id" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "patientDisplayCode" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "ageAtEncounter" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "emergencyName" TEXT,
    "emergencyRelation" TEXT,
    "emergencyPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "encounter_identity_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "encounter_chart_snapshots" (
    "id" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "antPersonal" TEXT,
    "antSurgical" TEXT,
    "antHospital" TEXT,
    "antFamily" TEXT,
    "antPharmacological" TEXT,
    "antToxicological" TEXT,
    "antGyneco" TEXT,
    "antImmunization" TEXT,
    "allergies" TEXT,
    "currentMedsStatus" "MedsStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "encounter_chart_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "practitioners_email_key" ON "practitioners"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patients_displayCode_key" ON "patients"("displayCode");

-- CreateIndex
CREATE INDEX "patients_fullName_idx" ON "patients"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "patients_documentType_documentNumber_key" ON "patients"("documentType", "documentNumber");

-- CreateIndex
CREATE INDEX "emergency_contacts_patientId_idx" ON "emergency_contacts"("patientId");

-- CreateIndex
CREATE INDEX "patient_antecedents_patientId_type_idx" ON "patient_antecedents"("patientId", "type");

-- CreateIndex
CREATE INDEX "patient_allergies_patientId_idx" ON "patient_allergies"("patientId");

-- CreateIndex
CREATE INDEX "encounters_patientId_attendedOn_idx" ON "encounters"("patientId", "attendedOn");

-- CreateIndex
CREATE INDEX "encounters_practitionerId_idx" ON "encounters"("practitionerId");

-- CreateIndex
CREATE INDEX "encounters_status_idx" ON "encounters"("status");

-- CreateIndex
CREATE INDEX "encounters_finalizedById_idx" ON "encounters"("finalizedById");

-- CreateIndex
CREATE UNIQUE INDEX "encounter_clinical_encounterId_key" ON "encounter_clinical"("encounterId");

-- CreateIndex
CREATE INDEX "encounter_reported_medications_encounterId_idx" ON "encounter_reported_medications"("encounterId");

-- CreateIndex
CREATE UNIQUE INDEX "encounter_prescriptions_encounterId_key" ON "encounter_prescriptions"("encounterId");

-- CreateIndex
CREATE UNIQUE INDEX "encounter_procedures_encounterId_key" ON "encounter_procedures"("encounterId");

-- CreateIndex
CREATE UNIQUE INDEX "encounter_identity_snapshots_encounterId_key" ON "encounter_identity_snapshots"("encounterId");

-- CreateIndex
CREATE UNIQUE INDEX "encounter_chart_snapshots_encounterId_key" ON "encounter_chart_snapshots"("encounterId");

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_antecedents" ADD CONSTRAINT "patient_antecedents_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_allergies" ADD CONSTRAINT "patient_allergies_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounters" ADD CONSTRAINT "encounters_finalizedById_fkey" FOREIGN KEY ("finalizedById") REFERENCES "practitioners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounter_clinical" ADD CONSTRAINT "encounter_clinical_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "encounters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounter_reported_medications" ADD CONSTRAINT "encounter_reported_medications_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "encounters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounter_prescriptions" ADD CONSTRAINT "encounter_prescriptions_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "encounters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounter_procedures" ADD CONSTRAINT "encounter_procedures_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "encounters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounter_identity_snapshots" ADD CONSTRAINT "encounter_identity_snapshots_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "encounters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encounter_chart_snapshots" ADD CONSTRAINT "encounter_chart_snapshots_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "encounters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
