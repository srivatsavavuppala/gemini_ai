import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './App.css';
import BlinkingLight from "./widgets/BlinkingLight";
import ChatWindow from "./components/ChatWindow";
import InputContainer from "./components/InputContainer";
import DarkModeToggle from "./components/DarkModeToggle";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isApiActive, setIsApiActive] = useState(false);
  const chatWindowRef = useRef(null);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      handleSend(transcript);
    }
  }, [listening, transcript]);

  const handleSend = async (messageContent) => {
    if (!messageContent.trim()) return;

    const userMessage = { role: "user", content: messageContent };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);
    setTyping(true);
    setIsApiActive(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCMYGrnH7BFaJV5aKCELjj-t66cel8zLf4`,
        {
          contents: updatedMessages.map((msg) => ({
            parts: [{ text: msg.content }],
            role: msg.role
          }))
        }
      );

      const botResponse = response.data.candidates[0].content.parts[0].text;
      const botMessage = { role: "model", content: botResponse };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      animateTyping(botResponse);

      setIsApiActive(botResponse.trim().length > 0);
    } catch (error) {
      console.error("Error sending message:", error.response ? error.response.data : error.message);
      const errorMessage = {
        role: "model",
        content: "Sorry - Something went wrong. Please try again!"
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setTyping(false);
      setIsApiActive(false);
    }

    setLoading(false);
    setInput(""); // Clear the input text box
    resetTranscript(); // Clear the transcript data
  };

  const animateTyping = (text) => {
    let i = 0;
    setDisplayText(text.charAt(0)); 
    setTyping(true);

    const typeNextCharacter = () => {
      if (i < text.length - 1) {
        i++;
        setDisplayText((prev) => prev + text.charAt(i));
        setTimeout(typeNextCharacter, 25);
      } else {
        setTyping(false);
      }
    };

    typeNextCharacter();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSend(input);
      setInput(""); // Clear the input text box
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSpeechStart = () => {
    resetTranscript(); // Ensure transcript is reset when starting speech recognition
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleSpeechEnd = () => {
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <BlinkingLight isActive={isApiActive} color={isApiActive ? 'green' : 'red'} />
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="chat-container">
        <ChatWindow messages={messages} typing={typing} displayText={displayText} chatWindowRef={chatWindowRef} />
        <InputContainer
          input={input}
          setInput={setInput}
          handleKeyPress={handleKeyPress}
          handleSpeechStart={handleSpeechStart}
          handleSpeechEnd={handleSpeechEnd}
          listening={listening}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
