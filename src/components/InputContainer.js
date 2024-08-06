import React from 'react';
import '../css/InputContainer.css'; // Assuming InputContainer.js is in src/components
// Add this if you have a separate CSS file

const InputContainer = ({
  input,
  setInput,
  handleKeyPress,
  handleSpeechStart,
  handleSpeechEnd,
  listening,
  loading,
}) => {
  const isInputEmpty = input.trim() === "";

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        className={`mic-button ${listening ? 'listening' : ''} ${isInputEmpty ? '' : 'disabled'}`}
        onClick={isInputEmpty ? (listening ? handleSpeechEnd : handleSpeechStart) : undefined}
        disabled={!isInputEmpty}
      >
        {listening ? "⛔" : "🎙️"}
      </button>
    </div>
  );
};

export default InputContainer;
