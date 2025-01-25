import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

const GuestOnlyRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
};

export default GuestOnlyRoute;
