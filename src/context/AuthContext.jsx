import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estados principales
  const [user, setUser] = useState(null); // Objeto con info del usuario
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // 👉 Inicializamos el estado desde localStorage si hay token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwt_decode.default(storedToken)
        setUser(decoded);
      } catch (err) {
        console.error("Token inválido:", err);
        logout();
      }
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      
      localStorage.setItem('token', data.token);
      setToken(data.token);

      const decoded = jwt_decode.default(data.token)
      setUser(decoded);

      toast.success("Login exitoso");
    } catch (error) {
      console.error("Error login:", error);
      toast.error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.info("Sesión cerrada");
  };

  // GETTERS ÚTILES
  const getUserId = () => user?.id || null;
  const getFullName = () => user ? `${user.firstName} ${user.lastName}` : '';
  const getEmail = () => user?.email || '';
  const isLoggedIn = () => !!user;
  
  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      getUserId,
      getFullName,
      getEmail,
      isLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};
