import {
  Autocomplete,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAlladmin,
  getmovie,
  getMovieDetails,
  getTheaterbypagination,
} from "../../api-helpers/api-helper";
import BookingCard from "../../profile/BookingCard";
import Theatrecard from "./Theatrecard";

function Booking() {
  const [movie, setMovie] = useState();
  const [Theatre, setTheatre] = useState();
  const navigate = useNavigate();
  const [totalPages, settotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [city, setCity] = useState();
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
    getTheaterbypagination(currentPage)
      .then((res) => {
        console.log(res.data.theater);
        console.log(res.data.totalPages);
        settotalPages(res.data.totalPages);
        setTheatre(res.data.theater);
      })
      .catch((err) => console.log(err));
    getAlladmin()
      .then((res) => {
        setCity(res.data.data);
        // setTheatre(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id, currentPage]);
  // useEffect(() => {
  //   // getUserBooking()
  //   //   .then((res) => setBookings(res.bookings))
  //   //   .catch((err) => console.log(err));
  //   //

  // }, []);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  console.log(currentPage);
  // console.log(c);
  // const top100Films = [

  //   { title: "Singin' in the Rain", year: 1952 },
  //   { title: 'Toy Story', year: 1995 },
  //   { title: 'Bicycle Thieves', year: 1948 },
  //   { title: 'The Kid', year: 1921 },
  //   { title: 'Inglourious Basterds', year: 2009 },
  //   { title: 'Snatch', year: 2000 },
  //   { title: '3 Idiots', year: 2009 },
  //   { title: 'Monty Python and the Holy Grail', year: 1975 },
  // ];
  return (
    <div>
      <Box display="flex" marginTop={"2%"}>
        <Typography
          width={"70%"}
          padding={3}
          fontFamily="fantasy"
          variant="h4"
          textAlign={"center"}
        >
          Book Tickets of Movie:
        </Typography>
        <Box width={"20%"}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            // options={city.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
      </Box>
      {movie && (
        <>
          <Box display={"flex"} justifyContent={"center"} marginLeft="5%">
            <Box
              display={"flex"}
              justifucontent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  starer
                  {/* {movie.actors.map((actor)=>actor + ",")} */}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Realese Date:{new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3} marginRight={"7%"}>
              {Theatre &&
                Theatre.map((Theatre, index) => (
                  <Theatrecard
                    key={Theatre._id}
                    name={Theatre.name}
                    id={Theatre._id}
                  />
                ))}
              <Stack spacing={2} marginLeft={50}>
                <Pagination
                  count={totalPages}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Stack>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default Booking;
