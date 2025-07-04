import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Productos from '../pages/Productos.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import ProtectedRouteAdmin from '../components/ProtectedRouteAdmin.jsx';
import DetalleProducto from '../components/DetalleProducto.jsx';
import NotFound  from '../pages/NotFound.jsx';
import Login from '../pages/Login.jsx';
import Logout from '../pages/logout.jsx';
import UserProfile from '../pages/UserProfile.jsx';
import CarritoCompras from '../pages/CarritoCompras.jsx';
import Home from '../pages/Home.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import NavBar from '../components/navBar.jsx';
import MainLayout from '../components/mainLayout.jsx';
import Registro from '../pages/Registro.jsx';
import HistorialCompras from '../pages/historialCompras.jsx';
import EditarPerfil from '../pages/EditarPerfil.jsx';
import Admin from '../pages/admin.jsx';
import ModificarProductos from '../pages/ModificarProductos.jsx';
import EditarRoles from '../pages/editarRoles.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarProducto from '../pages/AgregarProducto.jsx';
import EliminarProducto from '../pages/EliminarProducto.jsx';

const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout />,
        children: [        
    { 
        index: true, 
        element: <Home/>
    },
    {
        path: "about",
        element: <AboutUs />
    },
     {
        path: "navBar",    
        element:  <NavBar />
    },
    {
        path: "productos",
        element: <ProtectedRoute element={<Productos />} />
    },
    {
        path: "producto/:productoId",
        element: <ProtectedRoute element= {<DetalleProducto />}/>
    },
    {
        path: "carritoCompras",
        element: <ProtectedRoute element={<CarritoCompras />} />
    },
        {
        path: "historialCompras",
        element: <ProtectedRoute element={<HistorialCompras />} />
    },
    {
        path:"login",
        element: <Login />
    },
    {
        path:"registro",
        element: <Registro />
    },
    {
        path:"userProfile",
        element: <ProtectedRoute element={<UserProfile />} /> 
    },
    {
        path:"editarPerfil",
        element: <ProtectedRoute element={<EditarPerfil />} /> 
    },
    {
        path:"logout",
        element:<Logout />
    },
    {
        path: "Admin",
        element: <ProtectedRouteAdmin element={<Admin  />} />,               
    },
    {
        path: "AgregarProducto",
        element: <ProtectedRouteAdmin element={<AgregarProducto  />} />,               
    }, 
    {
        path: "EliminarProducto",
        element: <ProtectedRouteAdmin element={<EliminarProducto  />} />,               
    },
    {
        path: "ModificarProductos",
        element: <ProtectedRouteAdmin element={<ModificarProductos  />} />,               
    }, 
    {
        path: "EditarRoles",
        element: <ProtectedRouteAdmin element={<EditarRoles  />} />,               
    },
    {
        //Comodin, cuando no encuentra ninguna ruta, viene a parar aca
        path: "*",
        element: <NotFound />
    }
        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />
} 