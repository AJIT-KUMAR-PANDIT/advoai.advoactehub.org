import { NextResponse } from "next/server";
import { getSession, listSessions, upsertSession } from "@/du/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("id");

  if (sessionId) {
    const session = getSession(sessionId);
    return session
      ? NextResponse.json({ session })
      : NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({ sessions: listSessions() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const session = upsertSession({
    id: body.id ?? crypto.randomUUID(),
    title: body.title ?? "Untitled legal chat",
    messages: body.messages ?? [],
    updatedAt: new Date().toISOString()
  });

  return NextResponse.json({ session });
}
