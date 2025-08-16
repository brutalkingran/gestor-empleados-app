import { useNavigate, useParams } from "react-router-dom"
import { useEmployeeContext } from "../context/EmployeeContext";
import { useEffect, useState } from "react";

const EmployeeUpdate = () => {
  const [ employeeName, setEmployeeName ] = useState("");
  const [ employeeEmail, setEmployeeEmail ] = useState("");
  const [ rank, setRank ] = useState("");
  const [ positionName, setPositionName ] = useState("");
  const [ department, setDepartment ] = useState("");
  const [ entryDate, setEntryDate ] = useState("");
  const [ photo, setPhoto ] = useState("");
  const [ notes, setNotes ] = useState("");
  const [ isActive, setIsActive ] = useState(false);
  const [ error, setError ] = useState(null);

  const { id } = useParams();
  const { employees, editEmployee } = useEmployeeContext();
  const navigate = useNavigate();

  // Cargar datos del empleado existente
  useEffect(() => {
    const employee = employees.find(emp => String(emp.id) === String(id));
    if (employee) {
      setEmployeeName(employee.employeeName);
      setEmployeeEmail(employee.employeeEmail);
      setRank(employee.rank);
      setPositionName(employee.positionName);
      setDepartment(employee.department);
      setEntryDate(employee.entryDate.split("T")[0]); // formato YYYY-MM-DD
      setPhoto(employee.photo);
      setNotes(employee.notes);
      setIsActive(employee.isActive);
    }
  }, [id, employees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación simple
    if (!employeeName || !employeeEmail) {
      setError("Nombre y email son obligatorios");
      return;
    }

    // Llamada a API
    try {
      await editEmployee(id, { 
        employeeName, 
        employeeEmail, 
        rank, 
        positionName, 
        department, 
        entryDate, 
        photo, 
        notes, 
        isActive 
      });
      navigate("/employees"); // ajustar la ruta a donde quieras volver
    } catch (error) {
      setError("Problema actualizando empleado. Inténtelo de nuevo más tarde.");
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Actualizar empleado</h2>

          {error && <p>{error}</p> }

          <form onSubmit={ handleSubmit }>
            <input
              type="text"
              placeholder="Nombre"
              value={ employeeName }
              onChange={ (e) => setEmployeeName( e.target.value ) }
            />

            <input
              type="email"
              placeholder="Email"
              value={ employeeEmail }
              onChange={ (e) => setEmployeeEmail( e.target.value ) }
            />

            <input
              type="number"
              placeholder="Rango"
              value={ rank }
              onChange={ (e) => setRank( e.target.value ) }
            />

            <input
              type="text"
              placeholder="Puesto"
              value={ positionName }
              onChange={ (e) => setPositionName( e.target.value ) }
            />

            <input
              type="text"
              placeholder="Departamento"
              value={ department }
              onChange={ (e) => setDepartment( e.target.value ) }
            />

            <input
              type="date"
              placeholder="Fecha de ingreso"
              value={ entryDate }
              onChange={ (e) => setEntryDate( e.target.value ) }
            />

            <input
              type="text"
              placeholder="URL de la foto"
              value={ photo }
              onChange={ (e) => setPhoto( e.target.value ) }
            />

            <textarea
              placeholder="Notas"
              value={ notes }
              onChange={ (e) => setNotes( e.target.value ) }
            />

            <label>
              Activo:
              <input
                type="checkbox"
                checked={ isActive }
                onChange={ (e) => setIsActive( e.target.checked ) }
              />
            </label>

            <button type="submit">
              Actualizar empleado
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EmployeeUpdate;
