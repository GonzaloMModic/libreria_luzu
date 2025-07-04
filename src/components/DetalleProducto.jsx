import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useProductos } from "../context/ProductosContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const DetalleProducto = () => {
  const { productoId } = useParams();
  const { urlPredefinido } = useProductos();

  const { agregarAlCarrito } = useCart();
  const { user } = useAuth();

  const productosActualizados =
    JSON.parse(localStorage.getItem("productos")) || [];
  const producto = productosActualizados.find(
    (p) => p.id === Number(productoId)
  );

  if (!producto) {
    return (
      <div className="p-4 text-center">
        <h3>Producto no encontrado</h3>
        <Link to="/productos">
          <Button variant="link">Volver a productos</Button>
        </Link>
      </div>
    );
  }

  const { theme } = useTheme();

  const hayStock = producto.cantidad > 0;

  const handleAgregarAlCarrito = () => {
    const productosActuales =
      JSON.parse(localStorage.getItem("productos")) || [];
    const productoActualizado = productosActuales.find(
      (p) => p.id === producto.id
    );

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoEnCarrito = carritoActual.find((p) => p.id === producto.id);
    const cantidadEnCarrito = productoEnCarrito
      ? productoEnCarrito.cantidad
      : 0;

    if (
      !productoActualizado ||
      productoActualizado.cantidad <= cantidadEnCarrito
    ) {
      alert(
        "No hay suficiente stock para agregar más unidades de este producto."
      );
      return;
    }

    agregarAlCarrito(producto, 1);
  };

  useEffect(() => {
    if (producto.cantidad === 0) {
      alert("Este producto está agotado.");
    }
  }, [producto.cantidad]);

  return (
    <Card
      className={`p-4 ${
        theme === "dark" ? "custom-carrusel-dark" : "custom-carrusel-light"
      }`}
    >
      <Row className="align-items-start">
        {/* Imagen a la izquierda */}
        <Col
          xs={12}
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={producto.imagen}
            alt={`Portada de ${producto.nombre}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = urlPredefinido;
            }}
            style={{ maxWidth: "100%", maxHeight: 400, objectFit: "contain" }}
          />
        </Col>

        {/* Información a la derecha */}
        <Col
          xs={12}
          md={7}
          className="d-flex flex-column justify-content-between"
        >
          <div>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Subtitle
              className={`mb-2 ${
                theme === "dark"
                  ? "custom-soloTexto-dark"
                  : ".custom-soloTexto-light"
              }`}
            >
              Autor: {producto.autor}
            </Card.Subtitle>
            <Card.Subtitle
              className={`mb-2 ${
                theme === "dark"
                  ? "custom-soloTexto-dark"
                  : ".custom-soloTexto-light"
              }`}
            >
              Editorial: {producto.editorial}
            </Card.Subtitle>
            <Card.Text>{producto.descripcion}</Card.Text>
            <Card.Text className="fw-bold">
              Precio: ${producto.precio}
            </Card.Text>
            <Card.Text
              className={`mb-2 ${
                theme === "dark"
                  ? "custom-soloTexto-dark"
                  : ".custom-soloTexto-light"
              }`}
            >
              Cantidad disponible: {producto.cantidad}
            </Card.Text>
          </div>

          {!user || user.rol !== "admin" ? (
            <div className="d-flex gap-2">
              <Link to={hayStock ? "/carritoCompras" : "#"}>
                <Button
                  onClick={handleAgregarAlCarrito}
                  variant="primary"
                  disabled={!hayStock}
                >
                  Comprar ahora
                </Button>
              </Link>

              <Button
                onClick={handleAgregarAlCarrito}
                variant="outline-primary"
                style={{ backgroundColor: "rgba(10, 20, 80, 0.25)" }}
                disabled={!hayStock}
              >
                Agregar al carrito
              </Button>
            </div>
          ) : null}
        </Col>
      </Row>

      {/* Botón Volver separado abajo */}
      <div className="text-center mt-4">
        <Link to="/productos">
          <Button variant="primary">Volver a productos</Button>
        </Link>
      </div>
    </Card>
  );
};

export default DetalleProducto;
