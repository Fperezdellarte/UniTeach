import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import NavbarMain from "../components/navbar/Navbar";

const PrivateLayout = () => (
  <div className="d-flex flex-column">
    <nav className="container-fluid  sticky-top ">
      <NavbarMain />
    </nav>
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <footer className="container-fluid">
      <Footer />
    </footer>
  </div>
);

export default PrivateLayout;
