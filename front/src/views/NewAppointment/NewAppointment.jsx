import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidTime, isWeekDay } from "../../helpers/validate";
import axios from "axios";
import styles from "./NewAppointment.module.css";

const NewAppointment = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userActive);

  const initialState = {
    date: "",
    time: "",
    description: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  useEffect(() => {
    if (!userData?.name) navigate("/");
  }, [userData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/schedule",
        {
          ...form,
          userId: userData.id,
        }
      );

      if (response.status === 201) {
        alert("✅ Turno solicitado correctamente");
        navigate("/appointments");
      } else {
        alert("❌ No se pudo solicitar el turno");
      }
    } catch (error) {
      console.error("Error en el servidor", error);
      alert("❌ Error al comunicarse con el servidor");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  useEffect(() => {
    let newErrors = { ...initialState };
    if (form.date && !isWeekDay(form.date)) {
      newErrors.date = "Seleccione un día entre lunes y viernes.";
    }
    if (form.time && !isValidTime(form.time)) {
      newErrors.time = "Seleccione una hora entre las 08:00 y 17:00.";
    }
    setErrors(newErrors);
  }, [form]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>📅 Solicitud de turno</h2>
        <p className={styles.subtitle}>
          Completá los datos para agendar tu nuevo turno
        </p>
        <hr />

        <form onSubmit={handleSubmit}>
          {[
            { label: "Fecha", name: "date", type: "date" },
            { label: "Hora", name: "time", type: "time" },
            { label: "Descripción", name: "description", type: "text" },
          ].map(({ label, name, type }) => (
            <div className={styles.inputGroup} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={
                  type === "text"
                    ? "Ej: Consulta general, control, etc."
                    : undefined
                }
              />
              {errors[name] && (
                <span className={styles.error}>{errors[name]}</span>
              )}
            </div>
          ))}

          <button
            className={styles.button}
            type="submit"
            disabled={errors.date || errors.time}
          >
            Solicitar turno
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAppointment;