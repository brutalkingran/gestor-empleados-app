import { useNavigate, useParams } from "react-router"
import { useEmployeeContext } from "../context/EmployeeContext";

const EmployeeDetail = () => {
  const { id } = useParams();
  const { employees } = useEmployeeContext();
  const navigate = useNavigate();
  const employee = employees.find(emp => String(emp.id) === String(id));

  return (
    <>
      {
        employee
        ?
          <div>
            <img src={employee.photo} alt={employee.employeeName} width="200" />
            <h2>{employee.employeeName}</h2>
            <p><strong>Email:</strong> {employee.employeeEmail}</p>
            <p><strong>Rango:</strong> {employee.rank}</p>
            <p><strong>Puesto:</strong> {employee.positionName}</p>
            <p><strong>Departamento:</strong> {employee.department}</p>
            <p><strong>Fecha de ingreso:</strong> {new Date(employee.entryDate).toLocaleDateString()}</p>
            <p><strong>Notas:</strong> {employee.notes}</p>
            <p><strong>Activo:</strong> {employee.isActive ? "Sí" : "No"}</p>

            <button onClick={() => navigate(-1)}>
              Regresar
            </button>

            <button onClick={ () => navigate(`/employee/${employee.id}/edit`) }>
              Editar
            </button>

            <button onClick={ () => navigate(`/employee/${employee.id}/delete`) }>
              Borrar
            </button>
          </div>
        :
          <h1>Empleado no encontrado</h1>
      }
    </>
  )
}

export default EmployeeDetail;
