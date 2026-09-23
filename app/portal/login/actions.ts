"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Ingresa tu correo electrónico y tu contraseña." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/portal",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Correo o contraseña incorrectos." };
      }
      return {
        error:
          "No se pudo iniciar sesión. Verifica tus datos o intenta de nuevo.",
      };
    }
    throw error;
  }

  return {
    error: "No se pudo iniciar sesión. Verifica tus datos o intenta de nuevo.",
  };
}
