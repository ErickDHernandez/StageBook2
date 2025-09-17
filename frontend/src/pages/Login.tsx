// src/pages/Login.tsx
import { Link } from "react-router-dom";
import styles from "./Login.module.css"; 
import Typewriter from "../components/Typewriter";
import Logo from "../components/Logo";


function Login() {
  return (
    <div className={styles.loginContainer}>
    <Logo width={200} className={styles.logoimg}></Logo> 
      <h1 className={styles.loginTitle}>Iniciar Sesión</h1>
      <form className={styles.formContainer}> 
        <div>
          <input type="email" placeholder="Correo" className={styles.inputField} /> {/* ⬅️ Aplica la clase del input */}
        </div>
        <div>
          <input type="password" placeholder="Contraseña" className={styles.inputField} /> {/* ⬅️ Aplica la clase del input */}
        </div>
        <button className={styles.submitButton}>Entrar</button> {/* ⬅️ Aplica la clase del botón */}
      </form>

      <p className={styles.registerLink}> {/* ⬅️ Aplica la clase para el texto */}
        ¿No tienes cuenta?{" "}
        <Link to="/register" className={styles.link}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default Login;