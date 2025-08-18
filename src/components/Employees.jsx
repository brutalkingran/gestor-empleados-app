import { useEffect, useState } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "./EmployeeCard";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Employees = () => {
  const { employees, loading, fetchEmployees, totalCount } = useEmployeeContext();
  const navigate = useNavigate();

  const [ currentPage, setCurrentPage ] = useState(1);
  const limit = 6;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit)); // nunca menor a 1

  useEffect(() => {
    fetchEmployees( currentPage, limit );
  }, [ currentPage ]);

  if (loading) return <div><ClipLoader/></div>;
  if (!employees || employees.length === 0) return <div><p>No hay empleados</p></div>;

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Dashboard de Empleados
        </h1>
        <button onClick={() => navigate('/employee-create')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer">
          Añadir Empleado
        </button>
      </div>

      {/* Grid de empleados */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            EmployeeName={emp.employeeName}
            avatar={emp.photo}
            positionName={emp.positionName}
            rank={emp.rank}
            department={emp.department}
            isActive={emp.isActive}
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
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Employees;
