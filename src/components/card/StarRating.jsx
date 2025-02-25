import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export const StarRating = ({ rating }) => {
  return (
    <Box>
      <Rating value={rating} precision={0.5} readOnly />
    </Box>
  );
};
