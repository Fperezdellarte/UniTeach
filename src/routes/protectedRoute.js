import { Navigate, Outlet,  } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function ProtectedRoute(){
    const auth = useAuth();
return auth.isAuthenticated ? <Outlet/> : <Navigate to = "/login" />;
}

