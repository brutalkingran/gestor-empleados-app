import { useNavigate } from 'react-router';
import logo from '../assets/icon.svg';
import logo_dark from '../assets/icon_dark.svg';
import { ButtonNavbar } from './ui/Buttons';
import { AiOutlineMoon } from "react-icons/ai";
import { AiOutlineSun } from "react-icons/ai";
import { useThemeContext } from '../context/ThemeContext';
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuthContext()

  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useThemeContext();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const loggedIn = isLoggedIn();
  
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-blue-600 dark:bg-purple-900 text-slate-300 z-50">
      {/* Logo */}
      <a className="text-xl font-bold cursor-pointer flex flex-row items-center" href="/"> 
        <img src={ darkMode ? logo_dark : logo } width={"25%"} alt="logo GestEX" />
        <h1>Gest<span className='text-blue-800 dark:text-indigo-300'>EX</span></h1>
      </a>

      {/* Menú */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <ButtonNavbar text={"Inicio"} to={"/"}/>
        {
          loggedIn
          &&
            <>
              <ButtonNavbar text={"Empleados"} to={"/employees-dashboard"}/>
              <ButtonNavbar text={"Agregar empleado"} to={"/employee-create"}/>
            </>
        }
        {
          (loggedIn && user.rank.permissions.includes("manage_all_employees"))
          && <ButtonNavbar text={"Usuarios"} to={"/profiles-dashboard"}/>
        }
        <ButtonNavbar text={"Acerca de"} to={"/about"}/>
        <ButtonNavbar text={"Contacto"} to={"/contact"}/>
      </div>

      {/* Perfil / modo oscuro */}
      <div className="flex items-center gap-4">
        {
          !loggedIn
          ?
            <>
              <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 cursor-pointer flex flex-row items-center" onClick={() => navigate("/login")}>
                <span className='md:mr-2'>Ingresar</span>
              </button>
            </>
          : 
          <>
            <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 cursor-pointer flex flex-row items-center" onClick={() => navigate(`/profile/${user.id}`)}>
              <span className='md:mr-2'><AiOutlineUser /></span><span className='hidden md:flex'>Mi perfil</span>
            </button>
            <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 cursor-pointer flex flex-row items-center" onClick={() => logout()}>
              <span className='md:mr-2'>Cerrar Sesión</span>
            </button>
          </>
        }
        
        <button className="hidden md:flex text-xl hover:scale-110 transition cursor-pointer" onClick={ () => setDarkMode( !darkMode ) }>
          { darkMode ? <AiOutlineMoon /> : <AiOutlineSun /> }
        </button>
        <button className='md:hidden' onClick={ () => setIsModalOpen(!isModalOpen) }>
          <AiOutlineMenu />
        </button>
      </div>

      {/* BUTTONS MOBILE */}
      <div
        className={`
          text-center fixed top-16 right-0.5 w-full transition-all duration-300 bg-white md:hidden shadow-2xl z-50
          ${isModalOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <ul className="flex flex-col">
          <li className="bg-palette-light-100 text-white dark:bg-palette-dark-100 p-2 border-b border-black"><ButtonNavbar to={"/employees-dashboard"} text="Empleados" styles='text-black'/></li>
          <li className="bg-palette-light-200 text-white dark:bg-palette-dark-200 p-2 border-b border-black"><ButtonNavbar to={"/employee-create"} text="Agregar Empleado" styles='text-black'/></li>
          <li className="bg-palette-light-300 text-white dark:bg-palette-dark-300 p-2 border-b border-black"><ButtonNavbar to={"/about"} text="Acerca de" styles='text-black'/></li>
          <li className="bg-palette-light-400 text-white dark:bg-palette-dark-400 p-2 border-b border-black"><ButtonNavbar to={"/contact"} text="Contacto" styles='text-black'/></li>
        </ul>
      </div>

      {/* Boton theme para móviles */}
      <div
        className="md:hidden fixed bottom-5 right-5 rounded-full p-2 cursor-pointer shadow-lg dark:text-white text-white bg-blue-950 dark:bg-blue-400 z-50"
        onClick={() => setDarkMode(!darkMode)}
      >
        { darkMode ? <AiOutlineMoon size={30} /> : <AiOutlineSun size={30} /> }
      </div>
    </header>
  );
}

export default Navbar