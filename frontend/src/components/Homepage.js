import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoviesItem from "./Movies/MoviesItem";
import ImageSlider from "./ImageSlider";

function Homepage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  // const [slides,setSlides]=useState("")
  console.log(location);
  const [status, setStatus] = useState(location.state);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
    if (movies > 0) {
      console.log(movies);
    }
  }, []);
  


  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      {/* <div style={containerstyles}>
        
      </div> */}
      
        <Box margin={"auto"} width="90%" height={"40vh"} padding={2}>
          {/* <ImageSlider images={images} /> */}
          <ImageSlider />
        </Box>
    

      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        display="flex"
        width="80%"
       
        marginLeft="150px"
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MoviesItem
                key={index}
                id={movie._id}
                posterUrl={movie.posterUrl}
                language={movie.language}
                description={movie.description}
                title={movie.title}
              />
            ))}
      </Box>

      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          view All movies
        </Button>
      </Box>
    </Box>
  );
}

export default Homepage;

// {movies && (
//   <Box margin={"auto"} width="90%" height={"40vh"} padding={2}>

//     {/* <ImageSlider slides={slides} /> */}
//   </Box>
//   // <Box margin={"auto"} width="90%" height={"40vh"} padding={2}>
//   //   {movies.slice(0, 4).map((movie, index) => (
//   //     <ImageSlider
//   //       id={movie._id}
//   //       title={movie.title}
//   //       posterUrl={movie.posterUrl}
//   //       releaseDate={movie.releaseDate}
//   //       key={index}
//   //     />
//   //   ))}
//   // </Box>
// )}
