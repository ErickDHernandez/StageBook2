// src/components/Logo.tsx
import React from "react";
interface LogoProps extends React.HTMLAttributes<HTMLImageElement>{
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
        marginBottom: "0px",
      }}
    />
  );
}

