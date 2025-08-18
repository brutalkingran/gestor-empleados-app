import { useNavigate, useParams } from "react-router";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useState } from "react";

const EmployeeDelete = () => {
  const { id } = useParams();
  const { employees, deleteEmployee } = useEmployeeContext();
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();
  const employee = employees.find(emp => String(emp.id) === String(id));

  const onHandleDelete = async () => {
    setError(null);

    try {
      await deleteEmployee(id);
      navigate("/employees-dashboard");
    } catch (error) {
      setError("Problema borrando empleado. Inténtelo de nuevo más tarde.");
    }
  }

  return (
    <>
      {
        employee
        ?
          <div>
            <h2>Estás seguro que deseas borrar a { employee.employeeName }</h2>

            <button onClick={onHandleDelete}>
              Sí
            </button>

            <button onClick={() => navigate(-1)}>
              No
            </button>
          </div>
        :
          <h1>Empleado no encontrado</h1>
      }
    </>
  )
}

export default EmployeeDelete;