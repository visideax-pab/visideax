import { NextRequest, NextResponse } from "next/server";
import { TOOL_COOKIE_NAME, TOOL_COOKIE_VALUE } from "@/lib/tool-auth";

// The site itself is now public. Only the client-only feasibility tool
// (/tool) stays gated behind its own separate login — see
// src/app/api/tool/login and src/lib/tool-auth.ts.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isToolArea = pathname.startsWith("/tool") || pathname.startsWith("/api/tool/generate");
  const isToolLogin = pathname === "/tool/login" || pathname === "/api/tool/login";

  if (isToolArea && !isToolLogin) {
    const hasToolSession = req.cookies.get(TOOL_COOKIE_NAME)?.value === TOOL_COOKIE_VALUE;
    if (!hasToolSession) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
      const loginUrl = new URL("/tool/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
