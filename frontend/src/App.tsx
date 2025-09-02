import { useEffect, useState } from "react";
import Logo from "./assets/logo.jpg"; // Asegúrate de tener src/assets/logo.png

interface ApiData {
  equipo: string;
  proyecto: string;
  descripcion: string;
}

function App() {
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/") // Ruta de tu backend
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
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f0f2f5",
        fontFamily: "courier",
        textAlign: "center",
        width: "100%",
        maxWidth: "1200px", // ancho máximo en PC
        margin: "0 auto",   // centra en pantallas grandes
      }}
    >
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo BookStage"
        style={{
          width: "200px",
          maxWidth: "50%", // adaptable en móvil
          height: "auto",
          marginBottom: "30px",
        }}
      />

      {/* Título */}
      <h1 style={{ fontSize: "3rem", color: "#333" }}>
        {data ? data.proyecto : "Cargando..."}
      </h1>

      {/* Equipo */}
      <h3 style={{ fontSize: "1.5rem", color: "#555" }}>
        {data ? `Equipo: ${data.equipo}` : ""}
      </h3>

      {/* Descripción */}
      <p
        style={{
          fontSize: "1.2rem",
          color: "#666",
          maxWidth: "800px",
        }}
      >
        {data ? data.descripcion : ""}
      </p>

      {/* Botón */}
      <button
        style={{
          marginTop: "40px",
          padding: "2% 30%",
          fontSize: "1.2rem",
          backgroundColor: "#ff0000",
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.3s",
          border: "3px solid black",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FF0000")}
        onClick={() => alert("Aquí irá la pantalla de login")}
      >
        Iniciar Sesión
      </button>

            {/* Botón */}
      <button
        style={{
          marginTop: "20px",
          padding: "2% 30%",
          fontSize: "1.2rem",
          backgroundColor: "#ffffffff",
          color: "black",
          cursor: "pointer",
          transition: "background-color 0.3s",
          border: "3px solid black",
          
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ffffffff")}
        onClick={() => alert("Aquí irá la pantalla de login")}
      >
        REGISTRATE 
      </button>
    </div>
  );
}

export default App;
