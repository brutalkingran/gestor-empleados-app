import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenido que se expande */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <Outlet />
      </main>

      {/* Footer abajo */}
      <Footer />
    </div>
  );
}

export default MainLayout;