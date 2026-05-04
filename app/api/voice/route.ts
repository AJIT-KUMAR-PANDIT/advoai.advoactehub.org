import { NextResponse } from "next/server";
import { synthesizeVoicePlaceholder, transcribeVoicePlaceholder } from "@/du/voice";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.action === "tts") {
    const result = await synthesizeVoicePlaceholder(body.text ?? "");
    return NextResponse.json(result);
  }

  const transcript = await transcribeVoicePlaceholder();
  return NextResponse.json({ transcript });
}
