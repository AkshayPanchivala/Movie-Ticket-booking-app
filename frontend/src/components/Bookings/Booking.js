import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAlladmin, getMovieDetails } from "../../api-helpers/api-helper";
import BookingCard from "../../profile/BookingCard";

function Booking() {
  const [movie, setMovie] = useState();
  const [Theatre, setTheatre] = useState();
  const navigate = useNavigate();

  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isuserLoggedIn);
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
    getAlladmin()
      .then((res) => {
        console.log(res.data);
        setTheatre(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
// {isuserLoggedIn && navigate(`/booking/${movie._id}`);}
// {isuserLoggedIn && navigate("/Auth")}
 

  console.log("uju", isuserLoggedIn);
  return (
    <div>
      {movie && (
        <>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets of Movie:{movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
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
            <Box width={"50%"} paddingTop={3}>
              {Theatre &&
                Theatre.map((Theatre, index) => (
                  <BookingCard
                    key={Theatre._id}
                    name={Theatre.name}
                    id={Theatre._id}
                  />
                ))}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default Booking;
