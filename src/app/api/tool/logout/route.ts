import { NextResponse } from "next/server";
import { TOOL_COOKIE_NAME } from "@/lib/tool-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(TOOL_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
