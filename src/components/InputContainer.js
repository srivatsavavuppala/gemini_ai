import React from 'react';
import '../css/InputContainer.css'; 

const InputContainer = ({
  input,
  setInput,
  handleKeyPress,
  handleSpeechStart,
  handleSpeechEnd,
  listening,
  loading,
}) => {
  // Determine if the input should be disabled based on listening or loading
  const isInputDisabled = listening || loading;

  // Determine if the mic button should be disabled
  const isMicButtonDisabled = loading;

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        disabled={isInputDisabled}
      />
      <button
        className={`mic-button ${listening ? 'listening' : ''} ${input.trim() === "" ? '' : 'disabled'}`}
        onClick={listening ? handleSpeechEnd : handleSpeechStart}
        disabled={isMicButtonDisabled}
      >
        {listening ? "⛔" : "🎙️"}
      </button>
    </div>
  );
};

export default InputContainer;
