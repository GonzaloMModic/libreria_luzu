import { useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("No se puede ingresar sin estar logueado, redirigiendo al home");
      setShowAlert(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated && showAlert) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return element;
};

export default ProtectedRoute;