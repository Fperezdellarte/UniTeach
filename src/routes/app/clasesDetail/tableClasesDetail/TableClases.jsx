import React from "react";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { ClasesDetailsColumns } from "./clasesDetailsColumns";

export const TableClases = ({ data, error, loading, onRateClick }) => (
  <>
    <MuiTableContainer
      title="Clases Recientes"
      columns={ClasesDetailsColumns(onRateClick)}
      data={data}
      loading={loading}
      error={error}
      emptyMessage="No tienes clases disponibles"
      clasname="table-clases-recientes"
      customStyles={{
        title: {
          color: "#2c3e50",
          fontSize: "1.5rem",
          margin: " 0px",
          fontWeight: "bold",
        },
        header: {
          backgroundColor: "#3498db",
          color: "white",
          fontSize: "1.2em",
        },
      }}
    />
  </>
);
