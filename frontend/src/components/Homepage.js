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

  if (movies.length > 0) {
    console.log(movies[0].posterUrl);
  }
  const slides = [
    {
      url: "https://geographical.co.uk/wp-content/uploads/Photographing-mountains-in-spring-1200x800.jpg",
      title: "klk",
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW5zfGVufDB8fDB8fHww&w=1000&q=80",
      title: "klk",
    },
    {
      url: "https://thumbs.dreamstime.com/z/beautiful-exterior-home-pictures-new-home-design-images-modern-best-house-design-images-best-house-images-images-latest-172194515.jpg",
      title: "klk",
    },
    {
      url: "https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ=",
      title: "klk",
    },
  ];

//  let slides = [];
//   // if(movies &&  for (let i = 0; i < 4; i++) {
//   //   console.log(movies[i].posterUrl)
//   //   slides.push({ url: movies[i].posterUrl, title: movies[i].title });
//   // })
//   if (movies.length > 0) {
//    slides = [
//       {
//         url: `${movies[0].posterUrl}`,
//         title: "klk",
//       },
//       {
//         url: `${movies[1].posterUrl}`,
//         title: "klk",
//       },
//       {
//         url: `${movies[2].posterUrl}`,
//         title: "klk",
//       },
//       {
//         url: `${movies[3].posterUrl}`,
//         title: "klk",
//       },
//     ];
//   }

  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      {/* <div style={containerstyles}>
        
      </div> */}
      <Box margin={"auto"} width="90%" height={"40vh"} padding={2}>
        {/* <ImageSlider images={images} /> */}
        <ImageSlider slides={slides} />
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
