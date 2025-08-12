import axios from "axios";

const apiKey = import.meta.env.VITE_BASE_URL

export const fetchEmployees = async ( ) => {
  const response = await axios.get(`${apiKey}empleado`);
  
  return response.data
}

export const fetchEmployee = async ( id ) => {
  const response = await axios.get(`${apiKey}empleado/${id}`);
  
  return response.data
}

export const fetchProfiles = async ( ) => {
  const response = await axios.get(`${apiKey}perfil`);
  
  return response.data
}

export const fetchProfile = async ( id ) => {
  const response = await axios.get(`${apiKey}perfil/${id}`);
  
  return response.data
}