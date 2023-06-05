import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getAllMovies } from "../../api-helpers/api-helper";
import MoviesItem from "./MoviesItem";

function Movies() {
  const [movies, setMovies] = useState();
  const status = useLocation();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));

    if (status.state === 201) {
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

  return (
    <>
      <Box margin={"auto"} marginTop={4}>
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
        <Box
          width={"100%"}
          margin="auto"
          marginTop={5}
          display={"flex"}
          justifyContent="flex-start"
          flexWrap={"wrap"}
        >
          {movies &&
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
