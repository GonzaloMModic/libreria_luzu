import { useAuth } from '../context/AuthContext'; 
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTheme } from '../context/ThemeContext.jsx';

const UserProfile = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const showAlert = (message) => {
    alert(message);
  };

  if (!user || user.rol !== 'user') {
    showAlert("Los usuarios registrados como Administradores no pueden ingresar a este panel, redirigiendo al home");
    return <Navigate to="/"/>;
  }

  const handleEliminarCuenta = () => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmar) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const nuevosUsuarios = usuarios.filter(u => u.id !== user.id);
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

      logout(); // Cierra sesión
      setUser(null);
      alert("Cuenta eliminada exitosamente.");
      navigate("/"); // Redirige al inicio
    }
  };

  const { theme } = useTheme();

  return (
    <Card className={`p-4 ${theme === 'dark' ? 'custom-carrusel-dark' : 'custom-carrusel-light'}`}>
      {/* Info de usuario */}
      <Row className="align-items-center text-center mb-4">
        <Col xs={12} md={6} className="mb-3">
          <h5 className="fw-bold">Nombre</h5>
          <p  className={`form-control-plaintext ${theme === 'dark' ? 'custom-carrusel-dark' : 'custom-carrusel-light'}`}>{user.name}</p>
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <h5 className="fw-bold">Email</h5>
          <p  className={`form-control-plaintext ${theme === 'dark' ? 'custom-carrusel-dark' : 'custom-carrusel-light'}`}>{user.email}</p>
        </Col>
      </Row>

      {/* Botones principales */}
      <Row className="text-center mb-3">
        <Col xs={12} md={6} className="d-flex justify-content-center mb-2 mb-md-0">
          <Link to="/HistorialCompras">
            <Button variant="primary">Historial de Compras</Button>
          </Link>
        </Col>

        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Link to="/EditarPerfil">
            <Button variant="secondary">Editar datos</Button>
          </Link>
        </Col>
      </Row>

      {/* Botón eliminar cuenta */}
      <div className="text-center mt-3">
        <Button variant="danger" onClick={handleEliminarCuenta}>
          Eliminar cuenta
        </Button>
      </div>

      {/* Botón volver */}
      <div className="text-center mt-3">
        <Link to="/productos">
          <Button variant="outline-primary">Volver a productos</Button>
        </Link>
      </div>
    </Card>
  );
};

export default UserProfile;