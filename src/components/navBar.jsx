import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import imgHome from "../img/libreriaHome.png";
import imgCarrito from "../img/carrito.png";
import imgPerfil from "../img/perfil.png";
import imgAbout from "../img/about.png";
import imgAdmin from "../img/adminPanel.png";
import imgLogOut from "../img/logOut.png";
import imgLogIn from "../img/logIn.png";
import imgRegistrate from "../img/registrate.png";
import imgDarkTheme from "../img/darkTheme.png";
import imgHistorial from "../img/historial.png";
import {useTheme}  from "../context/ThemeContext";
import imgLightTheme from "../img/lightTheme.png";
import imgCarritoDark from "../img/carritoDark.png";
import imgLogInDark from "../img/loginDark.png";

function NavBar() {
  const { isAuthenticated, isUser, isAdmin } = useAuth();
  const location = useLocation();
  const isProductosPage = location.pathname === "/productos";

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/productos?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (window.confirm("¿Seguro que querés cerrar sesión?")) {
      navigate("/logout");
    }
  };

  const { toggleTheme, theme } = useTheme();

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={imgHome}
            alt="Librería Luzu"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-3">
            <Nav.Link as={Link} to="/about">
              <img
                src={imgAbout}
                alt="Librería Luzu"
                height="27"
                className="d-inline-block align-top"
              />
            </Nav.Link>
            <Nav.Link as={Link} to="/productos"  className={theme === "dark" ? "custom-soloTexto-dark" : "custom-soloTexto-light"}>
              Productos
            </Nav.Link>
          </Nav>

          {isProductosPage && (
            <Form className="d-flex me-auto" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Buscar
              </Button>
            </Form>
          )}
          <Nav className="ms-auto">
                      {isUser && (
              <Nav.Link as={Link} to="/HistorialCompras">
                <img
                  src={imgHistorial}
                  alt="Librería Luzu"
                  height="27"
                  className="d-inline-block align-top"
                />
              </Nav.Link>
          )}
            {isUser && (
              <Nav.Link as={Link} to="/carritoCompras">
                <img
                  src={theme === "light" ? imgCarrito : imgCarritoDark}
                  alt="Librería Luzu"
                  height="27"
                  className="d-inline-block align-top"
                  title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
                />
              </Nav.Link>
            )}
            {isUser && (
              <Nav.Link as={Link} to="/userProfile">
                <img
                  src={imgPerfil}
                  alt="Librería Luzu"
                  height="27"
                  className="d-inline-block align-top"
                />
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                <img
                  src={imgAdmin}
                  alt="Librería Luzu"
                  height="27"
                  className="d-inline-block align-top"
                />
              </Nav.Link>
            )}
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/login">
                <img
                  src={theme === "light" ? imgLogIn : imgLogInDark}
                  alt="Librería Luzu"
                  height="27"
                  className="d-inline-block align-top"
                />
              </Nav.Link>
            )}
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/registro">
                <img
                  src={imgRegistrate}
                  alt="Librería Luzu"
                  height="27"
                  className="d-inline-block align-top"
                />
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link as={Link} onClick={handleClick} to="/logout">
                <img
                  src={imgLogOut}
                  alt="Librería Luzu"
                  height="27"
                  className="d-inline-block align-top"
                />
              </Nav.Link>
            )}
            <Nav.Link as="span" className="d-flex align-items-center">
            <img
              src={theme === "light" ? imgDarkTheme : imgLightTheme}
              alt="Cambiar tema"
              height="27"
              className="d-inline-block align-top"
              style={{ cursor: "pointer" }}
              onClick={toggleTheme}
              title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
            />
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
