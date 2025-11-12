import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../helpers/validate";
import axios from "axios";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const newErrors = validateRegister(form);
    setErrors(newErrors);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/register", form);

      if (response.status === 201) {
        setSuccess("✅ Usuario registrado con éxito. Redirigiendo...");
        setForm(initialState);
        setTimeout(() => navigate("/"), 1500); // 🔹 Redirige al login
      } else {
        setSuccess("❌ Falló al registrar el usuario");
      }
    } catch (error) {
      console.error("Error al servidor", error);
      setSuccess("❌ Falló al conectar con el servidor");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>📝 Registro de Usuario</h1>
        <p className={styles.subtitle}>Completá tus datos para crear una cuenta</p>
        <hr />

        <form onSubmit={handleSubmit}>
          {[
            { label: "Nombre completo", name: "name", type: "text" },
            { label: "Nombre de usuario", name: "username", type: "text" },
            { label: "Contraseña", name: "password", type: "password" },
            { label: "Correo electrónico", name: "email", type: "email" },
            { label: "Fecha de nacimiento", name: "birthdate", type: "date" },
            { label: "Número de DNI", name: "nDni", type: "text" },
          ].map(({ label, name, type }) => (
            <div className={styles.inputGroup} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={type === "text" ? "Escribí aquí..." : undefined}
              />
              {errors[name] && <span className={styles.error}>{errors[name]}</span>}
            </div>
          ))}

          <button
            className={styles.button}
            disabled={Object.values(errors).some((err) => err)}
            type="submit"
          >
            Registrarme
          </button>
        </form>

        {success && <p className={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

export default Register;