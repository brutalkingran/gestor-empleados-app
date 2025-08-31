import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext)

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [ranks, setRanks] = useState([]);
  const [departments, setDepartments] = useState([]);

  // 👉 Nuevo estado
  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");

  // GET
  const fetchEmployees = async (page = 1, limit = 20, sortByParam = sortBy, sortOrderParam = sortOrder) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/employees`, {
        params: { page, limit, sortBy: sortByParam, sortOrder: sortOrderParam }
      });

      setEmployees(data.data);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.warn("Error cargando empleados");
    } finally {
      setLoading(false);
    }
  };

  // POST
  const addEmployee = async ( employeeData ) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}empleado`, employeeData);

      setEmployees((prev) => [...prev, data]);

    } catch (error) {
      console.error("Error adding employees: ", error);
      toast.warn("Error al añadir empleado");
    } finally {
      setLoading(false);
      toast.success("Empleado añadido con éxito");
    }
  }

  // PUT
  const editEmployee = async ( id, updatedData ) => {
    setLoading(true);

    try {
      const { data } = await axios.put(`${BASE_URL}empleado/${id}`, updatedData);

      setEmployees((prev) => prev.map((employee) => employee.id === id ? data : employee));

    } catch (error) {
      console.error("Error editing employees: ", error);
      toast.warn("Error al editar empleado");
    } finally {
      setLoading(false);
      toast.info("Empleado editado con éxito");
    }
  }

  // DELETE
  const deleteEmployee = async ( id ) => {
    setLoading(true);

    try {
      const { data } = await axios.delete(`${BASE_URL}empleado/${id}`);

      setEmployees((prev) => prev.filter((employee) => String(employee.id) !== String(id)));

    } catch (error) {
      console.error("Error deleting employees: ", error);
      toast.warn("Error al eliminar empleado");
    } finally {
      setLoading(false);
      toast.info("Empleado eliminado con éxito");
    }
  }

  // Fetch de ranks
  const fetchRanks = async () => {
    try {
      console.log("A");
      // const { data } = await axios.get(`${BASE_URL}/ranks`);
      // setRanks(data);
    } catch (err) {
      console.error("Error cargando ranks", err);
    }
  };

  // Fetch de departments
  const fetchDepartments = async () => {
    try {
      console.log("A");
      
      // const { data } = await axios.get(`${BASE_URL}/departments`);
      // setDepartments(data);
    } catch (err) {
      console.error("Error cargando departments", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchRanks();
    fetchDepartments();
  }, []);

  return (<EmployeeContext.Provider value={{
    employees,
    ranks,
    departments,
    loading,
    fetchEmployees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    totalCount,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
  }}>
    {children}
  </EmployeeContext.Provider>
  );
};
