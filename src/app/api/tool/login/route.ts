import { NextRequest, NextResponse } from "next/server";
import { TOOL_EMAIL, TOOL_PASSWORD, TOOL_COOKIE_NAME, TOOL_COOKIE_VALUE } from "@/lib/tool-auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";

  if (email !== TOOL_EMAIL.toLowerCase() || password !== TOOL_PASSWORD) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(TOOL_COOKIE_NAME, TOOL_COOKIE_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
