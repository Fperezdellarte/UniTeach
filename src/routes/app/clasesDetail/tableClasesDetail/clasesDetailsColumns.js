import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";
export const ClasesDetailsColumns = (handleRate,disabled) => [
  {
    title: "Materia",
    field: "Materia",
    cellStyle: { fontWeight: "bold" },
    width: "25%",
  },
  {
    title: "Horario",
    render: (row) => (
      <div>
        <div>{new Date(row.date).toLocaleDateString("es-ES")}</div>
        <div>{row.hour}</div>
      </div>
    ),
    width: "30%",
  },
  {
    title: "Aula",
    field: "Place",
    width: "15%",
  },
  {
    title: "Mentor",
    field: "Mentor",
    width: "20%",
  },
  {
    title: "Acciones",
    render: (row) => (
      <Button
        variant="contained"
        sx={{ bgcolor: yellow[600], color: "white" }}
        onClick={() => handleRate(row.mentorInfo.idUser)}
        disabled={disabled}
      >
        Calificar
      </Button>
    ),
    width: "10%",
  },
];
