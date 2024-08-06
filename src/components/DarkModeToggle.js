import React from "react";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {darkMode ? "🥷" : "👨‍⚕️"}
    </button>
  );
};

export default DarkModeToggle;
