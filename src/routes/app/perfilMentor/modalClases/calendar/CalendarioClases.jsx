import React, { useMemo, useState } from "react";
import { Typography } from "@mui/material";
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

  const fechasConClase = useMemo(
    () =>
      clases?.map((clase) => dayjs(clase.Date).startOf("day").toString()) || [],
    [clases]
  );

  const hasClassOnDate = (date) => {
    return fechasConClase.some(
      (fecha) => fecha === date.startOf("day").toString()
    );
  };

  const minDate = dayjs();
  const maxDate = useMemo(() => {
    if (!clases || clases.length === 0) {
      return dayjs();
    }

    let lastDate = dayjs(clases[0].Date);
    for (let i = 1; i < clases.length; i++) {
      const currentDate = dayjs(clases[i].Date);
      if (currentDate.isAfter(lastDate)) {
        lastDate = currentDate;
      }
    }
    return lastDate;
  }, [clases]);

  const CustomPickersDay = (pickersDayProps) => {
    const hasClass = hasClassOnDate(pickersDayProps.day);

    const isDisabled = !hasClass;

    return (
      <PickersDay
        {...pickersDayProps}
        disabled={isDisabled}
        sx={{
          ...(hasClass && {
            backgroundColor: "#7e80a5",
            color: "white",
            "&:hover, &.Mui-selected": { backgroundColor: "#7e80a5" },
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

  if (!clases || clases.length === 0)
    return <Typography>No hay clases disponibles.</Typography>;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          slots={{ day: CustomPickersDay }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </LocalizationProvider>
      {selectedClass && (
        <ClaseSeleccionada clase={selectedClass} onClose={onClose} />
      )}
    </>
  );
};

export default CalendarioClases;
