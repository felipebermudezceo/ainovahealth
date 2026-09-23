"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});
  const [showPassword, setShowPassword] = useState(false);

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
          Acceso médico
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Inicia sesión con tu correo profesional para entrar al portal.
        </p>

        <form className="mt-8 space-y-4" action={formAction}>
          {state.error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </p>
          ) : null}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Correo electrónico
            </span>
            <input
              type="email"
              name="email"
              autoComplete="username"
              required
              placeholder="laura.c@example.net"
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Contraseña
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 pr-12 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-3 my-auto flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <div className="flex justify-end">
            <Link
              href="/portal/recuperar-contrasena"
              className="text-sm font-semibold text-[#19B858] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-full bg-gradient-to-b from-[#31DD6E] to-[#19B858] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,.28)] disabled:opacity-60"
          >
            {pending ? "Ingresando…" : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/portal/registro"
            className="font-semibold text-[#0A3D49] hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
