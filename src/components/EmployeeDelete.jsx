import { useNavigate } from "react-router"

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
    } catch (error) {
      setError("Problema borrando empleado. Inténtelo de nuevo más tarde.");
    } finally {
      navigate("/employees-dashboard");
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

export default EmployeeDelete