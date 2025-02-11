import { Button } from "@mui/material";
import calendar from "../../../../Assest/Calendar.PNG";

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
    render: (row) => row.Mentor || "Sin Mentor",
  },
  {
    title: "Meet",
    render: (row) => {
      console.log("Datos de la clase:", row);

      if (!row.date) {
        console.error("Fecha inválida:", row.date);
        return <span>Error en la fecha</span>;
      }

      // Convertir row.date a objeto Date
      let dateObj = new Date(row.date);

      if (isNaN(dateObj.getTime())) {
        console.error("Fecha inválida después de conversión:", row.date);
        return <span>Error en la fecha</span>;
      }

      // Formatear solo la fecha en YYYYMMDD
      const formattedDate = dateObj.toISOString().split("T")[0].replace(/-/g, "");

      // Crear URL de Google Calendar sin hora
      const googleCalendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        row.Materia
      )}&dates=${formattedDate}/${formattedDate}&details=Clase de ${encodeURIComponent(
        row.Materia
      )}&location=${encodeURIComponent(row.Place)}`;

      return (
        <Button onClick={() => window.open(googleCalendarURL, "_blank")}>
          <img src={calendar} alt="Calendario" width="20px" height="20px" />
        </Button>
      );
    },
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
