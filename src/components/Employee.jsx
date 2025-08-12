import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchEmployee } from "../services/MockAPI";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    setEmployeeData( fetchEmployee(id) );
  }, [])
  

  return (
    <div>
      <h1>
        Employee ID: { id || "inválido" }
      </h1>

      <ul>
        {
          !employeeData
            ? "No encontrado"
            : employeeData.map( (data, key) =>
              <li key={key}>{ data }</li>
            )
        }
      </ul>
    </div>
  )
}

export default Employee;