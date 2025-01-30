import { formatDate } from "../../../../utils/formatDate";

export const ClasesRecientesColumns = [
  {
    title: "Materia",
    field: "Materia",
    cellStyle: { fontWeight: 500 },
  },
  {
    title: "Fecha y Hora",
    render: (row) => formatDate(row.date, row.hour),
    
  },
  {
    title: "Aula",
    field: "Place",
    headerStyle: { width: "30%" },
  },
];
