import React, { useEffect, useState } from "react";

const PulsatingColorBox = () => {
  const [hue, setHue] = useState(0);
  const [colorInterval, setColorInterval] = useState(null);

  useEffect(() => {
    if (colorInterval) {
      return () => clearInterval(colorInterval);
    }
  }, [colorInterval]);

  const startColorAnimation = () => {
    const intervalId = setInterval(
      () => setHue((prev) => (prev + 1) % 360),
      10,
    );
    // @ts-ignore
    setColorInterval(intervalId);
  };

  const stopColorAnimation = () => {
    // @ts-ignore
    clearInterval(colorInterval);
    setColorInterval(null);
  };

  return (
    <div
      onMouseOver={startColorAnimation}
      onMouseOut={stopColorAnimation}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: `hsl(${hue}, 100%, 50%)`,
      }}
    ></div>
  );
};

export default PulsatingColorBox;
