import React from 'react'
import Navbar from '../components/navbar';
import { FormularioLogin } from '../components/formularioLogin';


export const Login = () => {
  return (
    <div className="home-container">
    <Navbar/>
    <div>
      <FormularioLogin/>
    </div>
  </div>
  )
}
export default Login;
