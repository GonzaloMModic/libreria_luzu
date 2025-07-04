import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTheme } from '../context/ThemeContext.jsx';

const EditarPerfil = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleGuardar = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuariosActualizados = usuarios.map(u =>
      u.id === user.id ? { ...u, name, email } : u
    );

    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    setUser(prev => ({ ...prev, name, email }));

    alert("Datos actualizados correctamente");
    navigate("/userProfile"); // Redirige al perfil
  };

  const { theme } = useTheme();

  return (
    <Card className={`p-4 ${theme === 'dark' ? 'custom-carrusel-dark' : 'custom-carrusel-light'}`}>
      {/* Inputs editables */}
      <Row className="align-items-center text-center mb-4">
        <Col xs={12} md={6} className="mb-3">
          <h5 className="fw-bold">Nombre</h5>
          <input
            type="text"
            className="form-control text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <h5 className="fw-bold">Email</h5>
          <input
            type="email"
            className="form-control text-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Row>

      {/* Botones acción */}
      <Row className="text-center mb-3">
        <Col xs={12} md={6} className="d-flex justify-content-center mb-2 mb-md-0">
            <Link to="/userProfile">
                <Button variant="outline-secondary">Volver sin editar</Button>
            </Link>
        </Col>

        <Col xs={12} md={6} className="d-flex justify-content-center">
            <Button variant="success" onClick={handleGuardar}>Guardar cambios</Button>
        </Col>
      </Row>

      {/* Volver a productos (opcional) */}
      <div className="text-center mt-3">
        <Link to="/productos">
          <Button variant="outline-primary">Volver a productos</Button>
        </Link>
      </div>
    </Card>
  );
};

export default EditarPerfil;