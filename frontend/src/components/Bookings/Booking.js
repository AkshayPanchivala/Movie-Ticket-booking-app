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
  getTheaterbycity,
  getTheaterbypagination,
} from "../../api-helpers/api-helper";

import Theatrecard from "./Theatrecard";

function Booking() {
  const [movie, setMovie] = useState();
  const [Theatre, setTheatre] = useState();

  const [totalPages, settotalPages] = useState("");
  const [citytotalPages, setcitytotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [city, setCity] = useState();
  const [searchcity, setsearchcity] = useState(false);
  const [searchedCity, SetsearchedCity] = useState();
  const [theaterbycity, Settheaterbycity] = useState();
  // const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

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
      })
      .catch((err) => console.log(err));
    getTheaterbycity(searchedCity, currentPage).then((res) => {
      Settheaterbycity(res.data.theater);
      console.log(res.data.totalPages);
      setcitytotalPages(res.data.totalPages);
    });
  }, [id, currentPage, searchedCity]);
  // useEffect(() => {
  //   // getUserBooking()
  //   //   .then((res) => setBookings(res.bookings))
  //   //   .catch((err) => console.log(err));
  //   //

  // }, []);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlechange = (e, val) => {
    setsearchcity(true);
    if (val === null) {
      setsearchcity(false);
    }
    SetsearchedCity(val);
  };
  // console.log( searchedCity);

  // const filteredPincodes = city.map((option) => option.filter((option) => {
  //   // Replace 'condition' with your desired filtering condition
  //   return ;
  // })).map((option) => option.pincode);

  // console.log(filteredPincodes);
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
        {city && (
          <Box width={"20%"}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={[...new Set(city.map((option) => option.city))]}
              renderInput={(params) => (
                <TextField {...params} label="City Select" />
              )}
              onChange={handlechange}
            />
          </Box>
        )}
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
                <Typography fontWeight={"bold"} marginTop={1}>
                  {movie.title}
                </Typography>
                <Typography paddingTop={2}>{movie.description}</Typography>

                <Typography fontWeight={"bold"} marginTop={1}>
                  Realese Date:{new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3} marginRight={"7%"}>
              {!searchcity &&
                Theatre &&
                Theatre.map((Theatre, index) => (
                  <Theatrecard
                    key={Theatre._id}
                    name={Theatre.name}
                    id={Theatre._id}
                  />
                ))}
              {searchcity &&
                theaterbycity &&
                theaterbycity.map((Theatre, index) => (
                  <Theatrecard
                    key={Theatre._id}
                    name={Theatre.name}
                    id={Theatre._id}
                  />
                ))}
              {!searchcity && (
                <Stack spacing={2} marginLeft={50}>
                  <Pagination
                    count={totalPages}
                    color="primary"
                    onChange={handlePageChange}
                  />
                </Stack>
              )}
              {searchcity && (
                <Stack spacing={2} marginLeft={50}>
                  <Pagination
                    count={citytotalPages}
                    color="primary"
                    onChange={handlePageChange}
                  />
                </Stack>
              )}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default Booking;
