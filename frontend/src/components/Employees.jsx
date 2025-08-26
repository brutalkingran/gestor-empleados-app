import { useEffect, useState } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "./EmployeeCard";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { getEmployeeLevel } from "../services/EmployeeLevel";
// TODO: AÑADIR ORDENES
const Employees = () => {
  const { employees, loading, fetchEmployees, totalCount } = useEmployeeContext();
  const navigate = useNavigate();

  const [ currentPage, setCurrentPage ] = useState(1);
  const limit = 20;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit)); // nunca menor a 1

  useEffect(() => {
    fetchEmployees( currentPage, limit );
  }, [ currentPage ]);

  if (loading) return <div className="flex flex-col text-center items-center"> <ClipLoader color="#0000FF" size={200}/> <p className="text-blue-400">Cargando...</p> </div>;

  if (!employees || employees.length === 0) return <div className="text-center"><p className="mb-2 text-neutral-500 italic">- No hay empleados -</p> <button onClick={() => navigate('/employee-create')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer mb-5"> Añadir Empleado </button> </div>;
  
  return (
    <div className="md:p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center dark:text-white">
          Dashboard de Empleados
        </h1>
        <button onClick={() => navigate('/employee-create')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer mb-5">
          Añadir Empleado
        </button>
      </div>

      {/* Grid de empleados */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            EmployeeName={emp.employeeName}
            avatar={emp.photo}
            positionName={emp.positionName}
            rank={ getEmployeeLevel(emp.rank) }
            department={emp.department}
            isActive={emp.isActive}
            entryDate={emp.entryDate}
            employeeEmail={emp.employeeEmail}
            phoneNumber={emp.phoneNumber}
            sex={emp.sex}
            age={emp.age}
            stressLevel={emp.stressLevel}
            notes={emp.notes}
            onClickDetails={() => navigate(`/employee/${emp.id}`)}
            onClickEdit={() => navigate(`/employee/${emp.id}/edit`)}
            onClickDelete={() => navigate(`/employee/${emp.id}/delete`)}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Anterior
        </button>

        <span className="text-gray-700">
          Página <span className="font-semibold">{currentPage}</span> de{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || employees.length === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Employees;
