import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <p>© {new Date().getFullYear()} Gestor de Turnos | Gabriel Suigo</p>
      <p>Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;