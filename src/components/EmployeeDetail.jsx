import { useNavigate, useParams } from "react-router"
import { useEmployeeContext } from "../context/EmployeeContext";
import { calculateAge } from "../services/calculateAge";

const EmployeeDetail = () => {
  const { id } = useParams();
  const { employees } = useEmployeeContext();
  const navigate = useNavigate();
  const employee = employees.find(emp => String(emp._id) === String(id));

  return (
    <>
      {
        employee
        ?
          <div className="flex flex-col items-center text-center bg-blue-100 p-10 rounded text-blue-900 w-250">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-5">
              <img
                src={employee.photo}
                alt={"foto de " + employee.firstName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                }}
              />
            </div>
            <h2 className="font-bold text-2xl mb-3">{employee.firstName} {employee.lastName}</h2>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Número de Teléfono:</strong> {employee.phoneNumber }</p>
            <p><strong>Puesto:</strong> {employee.position}</p>
            <p><strong>Rango:</strong> {employee?.rank?.name ?? "-"}</p>
            <p><strong>Departamento:</strong> {employee.department.name}</p>
            <p><strong>Fecha de ingreso:</strong> {new Date(employee.hireDate).toLocaleDateString()}</p>
            <p><strong>Fecha de nacimiento:</strong> {new Date(employee.birthday).toLocaleDateString() }</p>
            <p><strong>Activo:</strong> {employee.isActive ? "Sí" : "No"}</p>
            <p><strong>salario:</strong> ${employee.salary}</p>
            <p><strong>Edad:</strong> {calculateAge(employee.birthday) }</p>
            <p><strong>Sexo:</strong> {employee.sex }</p>
            <p><strong>Nivel de Estrés:</strong> {employee.stressLevel }</p>
            <p><strong>Notas:</strong> {employee.notes}</p>

            <div className="flex flex-row items-center m-3">
              <button onClick={() => navigate(-1)} className="mr-2 px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-300 cursor-pointer">
                Regresar
              </button>

              <button onClick={ () => navigate(`/employee/${employee._id}/edit`) } className="mr-2 px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-300 cursor-pointer">
                Editar
              </button>

              <button onClick={ () => navigate(`/employee/${employee._id}/delete`) } className="mr-2 px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-300 cursor-pointer">
                Borrar
              </button>
            </div>
          </div>
        :
          <div className="flex flex-col items-center">
            <h1 className="text-neutral-600 italic mb-3">- Empleado no encontrado -</h1>
            <button onClick={() => navigate(-1)} className="mr-2 px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-300 cursor-pointer">
              Regresar
            </button>
          </div>

      }
    </>
  )
}

export default EmployeeDetail;
