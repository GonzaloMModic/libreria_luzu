import React, { useState } from 'react';
import { useProductos } from '../context/ProductosContext.jsx';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import { useLocation } from "react-router-dom";
import { useTheme } from '../context/ThemeContext.jsx';

const PRODUCTS_PER_PAGE = 8;

export default function Productos() {
  const { urlPredefinido  } = useProductos();
  const [currentPage, setCurrentPage] = useState(1);

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search')?.toLowerCase() || '';
  const productosFiltrados = productos.filter((producto) =>
  producto.nombre.toLowerCase().includes(search)
  );



  const totalPages = Math.ceil(productosFiltrados.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = productosFiltrados.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const rows = [];
  for (let i = 0; i < currentProducts.length; i += 4) {
    rows.push(currentProducts.slice(i, i + 4));
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const { theme } = useTheme();
  return (
    <div className="container my-4">
      {/* Grilla de productos */}
      {rows.map((row, idx) => (
        <Row className="mb-4" key={idx} >
          {row.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={3} >
              <Card className={`h-100 ${theme === 'dark' ? 'custom-carrusel-dark' : 'custom-carrusel-light'}`}>
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                    alt={`Portada de ${producto.nombre}`}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = urlPredefinido; 
                    }}
                  className="mx-auto d-block"
                  style={{
                    width: '100px',
                    height: '150px',
                    objectFit: 'cover',
                    paddingTop: '10px'
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center">{producto.nombre}</Card.Title>
                  <Card.Text  className="mb-3 text-center">Precio: {producto.precio}</Card.Text>
                  <Link
                    to={{ pathname: `/producto/${producto.id}`, search: '?query=string' }}
                    state={{ date: new Date().getDate() }}
                    className="btn btn-primary mt-auto"
                  >Comprar</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}

      {/* Controles de paginación */}
      {totalPages > 1 && (
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      )}
    </div>
  );
}