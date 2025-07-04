import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const EditarRoles = () => {
  const navigate = useNavigate();

  // Estado para usuarios y roles
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    // Traemos usuarios de localStorage (o podrías llamar API)
    const storedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(storedUsers);
  }, []);

  // Guardar cambios: actualizar usuario y redirigir
  const handleGuardar = () => {
    if (!selectedUserEmail || !selectedRole) {
      alert('Por favor seleccioná usuario y rol');
      return;
    }

    const usuariosActualizados = usuarios.map(u => {
      if (u.email === selectedUserEmail) {
        return { ...u, rol: selectedRole };
      }
      return u;
    });

    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    alert('Rol actualizado correctamente');
    navigate('/Admin');
  };

  return (
    <div className="p-4" style={{ maxWidth: '700px', margin: 'auto' }}>
      <h3 className="mb-4 text-center">Editar Roles de Usuarios</h3>
      <Row>
        <Col xs={12} md={6}>
          <Form.Label><strong>Usuarios registrados</strong></Form.Label>
          <Form.Select
            value={selectedUserEmail}
            onChange={e => setSelectedUserEmail(e.target.value)}
            aria-label="Seleccionar usuario"
          >
            <option value="">-- Seleccioná un usuario --</option>
            {usuarios.map(user => (
              <option key={user.id} value={user.email}>
                {user.email}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} md={6}>
          <Form.Label><strong>Roles disponibles</strong></Form.Label>
          <Form.Select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            aria-label="Seleccionar rol"
          >
            <option value="">-- Seleccioná un rol --</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Col>
      </Row>

      <Row  className="mt-4">
        <Col xs={6} className="d-flex justify-content-center">
          <Link to="/Admin">
            <Button variant="outline-secondary" style={{ minWidth: "200px"}}>Volver al panel</Button>
          </Link>
        </Col>
        <Col xs={6} className="d-flex justify-content-center">
          <Button variant="success" onClick={handleGuardar} style={{ minWidth: "200px"}}>Guardar cambios</Button>
        </Col>
      </Row>
    </div>
  );
};

export default EditarRoles;