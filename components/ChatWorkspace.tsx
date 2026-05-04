"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bot, Gavel, Mic, Scale, Search, Send, Sparkles, Wand2 } from "lucide-react";
import { duckModels } from "@/du/models";
import { getSpeechRecognitionConstructor } from "@/lib/speech";
import { ChatMessage, LegalMode } from "@/lib/types";

const modes: Array<{ id: LegalMode; label: string }> = [
  { id: "consultation", label: "Consultation" },
  { id: "drafting", label: "Drafting" },
  { id: "case-analysis", label: "Case analysis" },
  { id: "research", label: "Research" }
];

const prompts = [
  { id: "legal_assistant", label: "Legal assistant" },
  { id: "drafting_expert", label: "Drafting expert" },
  { id: "case_analyst", label: "Case analyst" },
  { id: "research_counsel", label: "Research counsel" }
];

const starterMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Welcome to AdvoAI. Share the legal issue, jurisdiction, parties, and desired output. I can help structure advice, draft documents, analyze case facts, or prepare research notes.",
    createdAt: new Date().toISOString()
  }
];

export function ChatWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<LegalMode>("consultation");
  const [modelId, setModelId] = useState(duckModels[0].id);
  const [promptId, setPromptId] = useState(prompts[0].id);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    function resetChat(event: Event) {
      const title = (event as CustomEvent<{ title?: string }>).detail?.title;
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: title
            ? `Ready to continue with ${title}. Share the latest facts or the document you want to prepare.`
            : starterMessages[0].content,
          createdAt: new Date().toISOString()
        }
      ]);
      setInput("");
      setStatus("New chat ready");
    }

    window.addEventListener("advoai:new-chat", resetChat);
    return () => window.removeEventListener("advoai:new-chat", resetChat);
  }, []);

  const selectedModeIcon = useMemo(() => {
    if (mode === "drafting") return Wand2;
    if (mode === "case-analysis") return Gavel;
    if (mode === "research") return Search;
    return Scale;
  }, [mode]);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isSending) return;

    const outgoing: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString()
    };

    const nextMessages = [...messages, outgoing];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    setStatus("Drafting response");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          modelId,
          promptId,
          mode
        })
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const payload = await response.json();
      setMessages((current) => [...current, payload.message]);
      setStatus("Ready");
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I could not reach the chat route. Check the server logs or Duck.ai configuration.",
          createdAt: new Date().toISOString()
        }
      ]);
      setStatus("Needs attention");
    } finally {
      setIsSending(false);
    }
  }

  function startVoiceInput() {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      setStatus("Voice input is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setStatus("Voice captured");
    };
    recognition.onerror = () => setStatus("Voice capture failed");
    recognition.start();
    setStatus("Listening");
  }

  const ModeIcon = selectedModeIcon;

  return (
    <section className="workspace">
      <header className="workspace-header">
        <div className="title-block">
          <p className="eyebrow">Duck.ai wrapper</p>
          <h2>Legal chat</h2>
          <p>Switch legal modes, prompts, and Duck.ai models without coupling the UI to provider logic.</p>
        </div>
        <div className="controls">
          <select className="select" value={promptId} onChange={(event) => setPromptId(event.target.value)}>
            {prompts.map((prompt) => (
              <option key={prompt.id} value={prompt.id}>
                {prompt.label}
              </option>
            ))}
          </select>
          <select className="select" value={modelId} onChange={(event) => setModelId(event.target.value)}>
            {duckModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="conversation" aria-live="polite">
        {messages.map((message) => (
          <article className={`message ${message.role}`} key={message.id}>
            <div className="message-meta">
              {message.role === "assistant" ? <Bot size={15} /> : <Scale size={15} />}
              {message.role === "assistant" ? "AdvoAI" : "You"}
            </div>
            <div className="bubble">{message.content}</div>
          </article>
        ))}
      </div>

      <form className="composer" onSubmit={submitMessage}>
        <div className="mode-tabs" role="tablist" aria-label="Legal mode">
          {modes.map((item) => (
            <button
              className={`mode-button ${mode === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => setMode(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="composer-box">
          <textarea
            className="textarea"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe the matter, jurisdiction, facts, and desired legal output."
            value={input}
          />
          <div className="toolbar-group">
            <button className="icon-button" onClick={startVoiceInput} title="Voice input" type="button">
              <Mic size={18} />
            </button>
            <button className="primary-button" disabled={isSending} type="submit">
              <Send size={18} />
              Send
            </button>
          </div>
        </div>
        <p className="status-line">
          <ModeIcon size={14} /> {status || "Ready"} <Sparkles size={14} />
        </p>
      </form>
    </section>
  );
}
