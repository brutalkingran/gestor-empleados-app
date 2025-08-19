import { useState } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2"; // 👈 importa sweetalert2

const EmployeeCreate = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [rank, setRank] = useState("");
  const [positionName, setPositionName] = useState("");
  const [department, setDepartment] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [notes, setNotes] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [stressLevel, setStressLevel] = useState("");

  const { addEmployee } = useEmployeeContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos obligatorios
    if (
      !employeeName ||
      !employeeEmail ||
      rank === "" ||
      !positionName ||
      !department ||
      !entryDate ||
      !photo ||
      !phoneNumber ||
      !sex ||
      !age ||
      !stressLevel ||
      !notes
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    }

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
        isActive,
        phoneNumber,
        sex,
        age,
        stressLevel,
      });

      Swal.fire({
        icon: "success",
        title: "Empleado creado",
        text: "El nuevo empleado fue añadido correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/employees-dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "Hubo un problema creando el empleado. Inténtalo más tarde.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        Añadir nuevo empleado
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del empleado"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={employeeEmail}
          onChange={(e) => setEmployeeEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={rank}
          onChange={(e) => setRank(Number(e.target.value))}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Selecciona un rango
          </option>
          <option value={0}>Trainee</option>
          <option value={1}>Junior</option>
          <option value={2}>Semi-Senior</option>
          <option value={3}>Mid</option>
          <option value={4}>Senior</option>
          <option value={5}>Lead</option>
          <option value={6}>Manager</option>
        </select>

        <input
          type="text"
          placeholder="Puesto"
          value={positionName}
          onChange={(e) => setPositionName(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Departamento"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="URL de la foto"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Seleccionar sexo</option>
          <option value="female">Femenino</option>
          <option value="male">Masculino</option>
        </select>

        <input
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Nivel de estrés (0-100)"
          value={stressLevel}
          onChange={(e) => setStressLevel(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Notas"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-gray-700">Activo</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar Empleado
        </button>
      </form>
    </div>
  );
};

export default EmployeeCreate;
