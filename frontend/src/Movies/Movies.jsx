import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { MovieCard } from "./MovieCard";

import { getAllMovies, gettopMovies } from "../api-helpers/api-helper";
import { useLocation } from "react-router-dom";




export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchlanguage, setsearchlanguage] = useState(false);

  const [moviesBylanguage, Setmoviesbylanguage] = useState([]);
  const [totalPages, settotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [top8movies, settop8Movies] = useState([]);

  const state = useLocation();
  const path = state.pathname === "/movies";

  useEffect(() => {
    getAllMovies(currentPage)
      .then((data) => {
        setMovies(data.movies);

        settotalPages(data.totalpages);
      })
      .catch((err) => console.log(err));
    gettopMovies()
      .then((res) => {
     
        settop8Movies(res);
      })
      .catch((err) => console.log(err));
  }, [currentPage, searchlanguage]);

  const handlechange = (e, val) => {

    setsearchlanguage(true);
    if (val === null) {
      setsearchlanguage(false);
    }

    const filteredMovies = movies.filter((movie) =>
      movie.language.includes(val)
    );
    Setmoviesbylanguage(filteredMovies);
 

  };
 
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const language = ["Hindi", "English", "Gujarati"];
  return (
    <>
      {path && (
        <Box marginTop={4}>
          <Box width={"20%"} marginLeft={"80%"}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={language.map((option) => option)}
              renderInput={(params) => (
                <TextField {...params} label="LanguageSelect" />
              )}
              onChange={handlechange}
            />
          </Box>
        </Box>
      )}
      {path && !searchlanguage && (
        <Container maxWidth="lg" sx={{ paddingTop: "24px" }}>
          <Grid container spacing={3}>
            {movies.map((Movie) => (
              <Grid item key={Movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard Movie={Movie} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {path && searchlanguage && (
        <Container maxWidth="lg" sx={{ paddingTop: "24px" }}>
          <Grid container spacing={3}>
            {moviesBylanguage.map((Movie) => (
              <Grid item key={Movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard Movie={Movie} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {!path && (
        <Container maxWidth="lg" sx={{ paddingTop: "24px" }}>
          <Grid container spacing={3}>
            {top8movies.map((Movie) => (
              <Grid item key={Movie._id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard Movie={Movie} id={Movie._id} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {path && (
        <Stack spacing={2} marginLeft={100} marginTop={10}>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      )}
    
    </>
  );
}

