import React, { useEffect, useRef } from "react";

const BouncingBall = () => {
  const ballRef = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = React.useState({ x: 2, y: 2 });

  useEffect(() => {
    const moveBall = () => {
      setPosition((prevPosition) => {
        const newX = prevPosition.x + velocity.x;
        const newY = prevPosition.y + velocity.y;
        const containerWidth = window.innerWidth - 50;
        const containerHeight = window.innerHeight - 50;

        return {
          x:
            newX >= containerWidth || newX <= 0
              ? -velocity.x + prevPosition.x
              : newX,
          y:
            newY >= containerHeight || newY <= 0
              ? -velocity.y + prevPosition.y
              : newY,
        };
      });
    };

    const intervalId = setInterval(moveBall, 10);
    return () => clearInterval(intervalId);
  }, [velocity]);

  return (
    <div
      ref={ballRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        borderRadius: "50%",
      }}
    ></div>
  );
};

export default BouncingBall;
