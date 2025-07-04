import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import imageLib from '../img/Libreria.png';

const AboutUs = () => {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: "transparent" }}>
      <Row className="w-100 align-items-center">
        {/* Columna de la imagen */}
        <Col md={6} className="text-center mb-4 mb-md-0">
          <img
            src={imageLib}
            alt="Libreria Logo"
            style={{ width: '60%', maxWidth: '600px', height: 'auto' }}
          />
        </Col>

        {/* Columna del contenido */}
        <Col md={6}>
          <div className="info" style={{ width: '100%', maxWidth: '800px', maxheight: '800px', height: '100%' }}>
            <h1 className="text-center mb-4 mb-md-0">Nosotros somos Librería Luzu</h1>
            <p className="text-center mb-4 mb-md-0">
              Bienvenido a Librería Luzu, tu espacio digital para descubrir, explorar y conectar con el maravilloso mundo de los libros.<br />
              Desde 2024, nos hemos dedicado a ofrecer una experiencia única para los amantes de la lectura, combinando tradición y modernidad en un solo lugar.
            </p>

            <h2 className="text-center mb-4 mb-md-0">¿Qué Ofrecemos?</h2>
            <p className="text-center text-md-start">
              <strong>Catálogo Variado:</strong> Una amplia selección de géneros y autores para todos los gustos.<br />
              <strong>Recomendaciones Especializadas:</strong> Nuestro equipo está aquí para ayudarte a elegir el libro perfecto.<br />
              <strong>Compras Fáciles:</strong> Disfrutá de una experiencia de compra rápida y segura desde la comodidad de tu hogar.
            </p>

            <h3 className="text-center mb-4 mb-md-0">Estamos aquí para compartir con vos la magia de la lectura</h3>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;