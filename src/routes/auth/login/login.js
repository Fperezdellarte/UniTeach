import React from "react";
import { FormularioLogin } from "./FormLogin/formularioLogin";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../auth/authProvider";

const Login = () => {
  const { isAuthenticated, loading, handleLogin } = useAuth();

  const handleSubmitSuccess = (responseData) => {
    handleLogin({
      token: responseData.token,
      user: responseData.user,
    });
  };

  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/app/home" replace />;

  return (
    <div className="formularioLogin">
      <FormularioLogin onLoginSuccess={handleSubmitSuccess} />
    </div>
  );
};

export default Login;
