import React from 'react';
import { useHistorial } from '../context/HistorialContext';
import { useAuth } from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useProductos } from '../context/ProductosContext.jsx';

const HistorialCompras = () => {
  const { user } = useAuth();
  const { pedidos  } = useHistorial();
  const navigate = useNavigate();

  const { urlPredefinido } = useProductos();

  // Filtramos los pedidos del usuario actual
  const comprasUsuario = pedidos.filter(pedido => pedido.usuarioId === user.id);

  const { theme } = useTheme();

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Historial de Compras</h2>

      {comprasUsuario.length === 0 ? (
        <p>No realizaste compras todavía.</p>
      ) : (
        comprasUsuario.map((producto, index) => (
          <Card className={`mb-3 ${theme === 'dark' ? 'custom-carrusel-dark' : 'custom-carrusel-light'}`} key={`${producto.productoId}-${index}`}>
            <Card.Body className="d-flex">
              <img
                src={producto.imagen}
                alt={`Portada de ${producto.nombre}`}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = urlPredefinido; 
                    }}
                style={{
                  width: '100px',
                  height: '150px',
                  objectFit: 'cover',
                  marginRight: '20px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h5>{producto.nombre}</h5>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio unitario: ${producto.precio.toLocaleString()}</p>
                <p>Subtotal: ${(producto.precio * producto.cantidad).toLocaleString()}</p>
                <p className="mb-3" style={{ fontSize: '0.85rem' }}>
                  Fecha de compra: {new Date(producto.fecha).toLocaleString()}
                </p>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => navigate('/userProfile')}>
          Volver
        </Button>
      </div>
    </div>
  );
};

export default HistorialCompras;