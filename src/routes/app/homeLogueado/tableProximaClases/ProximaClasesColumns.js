import { Button, dividerClasses } from "@mui/material";

export const ProximaClasesColumns = (handleAction) => [
  {
    title: "Materia",
    field: "Materia",
    cellStyle: { fontWeight: "bold" },
  },
  {
    title: "Fecha",
    field: "date",
  },
  {
    title: "Hora",
    field: "hour",
  },
  {
    title: "Aula",
    field: "Place",
  },
  {
    title: "Mentor",
    field: "Mentor",
    render: (row) => row.Mentor || "Sin Mentor",
  }, {
    title: "Meet",
    render: (row) => (               
    <button
    >📆
    </button>),
 
  },
  {
    title: "Acciones",
    render: (row) => (
      <Button
        variant="contained"
        color="error"
        onClick={() => handleAction(row.idInscription)}
      >
        Eliminar
      </Button>
    ),
  },
];
