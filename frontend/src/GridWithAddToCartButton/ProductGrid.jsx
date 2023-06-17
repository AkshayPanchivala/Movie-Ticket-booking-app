
import React from "react";
import { Grid } from "@mui/material";
import { Children, isValidElement, useMemo } from "react";

export const ProductGrid = (props) => {
  const columns = useMemo(() => {
    const count = Children.toArray(props.children).filter(
      isValidElement
    ).length;
    return {
      xs: Math.min(2, count),
      sm: Math.min(3, count),
      md: Math.min(4, count),
      lg: Math.min(5, count),
    };
  }, [props.children]);

  return (
    <Grid
      container
      spacing={{ xs: 4, sm: 6 }}
      sx={{ "& > *": { marginBottom: { xs: "8px", md: "10px" } } }}
      {...props}
    >
      {React.Children.map(props.children, (child) => (
        <Grid item {...columns}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};
