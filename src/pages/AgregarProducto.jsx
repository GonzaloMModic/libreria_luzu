import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';

const AgregarProducto = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [autor, setAutor] = useState('');
  const [editorial, setEditorial] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleGuardar = () => {
    if (!nombre || !autor || !editorial || !precio || !descripcion || !imagen || !cantidad) {
      alert('Por favor completá todos los campos');
      return;
    }

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    const nuevoId = productos.length > 0 
      ? Math.max(...productos.map(p => p.id)) + 1 
      : 100;

    const nuevoProducto = {
      id: nuevoId,
      nombre,
      autor,
      editorial,
      precio: parseFloat(precio),
      descripcion,
      imagen: `images['${imagen}']`, 
      cantidad: parseInt(cantidad)
    };

    const productosActualizados = [...productos, nuevoProducto];
    localStorage.setItem("productos", JSON.stringify(productosActualizados));

    alert("Producto agregado correctamente");
    navigate("/Admin"); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: "100%", maxWidth: "700px" }}>
        <h3 className="text-center mb-4">Agregar nuevo producto</h3>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={nombre} onChange={e => setNombre(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Autor</Form.Label>
                <Form.Control value={autor} onChange={e => setAutor(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Editorial</Form.Label>
                <Form.Control value={editorial} onChange={e => setEditorial(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Imagen (ruta)</Form.Label>
                <Form.Control
                  placeholder="../img/SH1.jpg"
                  value={imagen}
                  onChange={e => setImagen(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs={6} className="d-flex justify-content-center">
              <Button variant="outline-secondary" onClick={() => navigate("/Admin")}>Volver</Button>
            </Col>
            <Col xs={6} className="d-flex justify-content-center">
              <Button variant="success" onClick={handleGuardar}>Guardar producto</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AgregarProducto;