import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconButton,
  MobileStepper,
  Paper,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import { useTheme } from "../../../../contexts/themeContext";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export const CarrouselOpiniones = ({ opiniones }) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % opiniones.length);
  }, [opiniones.length]);

  const handleBack = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + opiniones.length) % opiniones.length
    );
  }, [opiniones.length]);

  const clearAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    clearAutoAdvance();
    if (opiniones && opiniones.length > 1) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 3000);

      return () => clearAutoAdvance();
    }
  }, [activeIndex, opiniones, handleNext]);

  const handleStepperInteraction = () => {
    clearAutoAdvance();
  };

  if (
    !opiniones ||
    opiniones.length === 0 ||
    (opiniones.length === 1 && opiniones[0] === null)
  ) {
    return (
      <div
        style={{
          borderRadius: "20px",
          margin: "20px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
          display: "flex",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        No hay opiniones disponibles.
      </div>
    );
  }

  const currentOpinion = opiniones[activeIndex];

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        mx: "auto",
        borderRadius: "20px",
        margin: "20px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.38)",
        display: "flex",
        flexDirection: "column",
        Width: "350px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6">{currentOpinion.studentName}</Typography>
      </Paper>
      <Box
        sx={{
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <Box>
          <Typography>{currentOpinion.comment}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              name="read-only-rating"
              value={currentOpinion?.rating ?? 0}
              precision={0.2}
              readOnly
            />
          </Box>
        </Box>
        <MobileStepper
          variant="dots"
          steps={opiniones.length}
          position="static"
          activeStep={activeIndex}
          sx={{
            maxWidth: 400,
            minWidth: 300,
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
          }}
          nextButton={
            <IconButton
              size="small"
              onClick={() => {
                handleNext();
                handleStepperInteraction();
              }}
              disabled={activeIndex === opiniones.length - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={() => {
                handleBack();
                handleStepperInteraction();
              }}
              disabled={activeIndex === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </IconButton>
          }
        />
      </Box>
    </Box>
  );
};
