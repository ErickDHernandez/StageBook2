import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // opcional: velocidad en ms
}

function Typewriter ({ text, speed = 100 }: TypewriterProps){
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval); // detener cuando termina
      }
    }, speed);

    return () => clearInterval(interval); // limpieza al desmontar
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
