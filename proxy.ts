import NextAuth from "next-auth";
import { NextResponse, type NextFetchEvent, type NextMiddleware, type NextRequest } from "next/server";
import { authConfig } from "@/lib/auth/config";
import { evaluateRequest } from "@/lib/security/anti-fraud";

const { auth } = NextAuth(authConfig);
const guard = auth as NextMiddleware;

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;

  // Ignorar peticiones a archivos internos de Next.js, imágenes y favicons
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1. Blindaje perimetral anti-fraude y detección de bots repetitivos
  const shield = evaluateRequest(request);
  if (!shield.allowed) {
    return new NextResponse("Acceso restringido temporalmente por seguridad.", {
      status: 429,
      headers: {
        "Retry-After": "60",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  // 2. Control de acceso para el portal médico
  if (pathname.startsWith("/portal")) {
    return guard(request, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
