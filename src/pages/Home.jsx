import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import { useProductos } from '../context/ProductosContext.jsx';
import { Carousel } from 'react-bootstrap';
import CarruselDestacados from '../components/CarruselDestacados.jsx';

const Home = () => {
  const { user } = useAuth();
  const { productos } = useProductos();

  let idRandomGenerados = [];

    if (!productos || productos.length < 6) {
    return <div className="text-center my-5">Cargando productos...</div>;
  }

  while (idRandomGenerados.length < 6) {
    let idRandom = Math.floor(Math.random() * productos.length);
    if (!idRandomGenerados.includes(idRandom)) {
      idRandomGenerados.push(idRandom);
    }
  }

  const productosRandom = idRandomGenerados.map(i => productos[i]);


  return (
    <div className="container">
      <header className="text-center">
        <h1>Bienvenido a la Librería Luzu</h1>
        <p>Encuentra los mejores libros para tu próxima lectura</p>
      </header>

      <section className="destacados">
        <h2 className="text-center my-5">Libros Destacados</h2>
          <CarruselDestacados productosRandom={productosRandom} />
      </section>
    </div>    
  )
}


export default Home;