
import { useState } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";

const EmployeeCreate = () => {
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

  const { addEmployee } = useEmployeeContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación simple
    if (!employeeName || !employeeEmail) {
      setError("Nombre y correo son obligatorios");
      return;
    }

    // Llamada a API
    try {
      await addEmployee({
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

      navigate("/employees"); // ajusta la ruta a donde quieras volver
    } catch (error) {
      setError("Problema creando empleado. Inténtelo de nuevo más tarde.");
    } finally {
      // Limpiar campos
      setEmployeeName("");
      setEmployeeEmail("");
      setRank("");
      setPositionName("");
      setDepartment("");
      setEntryDate("");
      setPhoto("");
      setNotes("");
      setIsActive(false);
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Añadir nuevo empleado</h2>

          {error && <p>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre del empleado"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
            />

            <input
              type="number"
              placeholder="Rango"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
            />

            <input
              type="text"
              placeholder="Puesto"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Departamento"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />

            <input
              type="date"
              placeholder="Fecha de ingreso"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="URL de la foto"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />

            <textarea
              placeholder="Notas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <label>
              Activo:
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </label>

            <button type="submit">
              Guardar Empleado
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeCreate