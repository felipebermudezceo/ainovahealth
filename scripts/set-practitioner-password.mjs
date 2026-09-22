import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Algorithm, hash } from "@node-rs/argon2";

const email = process.env.PRACTITIONER_EMAIL?.trim().toLowerCase() ?? "";
const password = process.env.PRACTITIONER_PASSWORD ?? "";
const fullName = process.env.PRACTITIONER_FULL_NAME?.trim() ?? "";
const specialty = process.env.PRACTITIONER_SPECIALTY?.trim() ?? "";
const license = process.env.PRACTITIONER_LICENSE?.trim() ?? "";

if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL.");
  process.exit(1);
}

if (!email || !password) {
  console.error(
    "Define PRACTITIONER_EMAIL y PRACTITIONER_PASSWORD en el entorno.",
  );
  console.error(
    "Ejemplo: PRACTITIONER_EMAIL=tu@correo PRACTITIONER_PASSWORD=*** npm run practitioner:password",
  );
  process.exit(1);
}

if (password.length < 12) {
  console.error("La contraseña debe tener al menos 12 caracteres.");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const passwordHash = await hash(password, {
  algorithm: Algorithm.Argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
});

try {
  const existing = await prisma.practitioner.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    await prisma.practitioner.update({
      where: { id: existing.id },
      data: { passwordHash },
    });
    console.log("Contraseña actualizada para el Practitioner existente.");
  } else if (fullName && specialty && license) {
    await prisma.practitioner.create({
      data: {
        email,
        fullName,
        specialty,
        license,
        isActive: true,
        passwordHash,
      },
    });
    console.log("Practitioner creado y contraseña establecida.");
  } else {
    console.error(
      "No existe un Practitioner con ese correo. Para crearlo, define también PRACTITIONER_FULL_NAME, PRACTITIONER_SPECIALTY y PRACTITIONER_LICENSE.",
    );
    process.exit(1);
  }
} finally {
  await prisma.$disconnect();
}
