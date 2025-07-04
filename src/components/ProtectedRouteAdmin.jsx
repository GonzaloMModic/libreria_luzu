import { useLocation, Navigate } from 'react-router-dom' 
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRouteAdmin = ({element}) => {
    const location = useLocation()
    const { isAdmin} = useAuth(); 

    if (!isAdmin) {
         return <Navigate to="/" />
    }
    return element   
  
}

export default ProtectedRouteAdmin