"use server";

export type RecoverState = {
  error?: string;
  submitted?: boolean;
  message?: string;
};

function required(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function recoverPasswordAction(
  _prev: RecoverState,
  formData: FormData,
): Promise<RecoverState> {
  const email = required(formData.get("email")).toLowerCase();

  if (!email || !isValidEmail(email)) {
    return { error: "Ingresa un correo electrónico válido." };
  }

  // Pendiente de infraestructura de correo (Resend, SES u otro proveedor).
  // Cuando exista:
  // 1. Buscar practitioner por email, sin revelar si existe.
  // 2. Si está activo, generar un token de un solo uso con vencimiento.
  // 3. Enviar un enlace de restablecimiento. Nunca devolver ni guardar
  //    la contraseña actual: solo se puede reemplazar con un hash nuevo.
  // Hoy no hay envío de correo ni campo de token en el modelo.

  return {
    submitted: true,
    message:
      "Si ese correo está registrado, te enviaremos las instrucciones. El envío de correo aún no está configurado en este entorno.",
  };
}
