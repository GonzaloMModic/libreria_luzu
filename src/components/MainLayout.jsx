import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import Footer from "./Footer";
export default function MainLayout() {

  return (
    <div 
      className="d-flex flex-column min-vh-100" 
      style={{ 
        width: "100vw", 
        overflowX: "hidden",
        minHeight: '100vh'        
      }}
    >
      <NavBar />
      <main className="flex-grow-1 container-fluid mt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}