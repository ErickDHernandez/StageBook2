import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; 
import Typewriter from "../../components/Typewriter";
import Logo from "../../components/Logo";

interface ApiData{
  proyecto:string;
}

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [data, setData] =useState<ApiData | null >(null);
  const navigate =useNavigate();

  //Este trae el titulo del Backend
    useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then(res => res.json())
      .then(info => setData(info))
      .catch(err => console.error("Error API:", err));
  }, []);


  const handleLogin = async (e: React.FormEvent) =>{
    e.preventDefault();

    const response = await fetch ("http://localhost:8000/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ correo, contrasena }),
    });

    const result = await response.json();
    alert(result.mensaje);
    
    if (response.ok) {
      navigate ("/dashboard");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Logo width={200} className={styles.logoimg} />
      <h1 style={{ color: "black" }} className={styles.mainTitle}>
        {data?.proyecto || "Cargando..."}
      </h1>

    <div>
      < Typewriter text = "Iniciar Sesión" speed={50}/>
    </div>


      
      <form onSubmit={handleLogin} className={styles.formContainer}> 
        <div>
          <input 
          type="email" 
          placeholder="Correo" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={styles.inputField} /> 
        </div>
        <div>
          <input 
          type="password" 
          placeholder="Contraseña" 
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className={styles.inputField} />
        </div>
        <button className={styles.submitButton}>Entrar</button> 
      </form>

      <p className={styles.registerLink}> 
        ¿No tienes cuenta?{" "}
        <Link to="/register" className={styles.link}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default Login;