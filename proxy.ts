import NextAuth from "next-auth";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { authConfig } from "@/lib/auth/config";

const { auth } = NextAuth(authConfig);
const guard = auth as NextMiddleware;

export function proxy(request: NextRequest, event: NextFetchEvent) {
  return guard(request, event);
}

export const config = {
  matcher: ["/portal", "/portal/:path*"],
};
