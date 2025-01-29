import React, { useState } from "react";
import { FormularioSignUp } from "./formSignup/formularioSignUp";
import { CheckCircleOutline } from "@mui/icons-material";
import { Alert } from "@mui/material";

export const Signup = () => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div className="formularioSignup">
      {showAlert && (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
          onClose={() => setShowAlert(false)}
        >
          Registro completado con éxito. Serás redirigido en unos segundos...
        </Alert>
      )}
      <FormularioSignUp setShowAlert={setShowAlert} />
    </div>
  );
};

export default Signup;
