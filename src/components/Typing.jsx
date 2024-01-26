import React, { useEffect, useState } from "react";

const Typing = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="typing-container">
      <h4 className="typing-text">Typing{dots}</h4>
    </div>
  );
};

export default Typing;
