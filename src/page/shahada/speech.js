export const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
};

const shahada = [
  "I bear witness that there is no God but Allah",
  "And I bear witness that is Muhammad is the messenger of God",
];
