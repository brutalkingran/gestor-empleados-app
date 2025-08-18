import { useEmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "./EmployeeCard";
import { useNavigate } from "react-router";

const Employees = () => {
  const { employees, loading } = useEmployeeContext();
  const navigate = useNavigate();

  if (loading) return <p>Cargando empleados...</p>;
  if (!employees || employees.length === 0) return <p>No hay empleados</p>;

  return (
    <div>
      <h1>Dashboard de Empleados</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
            onClickDetails={() => navigate(`/employee/${emp.id}`)} // Ir a detalles
            onClickEdit={() => navigate(`/employee/${emp.id}/edit`)} // Ir a edit
            onClickDelete={() => navigate(`/employee/${emp.id}/delete`)} // Ir a edit
          />
        ))}
      </div>
    </div>
  );
};

export default Employees;
