import React, { useState, useEffect } from "react";
import { Text } from "react-native";

interface TypewriterProps {
  text: string;
  speed?: number; // ms entre cada letra
  color?: string;
  fontSize?: number;
}

export default function Typewriter({ 
  text, 
  speed = 50, 
  color = "black", 
  fontSize = 16 
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <Text style={{ color, fontSize, textAlign: "center" }}>{displayedText}</Text>;
}
