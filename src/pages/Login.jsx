import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    login(email, password)
      .then(usuario => {
        console.log("Usuario logueado:", usuario);
        navigate("/productos"); // Redirige a productos
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
        setError("Usuario o contraseña incorrectos");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2 style={{textAlign:"center"}}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            required
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            required
            autoComplete="current-password"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
      <div  style={{textAlign:"center"}}>
         <Link to="/registro"> Registrate </Link>   
      </div>
       
      </div>
  );
};

export default Login;