import { useState, useRef, useEffect } from "react";
import listen from "../../assets/listening.png";
import talk from "../../assets/talk.png";
import wrong from "../../assets/wrong.png";
import active from "../../assets/active.png";
// Import audio files
import EnglishPartOne from "../../assets/english-part-one.mp3";
import EnglishPartTwo from "../../assets/english-part-tow.mp3";
import { Link } from "react-router-dom";

const Shahada = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const [partIndex, setPartIndex] = useState(0);
  const [highlightedText, setHighlightedText] = useState([]);
  const [imageStatus, setImageStatus] = useState("listen");

  const audioFiles = [EnglishPartOne, EnglishPartTwo];
  const shahada = [
    "I bear witness that there is no God but Allah",
    "And I bear witness that is Muhammad is the messenger of God",
  ];

  const audioRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const transcriptRef = useRef(""); // Ref to keep the latest transcript

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Stop after a sentence
      recognitionRef.current.interimResults = true;

      // Setting up the onresult event to update the transcript correctly
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          finalTranscript += event.results[i][0].transcript;
        }
        console.log({ finalTranscript }); // Debug: log the recognized speech
        setTranscript(finalTranscript); // Set the final transcript after speech is recognized
        transcriptRef.current = finalTranscript; // Update the ref

        realTimeCompareTranscript(finalTranscript, shahada[partIndex]);

        // Reset the silence timeout whenever a new result is received
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }
        silenceTimeoutRef.current = setTimeout(() => {
          recognitionRef.current.stop(); // Stop recognition if silence detected
          validateTranscript(transcriptRef.current); // Pass the latest transcript
        }, 3000); // 3 seconds of silence indicates stop in speech
      };

      recognitionRef.current.onend = () => {
        setListening(false); // Stop listening when speech recognition ends
      };

      recognitionRef.current.onerror = (event) => {
        setError(event.error);
      };
    } else {
      setError("Speech Recognition is not supported in this browser.");
    }
  }, []);

  const handleStartStopClick = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      clearTimeout(silenceTimeoutRef.current);
    } else {
      setTranscript(""); // Reset transcript before starting to listen
      setHighlightedText([]); // Reset highlighted text before starting to listen
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const handleAudioEnd = () => {
    setListening(true);
    setTranscript(""); // Reset transcript before starting to listen
    recognitionRef.current.start();
  };

  const handleAudioPlay = () => {
    setListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const realTimeCompareTranscript = (userTranscript, shahadaText) => {
    const userWords = userTranscript.trim().split(" ");
    const shahadaWords = shahadaText.split(" ");

    const highlighted = shahadaWords.map((word, index) => {
      const userWord = userWords[index];
      if (userWord && userWord.toLowerCase() === word.toLowerCase()) {
        return { text: userWord, correct: true };
      } else {
        return { text: userWord || "", correct: false };
      }
    });

    setHighlightedText(highlighted);
  };

  const calculateMatchPercentage = (inputText, targetText) => {
    console.log({ inputText });
    console.log({ targetText });
    const inputWords = inputText.toLowerCase().trim().split(" ");
    const targetWords = targetText.toLowerCase().trim().split(" ");
    const matches = inputWords.filter((word) =>
      targetWords.includes(word)
    ).length;
    console.log({ matches });
    return (matches / targetWords.length) * 100;
  };

  const validateTranscript = (currentTranscript) => {
    const matchPercentage = calculateMatchPercentage(
      currentTranscript,
      shahada[partIndex] // Ensure this uses the current partIndex
    );
    const requiredMatchPercentage = 70;
    console.log({ matchPercentage });
    console.log({ requiredMatchPercentage });

    if (matchPercentage >= requiredMatchPercentage) {
      if (partIndex < shahada.length - 1) {
        // Move to the next part
        setPartIndex((prevPartIndex) => {
          const newIndex = prevPartIndex + 1;
          setTranscript(""); // Reset transcript for the next part
          setHighlightedText([]); // Reset highlighted text
          setTimeout(() => {
            audioRef.current.src = audioFiles[newIndex];
            audioRef.current.play();
          }, 1000);
          return newIndex;
        });
      } else {
        // If the user has completed all parts
        setImageStatus("done");
        // alert("Congratulations! You have completed the Shahada.");
      }
    } else {
      // If the current part is incorrect, reset to the current part's audio
      setTimeout(() => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setTranscript(""); // Reset transcript for retry
        setHighlightedText([]); // Reset highlighted text
        setImageStatus("wrong");
      }, 1000);
    }
  };

  useEffect(() => {
    if (transcript.trim()) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = setTimeout(() => {
        recognitionRef.current?.stop();
        validateTranscript(transcript); // Pass the latest transcript value directly
      }, 3000); // 3 seconds of silence triggers validation
    }
  }, [transcript]);

  // React to changes in partIndex to load the correct audio file
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioFiles[partIndex]; // Set the source to the current part's audio
    }
  }, [partIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd);
      audioRef.current.addEventListener("play", handleAudioPlay);

      return () => {
        audioRef.current.removeEventListener("ended", handleAudioEnd);
        audioRef.current.removeEventListener("play", handleAudioPlay);
      };
    }
  }, [partIndex]);

  return (
    <div className="text-center ">
      <h1 className="text-slate-800 dark:text-white md:text-[50px] text-[30px] ">
        SHAHADA
      </h1>
      <p className="text-slate-800 dark:text-white mb-[50px] md:text-[30px] text-[22px]">
        Your first step on your path to Islam.
      </p>
      <div>
        {highlightedText.map((wordObj, index) => (
          <span key={index} className="text-slate-800 dark:text-white">
            {wordObj.text}{" "}
          </span>
        ))}
      </div>
      {listening ? (
        <div className="flex justify-center items-center">
          <img className="w-[200px] md:w-[300px]" src={talk} alt="talk" />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {imageStatus === "listen" ? (
            <div>
              <img
                className="w-[200px] md:w-[300px]"
                src={listen}
                alt="listening"
              />
            </div>
          ) : imageStatus === "done" ? (
            <img className="w-[200px] md:w-[300px]" src={active} alt="active" />
          ) : imageStatus === "wrong" ? (
            <img className="w-[200px] md:w-[300px]" src={wrong} alt="active" />
          ) : (
            <img
              className="w-[200px] md:w-[300px]"
              src={listen}
              alt="listening"
            />
          )}
        </div>
      )}

      <div>
        {imageStatus === "done" ? (
          <div>
            <p className="text-slate-800 dark:text-white mb-[50px] md:text-[30px] text-[22px]">
              Shahada in Arabic
            </p>
            <Link to="/shahada-arabic">
              <button className="px-[30px] py-[5px] md:px-[50px]  border-[2px] border-slate-800 dark:border-white text-slate-800 dark:text-white rounded-md ">
                contune
              </button>
            </Link>
          </div>
        ) : (
          <button
            onClick={handleStartStopClick}
            className="px-[30px] py-[5px] md:px-[50px]  border-[2px] border-slate-800 dark:border-white text-slate-800 dark:text-white rounded-md "
          >
            {listening ? "Stop Listening" : "Start Listening"}
          </button>
        )}
      </div>
      {/* <button
        onClick={handleStartStopClick}
        className="px-[30px] py-[5px] md:px-[50px]  border-[2px] border-slate-800 dark:border-white text-slate-800 dark:text-white rounded-md "
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button> */}
      {error && <p className="text-[red] my-2 text-[18px]">Error: {error}</p>}
      <audio ref={audioRef} src={audioFiles[partIndex]} />
    </div>
  );
};

export default Shahada;
