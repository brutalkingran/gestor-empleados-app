import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Sobre esta aplicación
      </h1>

      <p className="text-gray-700 mb-4">
        Este gestor de usuarios fue diseñado para ayudar a las empresas a
        mantener un control eficiente de sus empleados. Con esta app, puedes
        crear, editar y eliminar perfiles de manera sencilla y rápida.
      </p>

      <p className="text-gray-700 mb-4">
        Además, permite organizar información clave como puestos, departamentos,
        rangos, fechas de ingreso y más. El objetivo principal es ofrecer una
        experiencia intuitiva y moderna para la administración de personal.
      </p>

      <p className="text-gray-700 mb-6">
        Futuras versiones incluirán reportes personalizados, integración con
        otros sistemas de recursos humanos y paneles interactivos de análisis.
      </p>

      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          ⬅ Volver
        </button>
      </div>
    </div>
  );
};

export default About;
