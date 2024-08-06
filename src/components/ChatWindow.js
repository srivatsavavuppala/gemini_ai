import React from "react";

const ChatWindow = ({ messages, typing, displayText, chatWindowRef }) => {
  return (
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
  );
};

export default ChatWindow;
