import React from "react";
import { MuiTableContainer } from "../../../../components/table/tableContainer";
import { ClasesDetailsColumns } from "./clasesDetailsColumns";

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
      customStyles={{
        container: { margin: "20px 0" },
        title: { color: "#2c3e50" },
        header: { backgroundColor: "#f5f6fa" },
      }}
    />
  </>
);
