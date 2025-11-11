import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <h2 className={styles.title}>Gestión de Turnos y Citas</h2>
        <p className={styles.subtitle}>
          Organizá tus horarios de manera simple y eficiente.
        </p>
      </div>
    </>
  );
};

export default Home;