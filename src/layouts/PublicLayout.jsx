import { Outlet } from "react-router-dom";
import NavbarMain from "../components/navbar/Navbar";
import Footer from "../components/footer/footer";

const PublicLayout = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <NavbarMain />
    <main className="flex-1">
      <Outlet />
    </main>
    <footer className="container-fluid">
      <Footer />
    </footer>
  </div>
);

export default PublicLayout;
