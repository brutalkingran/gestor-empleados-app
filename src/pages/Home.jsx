import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col items-center text-center bg-blue-200 rounded-3xl p-65 text-blue-900">
        <h1 className="text-3xl mb-5 font-bold">Bienvenidos a <span className="text-gray-800">Gest</span>EX</h1>

        <p className="mb-2">En esta aplicación, podrás gestionar todos los empleados de tu empresa, verificar su estado, ocupación, puesto, entre otros.</p>
        <p className="mb-6">¿Te gustaría ver qué aptitudes poseen tus empleados? El botón de abajo te permitirá verlos a todos en tiempo real.</p>

        <button onClick={() => navigate("/employees-dashboard")} className="p-3 rounded hover:bg-blue-100 hover:text-blue-600 transition-all bg-blue-500 text-white cursor-pointer">
          Ir a Dashboard
        </button>
      </div>
    </section>
  )
}

export default Home