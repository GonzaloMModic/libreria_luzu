import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const usuariosPorDefecto = [
  { id: 1, name: "Homero Simpson", email: "homero@simpson.com", pass: "123456", rol: "admin" },
  { id: 2, name: "Marge Simpson", email: "marge@simpson.com", pass: "7891011", rol: "user" },
  { id: 3, name: "Bart Simpson", email: "bart@simpson.com", pass: "121314", rol: "user" },
];

const combinarUsuarios = (guardados, porDefecto) => {
  const mapa = new Map();
  guardados.forEach(u => mapa.set(u.email, u));
  porDefecto.forEach(u => {
    if (!mapa.has(u.email)) {
      mapa.set(u.email, u);
    }
  });
  return Array.from(mapa.values());
};

const AuthProvider = ({ elements }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosCombinados = combinarUsuarios(usuariosGuardados, usuariosPorDefecto);
    localStorage.setItem("usuarios", JSON.stringify(usuariosCombinados));
  }, []);

  const login = async (email, pass) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
     console.log("Usuarios disponibles:", usuarios);
    const usuario = usuarios.find(u => u.email === email && u.pass === pass);
    if (usuario) {
      setUser(usuario);
      return usuario;
    } else {
      throw new Error("Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;
  const isUser = user && user.rol === "user";
  const isAdmin = user && user.rol === "admin";

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated, isAdmin, isUser }}>
      {elements}
    </AuthContext.Provider>
  );
};

export default AuthProvider;