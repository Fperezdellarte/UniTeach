// src/components/LoadingSpinner.jsx
import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
  color: "#fff",
}));

const InlineSpinnerContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "20px 0",
});

const LoadingSpinner = ({ fullPage = false, size = 40, color = "primary" }) => {
  if (fullPage) {
    return (
      <StyledBackdrop open={true}>
        <CircularProgress color={color} size={size * 1.5} />
      </StyledBackdrop>
    );
  }

  return (
    <InlineSpinnerContainer>
      <CircularProgress color={color} size={size} />
    </InlineSpinnerContainer>
  );
};

export default LoadingSpinner;
