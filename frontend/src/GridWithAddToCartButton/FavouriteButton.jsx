import React from "react";
import { IconButton } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "50%",
    color: "gray",
    transition: "transform 0.15s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "&:hover > svg": {
      transform: "scale(1.1)",
    },
  },
}));

export const FavouriteButton = (props) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} size="small" {...props}>
      <FavoriteIcon  />
    </IconButton>
  );
};
