import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Admin = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="p-4 h-100" style={{ width: "100%", maxWidth: "700px"}}>
        {/* Botones principales de gestión */}
        <Row className="text-center mb-3 mt-4">
          <Col xs={12} md={6} className="d-flex justify-content-center mb-2 mb-md-0">
            <Link to="/AgregarProducto">
              <Button variant="success" style={{ minWidth: "200px"}}>Agregar Productos</Button>
            </Link>
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center mb-2 mb-md-0" >
            <Link to="/ModificarProductos">
              <Button variant="warning" style={{ minWidth: "200px"}}>Modificar productos</Button>
            </Link>
          </Col>         
        </Row>
          
        <Row className="text-center mb-3 mt-4">
          <Col xs={12} md={6} className="d-flex justify-content-center mb-3 mb-md-0">
            <Link to="/EliminarProducto">
              <Button variant="danger" style={{ minWidth: "200px"}}>Eliminar Productos</Button>
            </Link>
          </Col>         

          <Col xs={12} md={6} className="d-flex justify-content-center mb-3 mb-md-0">
            <Link to="/EditarRoles">
              <Button variant="info" style={{ minWidth: "200px"}}>Editar roles de usuarios</Button>
            </Link>
          </Col>
        </Row>

        {/* Botón volver */}
        <div className="text-center mt-3">
          <Link to="/productos">
            <Button variant="outline-primary" style={{ minWidth: "200px"}}>Volver a productos</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Admin;