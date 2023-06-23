
import * as React from "react";
import Rating from "@mui/material/Rating";

import { Typography } from "@mui/material";

export default function HalfRating(props) {
  const { defaultValue, max = 5} = props;


  return (
    <>
     
        <Rating
          name="half-rating"
          defaultValue={ defaultValue}
          precision={0.5}
          style={{ fontSize: "15px"}}
          readOnly
        />
     
      <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
        {defaultValue}/ {max}
      </Typography>
    </>
  );
}
