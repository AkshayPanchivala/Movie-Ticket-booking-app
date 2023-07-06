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
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAllMovies,
  gettopMovies,
  getUpcommingmovie,
} from "../api-helpers/api-helper";
import { useLocation, useNavigate } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchlanguage, setsearchlanguage] = useState(false);

  const [moviesBylanguage, Setmoviesbylanguage] = useState([]);
  const [totalPages, settotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [top8movies, settop8Movies] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [SearchCategory, setsearchCategory] = useState(false);
  const [MoviesCategory, SetmoviesbyCategory] = useState([]);
  const [searchLanguagevalue, SetsearchLanguagevalue] = useState();
  const [searchCatagaryvalue, SetsearchCatagaryvalue] = useState();

  const state = useLocation();

  let path = state.pathname === "/movies";

  useEffect(() => {
    getUpcommingmovie();
    getAllMovies(currentPage)
      .then((data) => {
     
        setMovies(data.movies);

        settotalPages(data.totalpages);
        if (path === true) {
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }, [currentPage, searchlanguage, path, SearchCategory]);

  useEffect(() => {
    gettopMovies()
      .then((res) => {
     
        settop8Movies(res);

        if (path === false) {
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }, [path]);

  const handlechange = (e, val) => {
    setsearchlanguage(true);
    SetsearchLanguagevalue(val);

    if (val === null) {
      setsearchlanguage(false);
    }

    const filteredMovies = movies.filter((movie) =>
      movie.language.includes(val)
    );
    Setmoviesbylanguage(filteredMovies);
    settotalPages(1);
    setLoader(false);
  };

  const handlecatogarychange = (e, val) => {
    setsearchCategory(true);
    SetsearchCatagaryvalue(val);
    if (searchlanguage === true) {
      const filteredMovies = movies.filter((movie) =>
        movie.language.includes(searchLanguagevalue)
      );
      const filteredMovies2 = filteredMovies.filter(
        (movie) => val === movie.category
      );

      SetmoviesbyCategory(filteredMovies2);
      settotalPages(1);
      if (val === null) {
        setsearchCategory(false);
      }
    } else {
      if (val === null) {
        setsearchCategory(false);
      }

      const filteredMovies = movies.filter((movie) => val === movie.category);

      SetmoviesbyCategory(filteredMovies);
      settotalPages(1);
    }
    setLoader(false);
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const language = ["Hindi", "English", "Gujarati"];

  return (
    <>
    
      {Loader && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {path && (
        <>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            marginTop={5}
          >
            <Box width={"20%"} marginLeft={17}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={language.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Language" />
                )}
                onChange={handlechange}
              />
            </Box>
            <Box width={"20%"} marginRight={19}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={[...new Set(movies.map((option) => option.category))]}
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" />
                )}
                onChange={handlecatogarychange}
              />
            </Box>
          </Box>
        </>
      )}

      {path && !searchlanguage && !SearchCategory && (
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
      {path && searchlanguage && !SearchCategory && (
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
      {path && SearchCategory && (
        <Container maxWidth="lg" sx={{ paddingTop: "24px" }}>
          <Grid container spacing={3}>
            {MoviesCategory.map((Movie) => (
              <Grid item key={Movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard Movie={Movie} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {!path && top8movies && (
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
        <Stack spacing={2} marginLeft={70} marginTop={10}>
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
