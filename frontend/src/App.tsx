// src/App.tsx
import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Typewriter from "./components/Typewriter";
import Button from "./components/Button";

interface ApiData {
  equipo: string;
  proyecto: string;
  descripcion: string;
}

function App() {
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then((res) => res.json())
      .then((info: ApiData) => setData(info))
      .catch((err) => console.error("Error al conectar con la API:", err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "Courier New, monospace",
        textAlign: "center",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      <Logo width={250} />

      <h1 style={{ fontSize: "3rem", color: "#333" }}>
        {data ? data.proyecto : "Cargando..."}
      </h1>

      <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "800px", marginBottom: "40px" }}>
        {data ? <Typewriter text={data.descripcion} speed={50} /> : "Cargando..."}
      </p>

      <Button text="Iniciar Sesión" onClick={() => alert("Pantalla de login")} />
      <Button text="Registrate" onClick={() => alert("Pantalla de registro")} bgColor="#ffffff" textColor="black" />
    </div>
  );
}

export default App;
