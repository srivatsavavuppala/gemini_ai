import React from "react";

const InputContainer = ({ input, setInput, handleKeyPress, handleSpeechStart, handleSpeechEnd, listening, loading }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        className={`mic-button ${listening ? 'listening' : ''}`}
        onClick={listening ? handleSpeechEnd : handleSpeechStart}
      >
        {listening ? "⛔" : "🎙️"}
      </button>
    </div>
  );
};

export default InputContainer;
