import React, { useEffect, useState } from "react";
import axios from "axios";
import { validateLogin } from "../../helpers/validate";
import { addUser } from "../../redux/reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    username: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  useEffect(() => {
    const newErrors = validateLogin(form);
    setErrors(newErrors);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        form
      );

      if (response.status === 200) {
        dispatch(addUser(response.data.user));
        alert("Usuario logueado con éxito ✅");
        navigate("/home");
      } else {
        alert("Falló el inicio de sesión ❌");
      }
      setForm(initialState);
    } catch (error) {
      console.error("Error del servidor:", error);
      alert("Falló el inicio de sesión ❌");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
  };

  return (
    <div className={styles.page}>
          <div className={styles.centerBox}>
      <div className={styles.container}>

        <h2>Inicio de Sesión</h2>
        <p className={styles.subtitle}>Accedé con tu usuario y contraseña</p>
        <hr />

        <form onSubmit={handleSubmit}>
          {[
            { label: "Nombre de Usuario", name: "username", type: "text" },
            { label: "Contraseña", name: "password", type: "password" },
          ].map(({ label, name, type }) => (
            <div className={styles.inputGroup} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                value={form[name]}
                name={name}
                type={type}
                onChange={handleChange}
                placeholder={`Ingresá tu ${label.toLowerCase()}`}
              />
              {errors[name] && (
                <span className={styles.error}>{errors[name]}</span>
              )}
              
            </div>
          ))}

          <button
            className={styles.button}
            disabled={errors.username || errors.password}
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;