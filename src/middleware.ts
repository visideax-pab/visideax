import { NextRequest, NextResponse } from "next/server";
import { TOOL_COOKIE_NAME, TOOL_COOKIE_VALUE } from "@/lib/tool-auth";

// Temporary site-wide password lock. Change these two values whenever you
// want to rotate the password, or delete this file entirely to make the
// site public again.
const SITE_USER = "visideax";
const SITE_PASS = "StMoritz2026!";

function checkBasicAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;
  const decoded = Buffer.from(auth.slice(6), "base64").toString();
  const separatorIndex = decoded.indexOf(":");
  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);
  return user === SITE_USER && pass === SITE_PASS;
}

export function middleware(req: NextRequest) {
  if (!checkBasicAuth(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="VisideaX", charset="UTF-8"' },
    });
  }

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
  // Favicon/icon and standard crawler files stay public so browsers and
  // search engines can always fetch the site icon and metadata, even while
  // the rest of the site is password-locked.
  matcher:
    "/((?!_next/static|_next/image|icon\\.(?:svg|png|ico)|apple-icon\\.png|favicon\\.ico|robots\\.txt|sitemap\\.xml|logo|images).*)",
};
