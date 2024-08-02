import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './App.css';
import BlinkingLight from "./widgets/BlinkingLight";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isApiActive, setIsApiActive] = useState(false);
  const chatWindowRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);
    setTyping(true);
    setIsApiActive(true)
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

      if(botResponse.trim().length>0){
        setIsApiActive(true);
      }
      else{
        setIsApiActive(false);
      }
    } catch (error) {
      console.error("Error sending message:", error.response ? error.response.data : error.message);
      const errorMessage = {
        role: "model",
        content: "Sorry - Something went wrong. Please try again!"
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setTyping(false);
      setIsApiActive(false)
    }
    // add a blinking green light to show the api is active if inactive show red light

    setLoading(false);
    setInput(""); 
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
      handleSend();
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

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <BlinkingLight isActive={isApiActive} color={isApiActive ? 'green' : 'red'}/>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "🥷" : "👨‍⚕️"}
      </button>
      
      <div className="chat-container">
        <div className="chat-window" ref={chatWindowRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}-message`}>
              {msg.role === "model" && index === messages.length - 1 && typing ? (
                <span>{displayText}
                <span className="cursor"></span>
                </span>
              ) : (
                <span>{msg.content}</span>
              )}
              <div className="subscript">
                {msg.role === "user" ? "User" : "Bot"}
              </div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            
            placeholder="Type your message..."
            disabled={loading} 
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
