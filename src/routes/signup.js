import React from 'react';
import { FormularioSignUp } from '../components/formularioSignUp';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';
import Navbar from '../components/navbar';


export const Signup = () => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
<div>
<Navbar/> 

    <div className='formularioSignup'>
      <FormularioSignUp />
    </div>

</div>
  
  );
}

export default Signup;
