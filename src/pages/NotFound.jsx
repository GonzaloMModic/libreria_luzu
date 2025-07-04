import { Link } from "react-router-dom";
import errorImage from "../img/Error404.jpg";

export const NotFound = () => {
  return (
    <div
      className="text-center d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{ width: "100vw", overflowX: "hidden" }}
    >
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <img src={errorImage} alt="Error 404" />
      <p>La página buscada no pudo ser encontrada.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
