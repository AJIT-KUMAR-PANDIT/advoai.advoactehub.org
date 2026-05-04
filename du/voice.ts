export async function transcribeVoicePlaceholder() {
  return "Voice transcription is ready to connect. Configure your STT provider in voice.env.";
}

export async function synthesizeVoicePlaceholder(text: string) {
  return {
    text,
    audioUrl: null,
    status: "TTS provider not configured"
  };
}
