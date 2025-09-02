import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;