"use client";

import { useState } from "react";
import { Mic, Square, Volume2 } from "lucide-react";
import { getSpeechRecognitionConstructor } from "@/lib/speech";

export function VoiceWorkspace() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [log, setLog] = useState<string[]>([
    "Voice mode keeps oral intake separate from the chat UI while still routing through the Duck.ai wrapper layer."
  ]);

  function toggleListening() {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      setStatus("Speech recognition unavailable");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => {
      setIsListening(true);
      setStatus("Listening");
    };
    recognition.onend = () => {
      setIsListening(false);
      setStatus("Ready");
    };
    recognition.onresult = (event) => {
      setLog((current) => [`You: ${event.results[0][0].transcript}`, ...current]);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setStatus("Voice capture failed");
    };
    recognition.start();
  }

  async function testTts() {
    const response = await fetch("/api/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "tts", text: "AdvoAI voice output is ready to connect." })
    });
    const payload = await response.json();
    setLog((current) => [`System: ${payload.status}`, ...current]);
  }

  return (
    <section className="workspace">
      <header className="workspace-header">
        <div className="title-block">
          <p className="eyebrow">Voice</p>
          <h2>Oral legal intake</h2>
          <p>Capture spoken facts, prepare transcripts, and connect STT or TTS providers through isolated voice config.</p>
        </div>
        <div className="controls">
          <button className="secondary-button" onClick={testTts} type="button">
            <Volume2 size={18} />
            Test TTS
          </button>
        </div>
      </header>

      <div className="voice-stage">
        <button
          className={`voice-orb ${isListening ? "listening" : ""}`}
          onClick={toggleListening}
          title={isListening ? "Stop" : "Start voice input"}
          type="button"
        >
          {isListening ? <Square size={42} /> : <Mic size={48} />}
        </button>
        <p className="status-line">{status}</p>
        <div className="voice-log">
          {log.map((item, index) => (
            <div className="log-item" key={`${item}-${index}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
