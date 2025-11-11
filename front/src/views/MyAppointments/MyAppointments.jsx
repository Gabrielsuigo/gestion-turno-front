import { useEffect } from "react";
import Appointment from "../../components/Appointment/Appointment";
import style from "./MyAppointments.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUserAppointments } from "../../redux/reducer";

const MyAppointments = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userActive);
  const userAppointments = useSelector((state) => state.userAppointment);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userData.id}`
      );
      dispatch(addUserAppointments(response.data.appointments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    !userData.name ? navigate("/") : fetchData();
  }, []);

  return (
    <div className={style.page}>
      <div className={style.headerSection}>
        <div>
          <h2 className={style.title}>Panel de Turnos</h2>
          <p className={style.subtitle}>Gestioná tus citas de forma sencilla</p>
        </div>
        <Link to="/newAppointment" className={style.btnAdd}>
          + Nuevo Turno
        </Link>
      </div>

      <div className={style.container}>
        {userAppointments.length ? (
          userAppointments.map(({ time, date, status, id, description }) => (
            <div key={id} className={style.card}>
              <Appointment
                time={time}
                date={date}
                status={status}
                id={id}
                description={description}
              />
            </div>
          ))
        ) : (
          <p className={style.noTurnos}>No tienes ningún turno todavía 🗓️</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;