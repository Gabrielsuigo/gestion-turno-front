import axios from "axios";
import Swal from "sweetalert2";
import style from "./Appointment.module.css";
import { useDispatch } from "react-redux";
import { cancelAppointmentAction } from "../../redux/reducer";

const Appointment = ({ date, time, status, id, description }) => {
  const dispatch = useDispatch();

  const cancelAppointment = async () => {
    const result = await Swal.fire({
      title: "¿Cancelar turno?",
      text: "¿Estás seguro de que querés cancelar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, volver",
      background: "#f9fafb",
      color: "#111827",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
        dispatch(cancelAppointmentAction(id));

        await Swal.fire({
          title: "Turno cancelado",
          text: "El turno se canceló correctamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Ocurrió un error en el servidor:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo cancelar el turno. Intentalo más tarde.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className={style.card}>
      <p>{date}</p>
      <p>{time}</p>
      <p>{description}</p>
      <p>{status?.toUpperCase()}</p>
      <button
        disabled={status === "cancelled"}
        onClick={cancelAppointment}
        className={status === "cancelled" ? style.disabledBtn : style.cancelBtn}
      >
        Cancelar
      </button>
    </div>
  );
};

export default Appointment;