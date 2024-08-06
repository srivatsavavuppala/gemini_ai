import React from 'react';
import '../css/InputContainer.css'; // Correct path to your CSS file

const InputContainer = ({
  input,
  setInput,
  handleKeyPress,
  handleSpeechStart,
  handleSpeechEnd,
  listening,
  loading,
}) => {
  const isInputDisabled = listening || loading; // Disable input while recording or loading

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        disabled={isInputDisabled} // Disable input based on state
      />
      <button
        className={`mic-button ${listening ? 'listening' : ''} ${input.trim() === "" ? '' : 'disabled'}`}
        onClick={listening ? handleSpeechEnd : handleSpeechStart}
        disabled={loading} // Disable button if loading
      >
        {listening ? "⛔" : "🎙️"}
      </button>
    </div>
  );
};

export default InputContainer;
