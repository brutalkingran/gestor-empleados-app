import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

export const RequireAuth = ({ children }) => {
  const { user } = useAuthContext(); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const RequireAdmin = ({ children }) => {
  const { user } = useAuthContext(); 

  if (user.rank.name !== "Boss" || user.rank.name !== "HR") {
    return <Navigate to="/403" replace />;
  }

  return children;
}
