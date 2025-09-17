import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Typewriter from "../components/Typewriter";
import Button from "../components/Button";
import styles from "./Home.module.css";

interface ApiData {
  equipo: string;
  proyecto: string;
  descripcion: string;
}


export default function Home() {
  const [data, setData] = useState<ApiData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then(res => res.json())
      .then(info => setData(info))
      .catch(err => console.error("Error API:", err));
  }, []);

  return (
    <>
      <div className= {styles.homeContainer}> 
        <Logo width={200} className={styles.logoimg}></Logo> 
        <h1 className= {styles.mainTitle}>{data?.proyecto || "Cargando..."}</h1>
        <p className={styles.description}>
          <div className={styles.typewriterContainer}>
            {data ? <Typewriter text={data.descripcion} speed={50} /> : "Cargando..."}
          </div> 
        </p>

        <div className={styles.buttonContainer}>
          <Button text="Iniciar Sesión" onClick={() => navigate("/login")} />
          <Button
            text="Registrate"
            onClick={() => navigate("/register")}
            bgColor="#fff"
            textColor="#000"
          />
        </div>
      </div>
    </>
  );
}