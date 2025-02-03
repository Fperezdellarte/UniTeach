import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import NavbarMain from "../components/navbar/Navbar";

const PrivateLayout = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <NavbarMain />
 
    <main className="flex-grow-1">
      <Outlet />
    </main>
  
      <Footer />
    
  </div>
);

export default PrivateLayout;
