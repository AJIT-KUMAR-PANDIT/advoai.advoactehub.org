import { NextResponse } from "next/server";
import { forwardChatToDuck } from "@/du/chat";
import { ChatRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "messages are required" }, { status: 400 });
    }

    const content = await forwardChatToDuck(body);

    return NextResponse.json({
      message: {
        id: crypto.randomUUID(),
        role: "assistant",
        content,
        createdAt: new Date().toISOString()
      },
      modelId: body.modelId,
      promptId: body.promptId
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown chat error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
