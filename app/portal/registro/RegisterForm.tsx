"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { registerAction } from "./actions";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, {});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4FBF8] px-4 py-10 text-[#0A3D49]">
      <div className="w-full max-w-[520px] rounded-[28px] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,.08)] ring-1 ring-slate-100">
        <Image
          src="/images/logoAinovaHealth.png"
          alt="AinovaHealth"
          width={150}
          height={40}
          className="h-10 w-auto"
        />

        <h1 className="mt-6 text-[28px] font-black tracking-tight">
          Crear cuenta
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Registro para médicos y practicantes de AinovaHealth.
        </p>

        <form className="mt-8 space-y-4" action={formAction}>
          {state.error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </p>
          ) : null}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Nombre completo
            </span>
            <input
              type="text"
              name="fullName"
              required
              autoComplete="name"
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Especialidad
            </span>
            <input
              type="text"
              name="specialty"
              required
              placeholder="Medicina General"
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
          </label>

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

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Registro médico / licencia
            </span>
            <input
              type="text"
              name="license"
              required
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">
                Teléfono
              </span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">
                Ciudad
              </span>
              <input
                type="text"
                name="city"
                autoComplete="address-level2"
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 text-[15px] outline-none ring-[#25D366] placeholder:text-slate-400 focus:ring-2"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Contraseña
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 pr-12 text-[15px] outline-none ring-[#25D366] focus:ring-2"
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
            <span className="mt-1 block text-xs text-slate-400">
              Mínimo {MIN_PASSWORD_LENGTH} caracteres. Se guarda cifrada.
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">
              Confirmar contraseña
            </span>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                required
                minLength={MIN_PASSWORD_LENGTH}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FBFA] px-4 py-3 pr-12 text-[15px] outline-none ring-[#25D366] focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((value) => !value)}
                className="absolute inset-y-0 right-3 my-auto flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label={
                  showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-full bg-gradient-to-b from-[#31DD6E] to-[#19B858] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,.28)] disabled:opacity-60"
          >
            {pending ? "Creando cuenta…" : "Registrarse"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/portal/login"
            className="font-semibold text-[#0A3D49] hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
