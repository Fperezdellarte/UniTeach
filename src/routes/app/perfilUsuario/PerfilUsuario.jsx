import React from "react";
import { FormPerfilUsuario } from "./formPerfilUsuario/FormPerfilUsuario";

export const PerfilUsuario = () => {
  return (
    <div>
      <h1>Tu perfil</h1>
      <section>
        <p>En esta sección podrás ver y editar tu perfil</p>
        <FormPerfilUsuario />
      </section>
    </div>
  );
};
