import { useNavigate, useParams } from "react-router";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EmployeeDelete = () => {
  const { id } = useParams();
  const { employees, deleteEmployee } = useEmployeeContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const employee = employees.find(emp => String(emp.id) === String(id));

  useEffect(() => {
    if (!employee) return;

    Swal.fire({
      title: `¿Estás seguro que deseas borrar a ${employee.employeeName}?`,
      text: "Esta operación no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEmployee(id);

          Swal.fire({
            title: "Operación realizada con éxito!",
            text: "El empleado ha sido eliminado.",
            icon: "success",
            confirmButtonText: "Aceptar"
          });

          navigate("/employees-dashboard");
        } catch (err) {
          setError("Problema borrando empleado. Inténtelo de nuevo más tarde.");
        }
      } else {
        navigate("/employees-dashboard"); // Si cancela, vuelve atrás
      }
    });
  }, [employee, deleteEmployee, id, navigate]);

  if (!employee) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h1 className="text-2xl font-bold">Empleado no encontrado</h1>
      </div>
    );
  }

  // Solo renderizamos algo si hay error
  return error ? (
    <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
  ) : null;
};

export default EmployeeDelete;
