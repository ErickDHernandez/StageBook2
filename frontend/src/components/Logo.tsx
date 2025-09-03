// src/components/Logo.tsx
interface LogoProps {
  width?: number;
}

export default function Logo({ width = 200 }: LogoProps) {
  return (
    <img
      src="/logo.jpg"  // usa carpeta public
      alt="Logo BookStage"
      style={{
        width: `${width}px`,
        maxWidth: "50%",
        height: "auto",
        marginBottom: "40px",
      }}
    />
  );
}

