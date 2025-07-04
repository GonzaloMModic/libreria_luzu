import { Carousel } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext.jsx';
import { useProductos } from '../context/ProductosContext.jsx';

const CarruselDestacados = ({ productosRandom }) => {
  const slides = [
    productosRandom.slice(0, 3),
    productosRandom.slice(3, 6)
  ];

  const { theme } = useTheme();

  const { urlPredefinido  } = useProductos();

  return (
    <Carousel>
      {slides.map((grupo, idx) => (
        <Carousel.Item key={idx}>
          <div className="row justify-content-center py-4">
            {grupo.map(producto => (
              <div key={producto.id} className="col-md-4 d-flex justify-content-center">
                <div className={`card ${theme === 'dark' ? 'custom-carrusel-dark' : 'custom-carrusel-light'}`} style={{ width: '100%', maxWidth: '250px' }}>
                  <img
                    src={producto.imagen}
                    alt={`Portada de ${producto.nombre}`}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = urlPredefinido; 
                    }}
                    className="mx-auto d-block"
                    style={{ width: '100px', height: '150px', objectFit: 'cover', paddingTop: '10px' }}
                  />
                  <div className="card-body text-center">
                    <p className="card-title" style={{ width: '100%', height: '50px'}}>{producto.nombre}</p>
                    <p className="btn btn-danger">Precio: ${producto.precio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarruselDestacados;