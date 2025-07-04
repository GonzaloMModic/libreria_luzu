import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Router from './router/index.jsx'
import AuthProvider from './context/AuthContext.jsx'
import ProductosProvider from './context/ProductosContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import CartProvider from './context/CartContext.jsx'
import HistorialProvider from './context/HistorialContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ProductosProvider>
        <CartProvider>
          <HistorialProvider>
            <AuthProvider elements={<Router />}/>    
          </HistorialProvider>
        </CartProvider>
      </ProductosProvider>
    </ThemeProvider>
  </StrictMode>
)
