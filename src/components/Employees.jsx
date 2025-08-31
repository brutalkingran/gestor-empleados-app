import { useEffect } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "./EmployeeCard";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { exportToCSV } from "../services/exportToCSV";

const Employees = () => {
  const { employees, loading, fetchEmployees, totalCount } = useEmployeeContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🔽 valores desde la URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "firstName";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const limit = 10;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  // 📌 cada vez que cambian los query params → fetch
  useEffect(() => {
    fetchEmployees(currentPage, limit, sortBy, sortOrder);
  }, [currentPage, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="flex flex-col text-center items-center">
        <ClipLoader color="#0000FF" size={200}/>
        <p className="text-blue-400">Cargando...</p>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-2 text-neutral-500 italic">- No hay empleados -</p>
        <button
          onClick={() => navigate('/employee-create')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer mb-5"
        >
          Añadir Empleado
        </button>
      </div>
    );
  }
  
  return (
    <div className="md:p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center dark:text-white">
          Dashboard de Empleados
        </h1>

        {/* Botón de crear */}
        <button
          onClick={() => navigate('/employee-create')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer mb-5"
        >
          Añadir Empleado
        </button>

        {/* Controles de orden */}
        <div className="flex items-center space-x-4 mb-6">
        <label className="text-gray-700">Ordenar por:</label>
        <select
          value={sortBy}
          onChange={(e) => setSearchParams({ page: currentPage, sortBy: e.target.value, sortOrder })}
          className="px-2 py-1 border rounded"
        >
          <option value="firstName">Nombre</option>
          <option value="lastName">Apellido</option>
          <option value="department">Departamento</option>
          <option value="rank">Rango</option>
          <option value="isActive">Activo</option>
          <option value="birthday">Fecha de Nacimiento</option>
          <option value="salary">Salario</option>
        </select>

        <button
          onClick={() => setSearchParams({ page: currentPage, sortBy, sortOrder: "asc" })}
          className={`px-3 py-1 rounded ${sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Asc
        </button>
        <button
          onClick={() => setSearchParams({ page: currentPage, sortBy, sortOrder: "desc" })}
          className={`px-3 py-1 rounded ${sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Desc
        </button>
      </div>

      {/* Grid de empleados */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
        {employees.map((emp) => (
          <EmployeeCard
            key={emp._id}
            EmployeeName={`${emp.firstName} ${emp.lastName}`}
            email={emp.email}
            phoneNumber={emp.phoneNumber}
            positionName={emp.position}
            rank={emp.rank}
            department={emp.department}
            entryDate={emp.hireDate}
            isActive={emp.isActive}
            salary={emp.salary}
            age={emp.birthday}
            sex={emp.sex}
            stressLevel={emp.stressLevel}
            photo={emp.photo}
            notes={emp.notes}
            onClickDetails={() => navigate(`/employee/${emp._id}`)}
            onClickEdit={() => navigate(`/employee/${emp._id}/edit`)}
            onClickDelete={() => navigate(`/employee/${emp._id}/delete`)}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={() =>
            setSearchParams({ page: Math.max(currentPage - 1, 1), sortBy, sortOrder })
          }
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() =>
            setSearchParams({ page: Math.min(currentPage + 1, totalPages), sortBy, sortOrder })
          }
          disabled={currentPage === totalPages || employees.length === 0}
        >
          Siguiente
        </button>

        <button
          onClick={() => exportToCSV(employees)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Exportar a CSV
        </button>
      </div>
    </div>
    </div>
  );
};

export default Employees;
