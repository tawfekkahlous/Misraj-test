import { useState, useEffect } from "react";

const useSpeechRecognition = (onResult, onError) => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Allows continuous recognition
    recognition.lang = "en-US";
    recognition.interimResults = true; // Necessary for real-time transcription

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      const isFinal = event.results[current].isFinal;
      onResult(transcript, isFinal);
    };

    recognition.onerror = (event) => {
      onError(event.error);
    };

    if (listening) {
      recognition.start();
    } else {
      recognition.abort(); // Changed from stop to abort to handle quick toggling
    }

    return () => recognition.abort();
  }, [listening, onResult, onError]);

  return {
    listening,
    start: () => setListening(true),
    stop: () => setListening(false),
  };
};

export default useSpeechRecognition;
