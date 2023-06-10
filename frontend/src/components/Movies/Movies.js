import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getAllMovies } from "../../api-helpers/api-helper";
import MoviesItem from "./MoviesItem";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchlanguage, setsearchlanguage] = useState(false);
  const [moviesBylanguage, Setmoviesbylanguage] = useState([]);
  let status = useLocation();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));

    if (status.state === 201) {
      status.state = null;
      return toast.success("Successfully book your seat", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);
  console.log(movies);
  const handlechange = (e, val) => {
    console.log(e);
    setsearchlanguage(true);
    if (val === null) {
      setsearchlanguage(false);
    }
    // movies.map((e,index) => {
    //   console.log(e,index);
    //   const language = e.language.includes(val);
    //   console.log(language);
    //   if (language == true) {

    //     Setmoviesbylanguage(movies[index]);
    //   }
    //   // console.log(e.language);
    //   e.language.map((value) => value === val);
    // }
    const filteredMovies = movies.filter((movie) =>
      movie.language.includes(val)
    );
    Setmoviesbylanguage(filteredMovies);
    console.log("fdfdfxczdf" + searchlanguage);

    // );
  };
  // moviesBylanguage.forEach((movie) => {
  //   console.log(movie.title);
  // });
  console.log("fdfdfdf" + searchlanguage);
  console.log("jkjk" + moviesBylanguage);
  const language = ["Hindi", "English", "Gujarati"];
  return (
    <>
      <Box margin={"auto"} marginTop={4}>
        <Box display="flex" marginTop={"2%"}>
          <Typography
            margin={"auto"}
            variant="h4"
            padding={2}
            bgcolor={"#900C3F"}
            color="white"
            width="40%"
            textAlign={"center"}
          >
            All Movies
          </Typography>
          <Box width={"20%"}>
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
        <Box
          width={"100%"}
          marginLeft={10}
          marginTop={5}
          display={"flex"}
          justifyContent="flex-start"
          flexWrap={"wrap"}
        >
          {searchlanguage &&
            moviesBylanguage &&
            moviesBylanguage.map((movie, index) => (
              <MoviesItem
                key={index}
                id={movie._id}
                posterurl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
              />
            ))}
          {movies &&
            !searchlanguage &&
            movies.map((movie, index) => (
              <MoviesItem
                key={index}
                id={movie._id}
                posterurl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
              />
            ))}
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Movies;
