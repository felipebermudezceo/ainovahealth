"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { recoverPasswordAction } from "./actions";

export function RecoverForm() {
  const [state, formAction, pending] = useActionState(
    recoverPasswordAction,
    {},
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4FBF8] px-4 py-10 text-[#0A3D49]">
      <div className="w-full max-w-[440px] rounded-[28px] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,.08)] ring-1 ring-slate-100">
        <Image
          src="/images/logoAinovaHealth.png"
          alt="AinovaHealth"
          width={150}
          height={40}
          className="h-10 w-auto"
        />

        <h1 className="mt-6 text-[28px] font-black tracking-tight">
          Recuperar contraseña
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Ingresa tu correo profesional. Si está registrado, te enviaremos
          instrucciones para crear una nueva contraseña.
        </p>

        <form className="mt-8 space-y-4" action={formAction}>
          {state.error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </p>
          ) : null}

          {state.submitted ? (
            <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              {state.message}
            </p>
          ) : null}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Correo electrónico
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-full bg-gradient-to-b from-[#31DD6E] to-[#19B858] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,.28)] disabled:opacity-60"
          >
            {pending ? "Enviando…" : "Enviar instrucciones"}
          </button>
        </form>

        <p className="mt-6 rounded-2xl bg-[#F4FBF8] px-4 py-3 text-xs leading-5 text-slate-500">
          Falta configurar el servicio de correo para completar este flujo. La
          contraseña actual no se puede consultar ni recuperar: solo se puede
          reemplazar por una nueva.
        </p>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link
            href="/portal/login"
            className="font-semibold text-[#0A3D49] hover:underline"
          >
            Volver a iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
