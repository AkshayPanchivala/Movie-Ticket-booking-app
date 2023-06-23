
import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { createlike } from "../../api-helpers/api-helper";

export const Rating = (props) => {
  const { defaultValue, max = 5, size = "md", rootProps, id } = props;
  const [rating, setRating] = useState(defaultValue);


  const theme = useTheme();
  const color = theme.palette.mode === "light" ? "#E2E8F0" : "#4A5568";
  const activeColor = theme.palette.mode === "light" ? "#f63b3b" : "#93C5FD";

  const handleRatingChange = (index, id) => {
    setRating(index);
    createlike({ movieid: id }, index);

    console.log(index);
    console.log(id);
  };

  return (
    <Box component="div" display="flex" alignItems="center" {...rootProps}>
      {Array.from({ length: max })
        .map((_, index) => index + 1)
        .map((index) => (
          <FaStar
            key={index}
            id={id}
            fontSize={size}
            style={{ pointerEvents: rating > 0 ? "none" : "auto" }}
            onClick={() => handleRatingChange(index, id)}
            color={index <= rating ? activeColor : color}
          />
        ))}
      <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
        {rating} / {max}
      </Typography>
    </Box>
  );
};
