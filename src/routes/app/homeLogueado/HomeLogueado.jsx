import React from "react";
import "./HomeLogueado.css";
import { TablaProximaClase } from "./tableProximaClases/TablaProximaClase";
import { TablaClasesRecientes } from "./tableClasesRecientes/TablaClasesRecientes";
import { Mentores } from "./mentoresRecientes/MentoresRecientes";

export const HomeLogueado = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <TablaClasesRecientes />
          </div>
          <div className="col-md-8">
            <TablaProximaClase />
          </div>
        </div>
      </div>

      <div style={blockStyle}>
        <Mentores />
      </div>
    </div>
  );
};

const blockStyle = {
  border: "1px #ccc",
  margin: "2em",
};
