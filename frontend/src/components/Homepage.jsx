import React, { useEffect, useState } from "react";
import { Container, Stack, Box, Typography, Button } from "@mui/material";
import { PlayArrow as PlayIcon } from "@mui/icons-material";
import { Link as NavLink } from "react-router-dom";
import Movi from "../GridWithAddToCartButton/Movi";
import { getAllMovies } from "../api-helpers/api-helper";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [totalPages, settotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllMovies(currentPage)
      .then((data) => {
        setMovies(data.movies);
        settotalPages(data.totalpages);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log();
  console.log(movies[0]);
  return (
    <>
     
        <>
          <Container
            maxWidth="lg"
            style={{
              backgroundImage: ``,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100vh",
            }}
          >
            <Stack
              alignItems="center"
              spacing={{ xs: 8, md: 10 }}
              py={{ xs: 20, md: 28 }}
              direction={{ xs: "column", md: "row" }}
            >
              <Stack flex={1} spacing={{ xs: 5, md: 10 }}>
                <Typography
                  variant="h2"
                  sx={{
                    lineHeight: 1.1,
                    fontWeight: 600,
                    fontSize: { xs: "3xl", sm: "4xl", lg: "6xl" },
                  }}
                >
                  <Box
                    component="span"
                    position="relative"
                    _after={{
                      content: "''",
                      width: "full",
                      height: "30%",
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bgcolor: "red.400",
                      zIndex: -1,
                    }}
                  >
                    {/* {movies[0].title} */}
                    Bahubali 2
                  </Box>
                  <br />
                </Typography>
                <Typography color="gray.500">
                  {/* {movies[0].description} */}
                  The film is set in medieval India and follows the sibling
                  rivalry between Amarendra Baahubali and Bhallaladeva; the
                  latter conspires against the former and has him killed by
                  Kattappa. Years later, Amarendra's son returns to avenge his
                  death
                </Typography>
                <Stack
                  spacing={{ xs: 4, sm: 6 }}
                  direction={{ xs: "column", sm: "row" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    fontWeight="normal"
                    color="inherit"
                    as={NavLink}
                    to={"/movies"}
                  >
                    View All movies
                  </Button>
                </Stack>
              </Stack>
              <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                width="100%"
              >
                <Box
                  position="relative"
                  height={350}
                  borderRadius="2xl"
                  boxShadow="2xl"
                  width="100%"
                  overflow="hidden"
                >
                  <Button
                    aria-label="Play Button"
                    variant="ghost"
                    sx={{
                      "&:hover": { bgcolor: "transparent" },
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translateX(-50%) translateY(-50%)",
                      color: "white",
                    }}
                  >
                    {/* <PlayIcon sx={{ width: 96, height: 96 }} /> */}
                  </Button>
                  <Box
                    component="img"
                    alt="Bahubali Movie"
                    src="https://www.indiantvinfo.com/media/2017/03/Baahubali-2-full-movie-online.jpg"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    align="center"
                  />
                </Box>
              </Box>
            </Stack>
            <Movi />
          </Container>
        </>
    
    </>
  );
}
