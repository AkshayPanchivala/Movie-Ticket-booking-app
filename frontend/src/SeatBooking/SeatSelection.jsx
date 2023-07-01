import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Index from "./Index";
import AspectRatio from "@mui/joy/AspectRatio";
import { Card, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { getMovieDetails } from "../api-helpers/api-helper";
import CardOverflow from "@mui/joy/CardOverflow";

function SeatSelection() {
  return (
    <>
      <div style={{ flex: 1 }}>
        <Index />
      </div>
    </>
  );
}

export default SeatSelection;
