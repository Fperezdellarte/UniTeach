import React, { useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ClaseSeleccionada } from "../claseSeleccionada/ClaseSeleccionada";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export const CalendarioClases = ({ clases, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedClass, setSelectedClass] = useState(null);

  if (!clases) {
    return <Typography>No hay clases disponibles.</Typography>;
  }

  const hasClassOnDate = (date) => {
    return clases.some((clase) => {
      try {
        const claseDate = dayjs(clase.Date);
        if (!claseDate.isValid()) {
          console.error("hasClassOnDate: claseDate inválida:", clase.Date);
          return false;
        }
        return claseDate.isSame(date, "day");
      } catch (error) {
        console.error("Error en hasClassOnDate:", clase.Date, error);
        return false;
      }
    });
  };

  const renderWeekPickerDay = (date, _, pickersDayProps) => {
    const hasClass = hasClassOnDate(date);

    return (
      <PickersDay
        {...pickersDayProps}
        onClick={() => handleDateChange(date)}
        sx={{
          ...(hasClass && {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            "&.Mui-selected": {
              backgroundColor: "primary.dark",
            },
          }),
          borderRadius: "50%",
        }}
      />
    );
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const classForDate = clases.find((clase) =>
      newDate.isSame(dayjs(clase.Date), "day")
    );
    setSelectedClass(classForDate || null);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          loading={false}
          renderLoading={() => <CircularProgress />}
          slots={{
            day: PickersDay,
          }}
          slotProps={{
            day: {
              renderDay: renderWeekPickerDay,
            },
          }}
        />
      </LocalizationProvider>

      {/*  Renderiza el nuevo componente */}
      {selectedClass && (
        <ClaseSeleccionada clase={selectedClass} onClose={onClose} />
      )}
    </>
  );
};

export default CalendarioClases;
