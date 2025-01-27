import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import NavbarMain from "../components/navbar/Navbar";

const PrivateLayout = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <nav style={{ margin: 0, padding: 0 }}>
      <NavbarMain />
    </nav>
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <footer style={{ margin: 0, padding: 0 }}>
      <Footer />
    </footer>
  </div>
);

export default PrivateLayout;
