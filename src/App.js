import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import './css/App.css';

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
  const [stopButtonVisible, setStopButtonVisible] = useState(false);
  const chatWindowRef = useRef(null);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [timer, setTimer] = useState(null);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSend = useCallback(debounce(async (messageContent) => {
    if (!messageContent.trim() || messages.some(msg => msg.content === messageContent && msg.role === "user")) return;

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
    } finally {
      setLoading(false);
      setInput(""); 
      resetTranscript(); 
    }
  }, 500), [messages]);

  useEffect(() => {
    if (listening) {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        handleSpeechEnd();
      }, 3000);
      setTimer(newTimer);
    } else if (!listening && transcript.trim()) {
      handleSend(transcript);
    }
    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, [listening, transcript]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const animateTyping = (text) => {
    let i = 0;
    setDisplayText(" "); 
    setTyping(true);
  
    const typeNextCharacter = () => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
        requestAnimationFrame(() => {
          setTimeout(typeNextCharacter, 25);
        });
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
      setInput(""); 
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSpeechStart = () => {
    resetTranscript(); 
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleSpeechEnd = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    SpeechRecognition.stopListening();
    setStopButtonVisible(false);
    if (transcript.trim()) {
      handleSend(transcript);
    }
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
          stopButtonVisible={stopButtonVisible} // Pass stopButtonVisible state
        />
      </div>
    </div>
  );
}

export default App;
