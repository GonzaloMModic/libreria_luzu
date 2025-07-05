import React, { useState } from 'react';
import { useProductos } from '../context/ProductosContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';

const ModificarProducto = () => {
  const { productos, setProductos } = useProductos();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    autor: '',
    editorial: '',
    precio: '',
    descripcion: '',
    imagen: '',
    cantidad: '',
  });

  const handleSeleccionar = () => {
    if (!selectedId) return alert("Seleccioná un producto primero");
    const producto = productos.find(p => p.id === Number(selectedId));
    if (!producto) return alert("Producto no encontrado");

    setFormData({
      nombre: producto.nombre,
      autor: producto.autor,
      editorial: producto.editorial,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      cantidad: producto.cantidad,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if (!selectedId) return alert("Seleccioná un producto para modificar");

    if (!formData.nombre || !formData.autor || !formData.editorial || !formData.precio || !formData.descripcion || !formData.imagen || !formData.cantidad) {
      return alert("Completá todos los campos");
    }

    const productosActualizados = productos.map(p => {
      if (p.id === Number(selectedId)) {
        return {
          ...p,
          nombre: formData.nombre,
          autor: formData.autor,
          editorial: formData.editorial,
          precio: Number(formData.precio),
          descripcion: formData.descripcion,
          imagen: formData.imagen,
          cantidad: Number(formData.cantidad),
        };
      }
      return p;
    });

    setProductos(productosActualizados);
    localStorage.setItem("productos", JSON.stringify(productosActualizados));
    alert("Producto actualizado correctamente");
    navigate("/Admin");
  };


    useEffect(() => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados));
    }
  }, []);

  return (
    <div className="p-4" style={{ maxWidth: '800px', margin: 'auto' }}>
      <h3 className="mb-4 text-center">Modificar Producto</h3>

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

      <div style={{textAlign:"center"}}>
        <Button variant="primary" onClick={handleSeleccionar} className="mb-4" >
            Seleccionar
        </Button>
      </div>

        <Form>
          <Row>
            {/* Columna izquierda */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Editorial</Form.Label>
                <Form.Control
                  name="editorial"
                  value={formData.editorial}
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  type="number"
                  min="0"
                />
              </Form.Group>
            </Col>

            {/* Columna derecha */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  as="textarea"
                  rows={4}
                  style={{ Height: '200px' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Imagen (URL o ruta)</Form.Label>
                <Form.Control
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  type="number"
                  min="0"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="outline-secondary" onClick={() => navigate('/Admin')}>
              Volver
            </Button>
            <Button variant="success" onClick={handleGuardar}>
              Guardar cambios
            </Button>
          </div>
        </Form>

    </div>
  );
};

export default ModificarProducto;