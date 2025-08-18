import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext)

export const EmployeeProvider = ({ children }) => {
  const [ employees, setEmployees ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  // GET
  const fetchEmployees = async ( ) => {
    try {
      const { data } = await axios.get(`${BASE_URL}empleado`);

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees: ", error);
    } finally {
      setLoading(false);
    }
  }

  // POST
  const addEmployee = async ( employeeData ) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/empleado`, employeeData);

      setEmployees((prev) => [...prev, data]);

    } catch (error) {
      console.error("Error adding employees: ", error);
    } finally {
      setLoading(false);
    }
  }

  // PUT
  const editEmployee = async ( id, updatedData ) => {
    setLoading(true);

    try {
      const { data } = await axios.put(`${BASE_URL}/empleado/${id}`, updatedData);

      setEmployees((prev) => prev.map((employee) => employee.id === id ? data : employee));

    } catch (error) {
      console.error("Error editing employees: ", error);
    } finally {
      setLoading(false);
    }
  }

  // DELETE
  const deleteEmployee = async ( id ) => {
    setLoading(true);

    try {
      const { data } = await axios.delete(`${BASE_URL}/empleado/${id}`);

      setEmployees((prev) => prev.filter((employee) => employee !== data));

    } catch (error) {
      console.error("Error deleting employees: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, loading, fetchEmployees, addEmployee, editEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
