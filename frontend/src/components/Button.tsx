// src/components/Button.tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  bgColor?: string;
  hoverColor?: string;
  textColor?: string;
}

export default function Button({
  text,
  onClick,
  bgColor = "#ff0000",
  hoverColor = "#D4AF37",
  textColor = "white",
}: ButtonProps) {
  return (
    <button
      style={{
        marginTop: "20px",
        padding: "15px 60px",
        fontSize: "1.5vw",
        backgroundColor: bgColor,
        color: textColor,
        cursor: "pointer",
        transition: "background-color 0.3s",
        border: "2px solid black",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
