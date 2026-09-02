import { NextRequest, NextResponse } from "next/server";

// Temporary site-wide password lock. Change these two values whenever you
// want to rotate the password, or delete this file entirely to make the
// site public again.
const SITE_USER = "visideax";
const SITE_PASS = "StMoritz2026!";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString();
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);
    if (user === SITE_USER && pass === SITE_PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="VisideaX", charset="UTF-8"' },
  });
}

export const config = {
  // Favicon/icon and standard crawler files stay public so browsers and
  // search engines can always fetch the site icon and metadata, even while
  // the rest of the site is password-locked.
  matcher:
    "/((?!_next/static|_next/image|icon\\.svg|favicon\\.ico|robots\\.txt|sitemap\\.xml|logo|images).*)",
};
