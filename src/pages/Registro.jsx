import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Obtener usuarios registrados del localStorage
        const users = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el email ya está registrado
        const userExists = users.find((user) => user.email === email);

        if (userExists) {
        setError("Este correo ya está registrado.");
        return;
        }

        let maxId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) : 99;
        const newId = maxId < 100 ? 100 : maxId + 1;

        // Agregar nuevo usuario
        const newUser = { 
            id: newId,
            name, 
            email, 
            pass,
            rol: "user"
        };
        users.push(newUser);
        localStorage.setItem("usuarios", JSON.stringify(users));

        navigate("/login");
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
        <h2 style={{textAlign:"center"}}>Registro</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label>Nombre</label>
            <input
                type="name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value.trim())}
            />
            </div>
            <div className="mb-3">
            <label>Email</label>
            <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
            />
            </div>
            <div className="mb-3">
            <label>Contraseña</label>
            <input
                type="password"
                className="form-control"
                required
                value={pass}
                onChange={(e) => setPassword(e.target.value.trim())}
            />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
            Registrarse
            </button>
        </form>
        </div>
    );
}

export default Registro;