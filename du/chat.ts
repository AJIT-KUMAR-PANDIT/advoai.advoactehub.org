import { ChatMessage, ChatRequest } from "@/lib/types";
import { getDuckModel } from "@/du/models";

type DuckWireMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function forwardChatToDuck(request: ChatRequest) {
  const endpoint = process.env.DUCK_AI_BASE_URL;
  const apiKey = process.env.DUCK_AI_API_KEY;

  if (endpoint && apiKey) {
    const response = await fetch(`${endpoint.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: request.modelId,
        messages: request.messages.map(toDuckWireMessage),
        metadata: {
          promptId: request.promptId,
          mode: request.mode,
          sessionId: request.sessionId
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Duck.ai request failed with ${response.status}`);
    }

    const payload = (await response.json()) as {
      content?: string;
      message?: { content?: string };
      choices?: Array<{ message?: { content?: string } }>;
    };

    return (
      payload.content ??
      payload.message?.content ??
      payload.choices?.[0]?.message?.content ??
      "Duck.ai returned an empty response."
    );
  }

  return buildLocalLegalResponse(request);
}

function toDuckWireMessage(message: ChatMessage): DuckWireMessage {
  return {
    role: message.role,
    content: message.content
  };
}

function buildLocalLegalResponse(request: ChatRequest) {
  const lastUserMessage = [...request.messages].reverse().find((message) => message.role === "user");
  const model = getDuckModel(request.modelId);
  const query = lastUserMessage?.content.trim() || "the matter";
  const modeLabel = request.mode.replace("-", " ");

  return [
    `I am running in local AdvoAI starter mode using ${model.label}.`,
    "",
    `For ${modeLabel}, I would treat this as: ${query}`,
    "",
    "Initial legal workflow:",
    "1. Identify the jurisdiction, parties, dates, and document trail.",
    "2. Separate confirmed facts from assumptions and missing evidence.",
    "3. Choose the right output: advice note, notice, agreement, pleading outline, or research memo.",
    "4. Draft with defined remedies, deadlines, obligations, and fallback positions.",
    "",
    "Connect DUCK_AI_BASE_URL and DUCK_AI_API_KEY to replace this mocked response with Duck.ai."
  ].join("\n");
}
