import React from "react";
import { Container, Stack, Box, Typography, Button } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import Movies from "../Movies/Movies";
import ImageSlider from "./Theater/Imageslider";
import { useSelector } from "react-redux";

export default function Homepage() {
  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const slides = [
    {
      url: "https://images.lifestyleasia.com/wp-content/uploads/sites/2/2023/06/14115719/MIDR1_US_2023_SA_16x9_1920x1080_NB_2215190_1920x1080.jpeg",
      title: "Mission Impossible",
      id: "649fe84ac4057601f6e028f6",
    },
    {
      url: "https://wallpapercave.com/wp/wp7490481.jpg",
      title: "Star Wars",
      id: "649fdf70c4057601f6e02443",
    },

    {
      url: "https://assets-in.bmscdn.com/discovery-catalog/events/et00047401-rtbuqsulus-landscape.jpg",
      title: "Flash",
      id: "649ff08ac4057601f6e02ee7",
    },
  ];
  const containerstyles = {
    marginTop: "25px",
    marginBottom: "25px",

    marginLeft: "5px",
    width: "1150px",
    height: "560px",
  };
  return (
    <>
      <Container>
     
          <div style={containerstyles}>
            <ImageSlider slides={slides} />
          </div>

        <Movies />
      </Container>
    </>
  );
}
