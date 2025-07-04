import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext.jsx";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" replace />;
}

export default Logout