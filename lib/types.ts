export type ChatRole = "user" | "assistant" | "system";

export type LegalMode = "consultation" | "drafting" | "case-analysis" | "research";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
  modelId: string;
  promptId: string;
  mode: LegalMode;
  sessionId?: string;
};

export type ChatResponse = {
  message: ChatMessage;
  modelId: string;
  promptId: string;
};
