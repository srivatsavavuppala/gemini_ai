import React, { useState, useEffect } from 'react';

const BlinkingLight = ({ isActive, color }) => {
  const [isLightOn, setIsLightOn] = useState(isActive);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLightOn((prevState) => !prevState);
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="blinking-light">
      <div
        className={`dot ${isLightOn ? 'active' : ''} ${color}`}
        style={{ backgroundColor: isLightOn ? color : 'transparent' }}
      />
    </div>
  );
};

export default BlinkingLight;