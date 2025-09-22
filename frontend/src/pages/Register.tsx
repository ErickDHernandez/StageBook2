import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Logo from "../components/Logo";
import Typewriter from "../components/Typewriter";

interface ApiData {
  proyecto: string;
}

function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [data, setData] = useState<ApiData | null>(null);
  const navigate = useNavigate();

  // Trae el título del backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then((res) => res.json())
      .then((info) => setData(info))
      .catch((err) => console.error("Error API:", err));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !correo || !contrasena) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      // Aquí conectamos con tu backend que guarda en PostgreSQL
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contrasena }), // Coincide con tus columnas
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.mensaje);
        navigate("/login"); // Redirige al login
      } else {
        alert(result.mensaje || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className={styles.registerContainer} >
      <Logo width={200} className={styles.logoimg} />

      <h1 className={styles.mainTitle} style={{ color: "black" }}>
        {data?.proyecto || "Cargando..."}
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <Typewriter text="Registro" speed={50} />
      </div>

      <form onSubmit={handleRegister} className={styles.formContainer}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>
          Registrarse
        </button>
      </form>

      <p className={styles.registerLink}>
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className={styles.link}>
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

export default Register;
