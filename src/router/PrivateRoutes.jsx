import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

// Solo verifica que esté logeado
const PrivateRoutes = () => {
  const { user } = useAuthContext();
  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

// Verifica que esté logeado y sea admin (boss o hr)
const AdminRoutes = () => {
  const { user } = useAuthContext();

  // Ajusta según cómo tengas el rol en tu user object
  const isAdmin = user && (user.rank === "boss" || user.rank === "hr");

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export { PrivateRoutes, AdminRoutes };