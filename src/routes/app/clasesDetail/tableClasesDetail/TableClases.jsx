import React from "react";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { ClasesDetailsColumns } from "./clasesDetailsColumns";
import { useTheme } from "../../../../contexts/themeContext";

export const TableClases = ({ data, error, loading, onRateClick }) => {
  const { theme } = useTheme();

  return (
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
          color: theme.palette.mode === "dark" ? "#ffffff" : "#2c3e50",
          fontSize: "1.5rem",
          margin: "0px",
          fontWeight: "bold",
          transition: "color 0.3s ease",
        },
        header: {
          backgroundColor: "#3498db",
          color: "white",
          fontSize: "1.2em",
        },
      }}
    />
  );
};
