import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext)

export const EmployeeProvider = ({ children }) => {
  const [ employees, setEmployees ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ totalCount, setTotalCount ] = useState(0);

  // GET
  const fetchEmployees = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/employees?page=${page}&limit=${limit}`, {
        params: { page, limit }
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

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, loading, fetchEmployees, addEmployee, editEmployee, deleteEmployee, totalCount }}>
      {children}
    </EmployeeContext.Provider>
  );
};
