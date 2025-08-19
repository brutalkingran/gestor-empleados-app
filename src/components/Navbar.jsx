import logo from '../assets/icon.svg';
import { ButtonNavbar } from './ui/Buttons';

const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-blue-600 text-white">
      {/* Izquierda - Logo */}
      <a className="text-xl font-bold cursor-pointer flex flex-row items-center" href="/"> 
        <img src={logo} width={"25%"} alt="logo GestEX" />
        <h1>Gest<span className='text-blue-800'>EX</span></h1>
      </a>

      {/* Centro - Menú */}
      <div className="flex gap-6 text-sm font-medium">
        <ButtonNavbar text={"Empleados"} to={"/employees-dashboard"}/>
        <ButtonNavbar text={"Agregar empleado"} to={"/employee-create"}/>
        <ButtonNavbar text={"Acerca de"} to={"/about"}/>
        <ButtonNavbar text={"Contacto"} to={"/contact"}/>
      </div>

      {/* Derecha - Perfil y modo oscuro */}
      <div className="flex items-center gap-4">
        <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">
          Mi perfil
        </button>
        <button className="text-xl hover:scale-110 transition">
          🌙
        </button>
      </div>
    </header>
  );
}

export default Navbar