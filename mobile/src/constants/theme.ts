// 💡 REESTRUCTURACIÓN CLAVE: Colors ahora es un mapa de temas
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gray: string;
  tint: string;
}

export const Colors = {
  // Tema CLARO (light)
  light: {
    primary: "#000000",      // negro
    secondary: "#ffffff",    // blanco
    accent: "#007bff",       // azul (links)
    background: "#f9f9f9",    // fondo muy claro
    text: "#333333",          // texto oscuro
    gray: "#888888",
  } as ThemeColors, // Aseguramos el tipo

  // Tema OSCURO (dark)
  dark: {
    primary: "#ffffff",      // blanco
    secondary: "#000000",    // negro
    accent: "#1e90ff",       // azul más brillante para fondo oscuro
    background: "#121212",    // fondo muy oscuro
    text: "#f0f0f0",          // texto claro
    gray: "#aaaaaa",
  } as ThemeColors, // Aseguramos el tipo
};

export const Fonts = {
  regular: "System",
  bold: "System-Bold",
  rounded: "System-Rounded",
  mono: "System-Mono",
};