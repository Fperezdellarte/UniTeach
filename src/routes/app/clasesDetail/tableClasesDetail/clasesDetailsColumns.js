import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";
export const ClasesDetailsColumns = (onRateClick, disabled) => [
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
    render: (row) => {
      const alreadyRated = row.ratingMentor !== null;

      return (
        <Button
          variant="contained"
          sx={{ bgcolor: alreadyRated ? "gray" : yellow, color: "white" }}
          onClick={() => onRateClick(row.mentorId)}
          disabled={alreadyRated}
        >
          {alreadyRated ? "Ya calificaste" : "Calificar"}
        </Button>
      );
    },
    width: "10%",
  },
];
