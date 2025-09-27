import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import Typewriter from "../../components/Typewriter";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <Logo />

      <h1 className={styles.dashboardTitle}>
        <Typewriter text="Bienvenido a StageBook" speed={60} />
      </h1>

      <div className={styles.buttonsContainer}>
        <Link to="/agenda" className={styles.navButton}>Agenda</Link>
        <Link to="/ensayos" className={styles.navButton}>Ensayos</Link>
        <Link to="/guiones" className={styles.navButton}>Guiones</Link>
        <Link to="/posters" className={styles.navButton}>Pósters</Link>
        <Link to="/perfil" className={styles.navButton}>Perfil</Link>
        <Link to="/configuracion" className={styles.navButton}>Configuración</Link>
      </div>
    </div>
  );
}

export default Dashboard;
