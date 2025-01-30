import React from "react";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { ClasesDetailsColumns } from "./clasesDetailsColumns";
import { Padding } from "@mui/icons-material";

export const TableClases = ({ data, error, loading, onRateClick }) => (
  <>
    {console.log(data)}
    <MuiTableContainer
      title="Clases Recientes"
      columns={ClasesDetailsColumns(onRateClick)}
      data={data}
      loading={loading}
      error={error}
      emptyMessage="No tienes clases disponibles"
    clasname="table-clases-recientes"
      customStyles={{
        container: { margin: {xs: "20px 40px 0 0", sm: "20px 100px 50px 50px"} },
        title: { color: "#2c3e50", fontWeight: "bold"},
        header: {backgroundColor: "#3498db", color: "white", fontSize: "1.2em", padding: "20px 20px"},
      }}
    />
  </>
);
