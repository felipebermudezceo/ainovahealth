"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { isDemoMode } from "@/lib/auth/demo";

export async function logoutAction() {
  if (isDemoMode()) {
    redirect("/portal/login");
  }
  await signOut({ redirectTo: "/portal/login" });
}
