import { ChatMessage } from "@/lib/types";

export type SessionRecord = {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
};

const sessions = new Map<string, SessionRecord>();

export function listSessions() {
  return Array.from(sessions.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function upsertSession(session: SessionRecord) {
  sessions.set(session.id, session);
  return session;
}

export function getSession(sessionId: string) {
  return sessions.get(sessionId);
}
