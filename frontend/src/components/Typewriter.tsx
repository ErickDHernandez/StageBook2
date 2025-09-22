import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  color?: string;
}

function Typewriter({ text, speed = 100, color = "black" }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Si no hay texto, no hacemos nada.
    if (!text) {
      setDisplayedText("");
      return;
    }

    // 💡 Reinicia el estado al comienzo del efecto.
    // Esto es crucial para que la animación se inicie desde cero,
    // especialmente en el Modo Estricto de React.
    setDisplayedText(""); 
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    // 🧹 La función de limpieza que detiene el intervalo.
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span style={{ color }}>{displayedText}</span>;
}

export default Typewriter;