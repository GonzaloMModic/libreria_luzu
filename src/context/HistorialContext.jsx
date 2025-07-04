import { createContext, useContext, useState, useEffect } from "react";

const HistorialContext = createContext();

export const useHistorial = () => useContext(HistorialContext);

export const HistorialProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(() => {
    const guardados = localStorage.getItem("pedidos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  // Agregar un pedido (uno solo)
  const agregarPedido = (pedido) => {
    setPedidos((prev) => [...prev, pedido]);
  };

  // Filtrar pedidos por ID de usuario
  const obtenerPedidosPorUsuario = (usuarioId) => {
    return pedidos.filter((p) => p.usuarioId === usuarioId);
  };

  return (
    <HistorialContext.Provider value={{ pedidos, agregarPedido, obtenerPedidosPorUsuario }}>
      {children}
    </HistorialContext.Provider>
  );
};

export default HistorialProvider;