import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Navbar.module.css";
import { logoutUser } from "../../redux/reducer";

const Navbar = () => {
  const userData = useSelector((state) => state.userActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se cerrará tu sesión actual. ¿Querés continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      background: "#f9fafb",
      color: "#111827",
      customClass: {
        popup: "swal2-rounded",
      },
    });

    if (result.isConfirmed) {
      dispatch(logoutUser());
      await Swal.fire({
        title: "Sesión cerrada",
        text: "Tu sesión se cerró correctamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        timer: 1800,
        showConfirmButton: false,
      });
      navigate("/");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <Link to="/home" className={styles.logoLink}>
          <img src="./vite.svg" alt="CityBank logo" className={styles.logo} />
          <span className={styles.brand}>CityBank</span>
        </Link>
      </div>

      <div className={styles.navLinks}>
        {userData.name ? (
          <>
            <span className={styles.username}>Hola, {userData.name}</span>
            <Link to="/appointments">
              <button className={styles.btnPrimary}>Mis turnos</button>
            </Link>
            <button className={styles.btnSecondary} onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className={styles.btnSecondary}>Registrarse</button>
            </Link>
            <Link to="/">
              <button className={styles.btnPrimary}>Iniciar sesión</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;