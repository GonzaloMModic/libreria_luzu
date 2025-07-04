import React, { useState } from 'react';
import { useProductos } from '../context/ProductosContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EliminarProducto = () => {
  const { productos, setProductos } = useProductos();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('');

  const handleEliminar = () => {
    if (!selectedId) return alert("Seleccioná un producto para eliminar");

    const producto = productos.find(p => p.id === Number(selectedId));
    if (!producto) return alert("Producto no encontrado");

    const confirmar = window.confirm(`¿Estás seguro que querés eliminar "${producto.nombre}"?`);
    if (!confirmar) return;

    const productosActualizados = productos.filter(p => p.id !== Number(selectedId));
    setProductos(productosActualizados);
    localStorage.setItem("productos", JSON.stringify(productosActualizados));

    alert("Producto eliminado correctamente");
    navigate("/Admin");
  };

  return (
    <div className="p-4" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h3 className="mb-4 text-center">Eliminar Producto</h3>

      <Form.Group className="mb-3">
        <Form.Label>Seleccioná un producto</Form.Label>
        <Form.Select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
        >
          <option value="">-- Seleccioná un producto --</option>
          {productos
            .sort((a, b) => a.id - b.id)
            .map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={() => navigate('/Admin')}>
          Volver
        </Button>
        <Button variant="danger" onClick={handleEliminar} disabled={!selectedId}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default EliminarProducto;