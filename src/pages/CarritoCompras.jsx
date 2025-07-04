import React from 'react';
import { useCart } from '../context/CartContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistorial } from '../context/HistorialContext.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useProductos } from '../context/ProductosContext.jsx';

const Carrito = () => {
  const { user } = useAuth();
  const { urlPredefinido  } = useProductos();

  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCart();

  const totalCompra = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  const { agregarPedido } = useHistorial();

  const handleFinalizarCompra = () => {
  if (!user) return alert("Tenés que estar logueado");

  let productosActuales = JSON.parse(localStorage.getItem("productos")) || [];

  carrito.forEach(producto => {
  agregarPedido({
    id: crypto.randomUUID(),
    usuarioId: user.id, 
    productoId: producto.id,
    nombre: producto.nombre,
    imagen: producto.imagen,
    precio: producto.precio,
    cantidad: producto.cantidad,
    fecha: new Date().toISOString()
  });

      const index = productosActuales.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      productosActuales[index].cantidad -= producto.cantidad;
      if (productosActuales[index].cantidad < 0) {
        productosActuales[index].cantidad = 0;
      }
    }
});
  localStorage.setItem("productos", JSON.stringify(productosActuales));
  vaciarCarrito();
  alert("Compra finalizada con éxito!");
  <Navigate to="/productos"/>
};



  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      <Row>
        {/* 🛒 Sección izquierda: Lista de productos */}
        <Col md={8}>
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            carrito.map((producto) => (
              <Card className="mb-3" key={producto.id}>
                <Card.Body className="d-flex">
                  <img
                    src={producto.imagen}
                     alt={`Portada de ${producto.nombre}`}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = urlPredefinido; 
                    }}
                    style={{ width: '100px', height: '150px', objectFit: 'cover', marginRight: '20px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h5>{producto.nombre}</h5>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio unitario: ${producto.precio.toLocaleString()}</p>
                    <p>Subtotal: ${(producto.precio * producto.cantidad).toLocaleString()}</p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => eliminarDelCarrito(producto.id)}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

        {/* 💳 Sección derecha: Resumen y formulario */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <h4>Resumen de compra</h4>
              <p>Total: <strong>${totalCompra.toLocaleString()}</strong></p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control type="text" value={user.name} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={user.email} readOnly/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Av. Siempre Viva 742" />
                </Form.Group>

                <Button variant="success" className="w-100"
                onClick={handleFinalizarCompra}
                >
                  Finalizar compra
                </Button>
              </Form>

              <Button
                variant="outline-danger"
                className="mt-3 w-100"
                onClick={vaciarCarrito}
              >
                Vaciar carrito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Carrito;