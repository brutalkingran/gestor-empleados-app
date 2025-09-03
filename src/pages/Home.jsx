import { useAuthContext } from "../context/AuthContext";
import { ButtonNavbar } from "../components/ui/Buttons";

const Home = () => {
  const { isLoggedIn } = useAuthContext()

  const loggedIn = isLoggedIn();

  return (
    <section className="px-4 py-6">
      <div className="flex flex-col items-center text-center bg-blue-200 rounded-2xl p-6 md:p-12 dark:bg-slate-800 dark:border-2 dark:border-purple-700 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl mb-5 font-bold">
          Bienvenidos a Gest<span className="text-gray-800 dark:text-indigo-300">EX</span>
        </h1>

        <p className="mb-3 text-sm md:text-base">
          En esta aplicación, podrás gestionar todos los empleados de tu empresa, verificar su estado, ocupación, puesto, entre otros.
        </p>
        <p className="mb-6 text-sm md:text-base">
          ¿Te gustaría ver qué aptitudes poseen tus empleados? El botón de abajo te permitirá verlos a todos en tiempo real.
        </p>

        {/* <button
          onClick={}
          className=""
          </button>
        > */}
        { 
          loggedIn
          ?  <ButtonNavbar text={"Ir a Dashboard"} to={"/employees-dashboard"} styles="px-5 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all bg-blue-500 dark:bg-indigo-200 dark:text-indigo-400 dark:hover:bg-indigo-100 text-white cursor-pointer text-sm md:text-base"/>
          :  <ButtonNavbar text={"Ingresa a tu Cuenta"} to={"/login" } styles="px-5 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-all bg-blue-500 dark:bg-indigo-200 dark:text-indigo-400 dark:hover:bg-indigo-100 text-white cursor-pointer text-sm md:text-base"/>
        }
      </div>
    </section>
  );
}

export default Home