import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

// Solo verifica que esté logeado
export const PrivateRoutes = () => {
  const { user } = useAuthContext();
  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

// Verifica que esté logeado y sea admin (boss o hr)
export const AdminRoutes = () => {
  const { user } = useAuthContext();

  // Si el rank tiene la permission manage_all_employees o manage_profiles => es admin
  const isAdmin =
    user &&
    user.rank &&
    Array.isArray(user.rank.permissions) &&
    (
      user.rank.permissions.includes("manage_all_employees") ||
      user.rank.permissions.includes("manage_profiles")
    );

  return isAdmin ? <Outlet /> : <Navigate to="/forbidden" />;
};