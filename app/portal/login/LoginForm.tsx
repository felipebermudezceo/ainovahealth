"use client";

import Image from "next/image";
import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4FBF8] px-4 py-10 text-[#0A3D49]">
      <div className="w-full max-w-[420px] rounded-[28px] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,.08)] ring-1 ring-slate-100">
        <Image
          src="/images/logoAinovaHealth.png"
          alt="AinovaHealth"
          width={150}
          height={40}
          className="h-10 w-auto"
        />

        <h1 className="mt-6 text-[28px] font-black tracking-tight">
          Acceso médico
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Ingresa con el correo y la contraseña de tu cuenta profesional.
        </p>

        <form className="mt-8 space-y-4" action={formAction}>
          {state.error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </p>
          ) : null}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Correo</span>
            <input
              type="email"
              name="email"
              autoComplete="username"
              required
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Contraseña</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-full bg-gradient-to-b from-[#31DD6E] to-[#19B858] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,.28)] disabled:opacity-60"
          >
            {pending ? "Ingresando…" : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
