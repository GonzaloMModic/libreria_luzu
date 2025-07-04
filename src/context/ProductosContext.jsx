import { createContext, useContext, useState, useEffect } from "react";

const ProductosContext = createContext();

export const useProductos = () => useContext(ProductosContext); 

const ProductosProvider = ({ children }) => {
  const images = import.meta.glob('../img/*.jpg', { eager: true, query: '?url', import: 'default' });

  const urlPredefinido = images['../img/predefinido.jpg'];

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosEnStorage = JSON.parse(localStorage.getItem("productos")) || [];
      const productosIniciales = [    
      { id: 1, nombre: "Estudio En Escarlata", autor:"Sir Arthur Conan Doyle", editorial:"RBA", precio: 25000, 
        descripcion:"Es la primera novela de Sherlock Holmes, donde el detective conoce a Watson y resuelve un misterioso asesinato en Londres que lo lleva a descubrir una historia de venganza ligada al pasado en Estados Unidos.", imagen: images['../img/SH1.jpg'], cantidad:10 },
      { id: 2, nombre: "El Signo De Los Cuatro", autor:"Sir Arthur Conan Doyle", editorial:"RBA", precio: 20000, 
        descripcion:"Cuando Mary Morstan recibe un misterioso mensaje sobre el paradero de su padre desaparecido, acude a Sherlock Holmes en busca de ayuda. La investigación los lleva a un antiguo tesoro, oscuros secretos y un peligroso complot en las sombras de Londres.", imagen: images['../img/SH2.jpg'], cantidad:10 },
      { id: 3, nombre: "El Sabueso De Baskerville", autor:"Sir Arthur Conan Doyle", editorial:"RBA", precio: 20000, 
        descripcion:"Sherlock Holmes y el Dr. Watson investigan una antigua leyenda que aterroriza a la familia Baskerville: un misterioso sabueso sobrenatural que ronda los páramos. Enfrentando miedo y misterio, descubren qué hay detrás de esta maldición.", imagen: images['../img/SH3.jpg'], cantidad:10 },
      { id: 4, nombre: "Las Aventuras De Sherlock Holmes", autor:"Sir Arthur Conan Doyle", editorial:"RBA", precio: 15000, 
        descripcion:"El famoso detective y el Dr. Watson enfrentan una serie de casos intrigantes, desde robos y desapariciones hasta oscuros secretos familiares, usando lógica y observación para resolver cada misterio.", imagen: images['../img/SH4.jpg'] , cantidad:10},
      { id: 5, nombre: "Sherlock Holmes, sus mejores casos", autor:"Sir Arthur Conan Doyle", editorial:"ALMA", precio: 17500, 
        descripcion:"En esta edición hemos seleccionado sus mejores casos, interviniendo los textos para lograr el mismo impacto en los lectores actuales que aquel generado por las primeras apariciones del detective, en la lejana y brumosa Inglaterra de finales del siglo XIX.", imagen: images['../img/SH5.jpg'] , cantidad:10},
      { id: 6, nombre: "El regreso de Sherlock Holmes", autor:"Sir Arthur Conan Doyle", editorial:"ALMA", precio: 20000, 
        descripcion:"El regreso de Sherlock Holmes es una colección de 13 cuentos escritos por Arthur Conan Doyle en 1903 que cuenta la historia del regreso a la vida del detective más famoso de la historia.", imagen: images['../img/SH6.jpg'] , cantidad:10},
      { id: 7, nombre: "Harry Potter y la piedra filosofal", autor:"J. K. Rowling", editorial:"SALAMANDRA", precio: 45000, 
        descripcion:"'Harry Potter, un joven huérfano, descubre en su cumpleaños número 11 que es un mago y asiste a Hogwarts, una escuela de magia. Allí hace amigos, enfrenta desafíos y descubre secretos de su propio pasado.", imagen: images['../img/HP1.jpg'] , cantidad:10},
      { id: 8, nombre: "Harry Potter y la cámara secreta", autor:"J. K. Rowling", editorial:"SALAMANDRA", precio: 30000, 
        descripcion:"¿Puede un aprendiz de mago defender la escuela de los malvados que pretenden destruirla? Sin saber que alguien ha abierto la Cámara de los Secretos, dejando escapar una serie de monstruos peligrosos.", imagen: images['../img/HP2.jpg'] , cantidad:10},
      { id: 9, nombre: "Harry Potter y el prisionero de Azkaban", autor:"J. K. Rowling", editorial:"SALAMANDRA", precio: 35000, 
        descripcion:"Harry Potter regresa a Hogwarts para su tercer año, pero una amenaza se cierne: Sirius Black, un peligroso prisionero, ha escapado de Azkaban y parece estar tras él. Entre misterios y nuevos aliados, Harry enfrenta oscuras revelaciones.", imagen: images['../img/HP3.jpg'] , cantidad:10},
      { id: 10, nombre: "Harry Potter Y El Cáliz De Fuego", autor:"J. K. Rowling", editorial:"SALAMANDRA", precio: 10000, 
        descripcion:"En su cuarto año en Hogwarts, Harry Potter es inesperadamente elegido para competir en el Torneo de los Tres Magos, una peligrosa competencia entre escuelas de magia. Mientras enfrenta pruebas difíciles, una oscura amenaza comienza a resurgir.", imagen: images['../img/HP4.jpg'] , cantidad:10},
      { id: 11, nombre: "Harry Potter Y La Orden Del Fénix", autor:"J. K. Rowling", editorial:"SALAMANDRA", precio: 16000, 
        descripcion:"En su quinto año en Hogwarts, Harry se enfrenta a la negación del regreso de Voldemort y a una nueva profesora con intenciones siniestras. Con la ayuda de la Orden del Fénix, debe prepararse para la batalla que se avecina.", imagen: images['../img/HP5.jpg'], cantidad:10},
      { id: 12, nombre: "Harry Potter Y El Misterio Del Príncipe", autor:"J. K. Rowling", editorial:"SALAMANDRA", precio: 18000, 
        descripcion:"En su sexto año en Hogwarts, Harry descubre un viejo libro de pociones con anotaciones de alguien llamado el Príncipe Mestizo. Mientras profundiza en secretos oscuros, se prepara para enfrentar el creciente poder de Voldemort.", imagen: images['../img/HP6.jpg'], cantidad:10},
      { id: 13, nombre: "Harry Potter Y Las Reliquias De La Muerte", autor:"J. K. Rowling", editorial:"SALAMANDRA", precio: 23000, 
        descripcion:"En la última y decisiva aventura, Harry, Ron y Hermione dejan Hogwarts para buscar y destruir los horrocruxes de Voldemort. Mientras desentrañan el misterio de las Reliquias de la Muerte, la batalla final entre el bien y el mal se avecina.", imagen: images['../img/HP7.jpg'] , cantidad:10},
      { id: 14, nombre: "El Gran Libro De La Mitología Griega", autor:"Robin Hard", editorial:"", precio: 21000, 
        descripcion:"Obra que ofrece una visión detallada de los mitos griegos, sus dioses, héroes y leyendas. Combina historias clásicas con explicaciones modernas, proporcionando contexto histórico y cultural sobre la antigua Grecia.", imagen: images['../img/MGriega.jpg'] , cantidad:10},
      { id: 15, nombre: "Mitologia Japonesa", autor:"Masaharu Anesaki", editorial:"", precio: 22000, 
        descripcion:"Explora los mitos, dioses y leyendas de Japón, profundizando en su origen, simbolismo y su influencia en la cultura japonesa. Un recorrido esencial por el mundo mitológico nipón.", imagen: images['../img/MJaponesa.jpg'] , cantidad:10},
       { id: 16, nombre: "Mitos Y Misterios Egipcios", autor:"Steiner Rudolf", editorial:"", precio: 35000, 
        descripcion:"Examina las antiguas creencias y mitologías de Egipto, enfocándose en su simbolismo espiritual y su conexión con la evolución humana. Steiner ofrece una interpretación esotérica de los mitos egipcios, revelando su profundo significado.", imagen: images['../img/MEgipcia.jpg'] , cantidad:10}
       ];

    const idsStorage = productosEnStorage.map(p => p.id);
    const nuevosIniciales = productosIniciales.filter(p => !idsStorage.includes(p.id));

    const fusionados = [...productosEnStorage, ...nuevosIniciales];

    setProductos(fusionados);
    localStorage.setItem("productos", JSON.stringify(fusionados));
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, urlPredefinido, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductosProvider;