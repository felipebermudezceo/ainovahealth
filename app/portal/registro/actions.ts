"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { hashPassword } from "@/lib/auth/password";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { isPrismaUniqueConflict, prisma } from "@/lib/db/prisma";

export type RegisterState = {
  error?: string;
};

function required(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const fullName = required(formData.get("fullName"));
  const specialty = required(formData.get("specialty"));
  const email = required(formData.get("email")).toLowerCase();
  const license = required(formData.get("license"));
  const phone = required(formData.get("phone"));
  const city = required(formData.get("city"));
  const password = typeof formData.get("password") === "string"
    ? String(formData.get("password"))
    : "";
  const confirmPassword = typeof formData.get("confirmPassword") === "string"
    ? String(formData.get("confirmPassword"))
    : "";

  if (!fullName || !specialty || !email || !license || !password) {
    return { error: "Completa los campos obligatorios para crear tu cuenta." };
  }

  if (!isValidEmail(email)) {
    return { error: "Ingresa un correo electrónico válido." };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      error: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
    };
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }

  try {
    await prisma.practitioner.create({
      data: {
        fullName,
        specialty,
        email,
        license,
        phone: phone || null,
        city: city || null,
        isActive: true,
        passwordHash: await hashPassword(password),
      },
    });
  } catch (error) {
    if (isPrismaUniqueConflict(error)) {
      return { error: "Ya existe una cuenta con ese correo electrónico." };
    }
    return { error: "No se pudo crear la cuenta. Intenta de nuevo." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/portal",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          "La cuenta se creó, pero no se pudo iniciar sesión. Intenta entrar desde Acceso médico.",
      };
    }
    throw error;
  }

  return {
    error:
      "La cuenta se creó, pero no se pudo iniciar sesión. Intenta entrar desde Acceso médico.",
  };
}
