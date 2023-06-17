import React, { useEffect } from "react";
import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import { Rating } from "./Rating";
import { FavouriteButton } from "./FavouriteButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createlike, getlikebyuser } from "../api-helpers/api-helper";

export const MovieCard = (props) => {
  const { Movie, rootProps } = props;
  const { language, posterUrl, description, rating,title, likescount } = Movie;
  const [liked, setliked] = useState();
  const [isliked, setisliked] = useState(false);
  const [movieliked, setmovieliked] = useState();
  const [fatchData, setfatchData] = useState(false);
  const [userlikedmovie, setuserlikedmovie] = useState([]);
  let id = Movie._id;
  const theme = useTheme();

  const likeclickhandler = (id) => {
    setisliked(!isliked);
    console.log(isliked);
    console.log("lkj");
    setliked(id);
    // setisliked(isliked);
  };
  useEffect(() => {
    createlike(liked);
  }, [isliked, liked]);

  useEffect(() => {
    getlikebyuser().then((res) => {
      console.log(res.data.likes);
      setmovieliked(res.data.likes);
      setfatchData(true);
    });
  }, [liked, isliked, likescount]);

  useEffect(() => {
    if (fatchData) {
      const likedMovies = movieliked.map((likedMovie) => likedMovie.movie);
      setuserlikedmovie(likedMovies);
      setfatchData(false);
    }
  }, [movieliked, fatchData, setisliked]);

  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const istheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);
  const showlikehandler = () => {
    console.log("lklk54");
  };
  return (
    <Stack spacing={{ base: 4, md: 1 }} {...rootProps}>
      <Box position="relative">
        <Box
          component="img"
          src={posterUrl}
          alt={title}
          draggable="false"
          sx={{
            aspectRatio: "3/4",
            borderRadius: { base: "md", md: "xl" },
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = "/path/to/default-image.jpg"; // Replace with your default image path
          }}
        />
        <Stack direction="row" alignItems="center">
          <Rating defaultValue={rating} id={id} size="small" />
          <Typography
            variant="body2"
            fontSize="body2.fontSize"
            color="text.secondary"
            marginLeft={3}
          >
            {likescount} Votes
          </Typography>
        </Stack>

        <Box display="flex" alignItems="center">
          <FavouriteButton
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${title} to your favourites`}
            onClick={() => likeclickhandler(id)}
            sx={{
              color: `${
                isliked || userlikedmovie.includes(id) ? "red" : "inherit"
              }`,
            }}
          >
            <FavoriteIcon />
          </FavouriteButton>
          <Typography
            variant="body2"
            color={
              theme.palette.mode === "light"
                ? "text.secondary"
                : "text.disabled"
            }
            onClick={() => showlikehandler(id)}
          >
            {likescount}
          </Typography>
        </Box>
      </Box>
      <Stack>
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color={
              theme.palette.mode === "light" ? "text.primary" : "text.secondary"
            }
            sx={{ pl: 1, fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Stack spacing={1}>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color={
              theme.palette.mode === "light" ? "text.primary" : "text.secondary"
            }
            sx={{ pl: 1, pt: 0 }}
          >
            [{language + ""}]
          </Typography>
        </Stack>
      </Stack>
      <Stack align="center">
        {!istheaterLoggedIn && (
          <Button
            variant="contained"
            color="inherit"
            LinkComponent={Link}
            to={isuserLoggedIn ? `/booking/${id}` : "/auth/login"}
            fullWidth
          >
            Book Now
          </Button>
        )}
        {istheaterLoggedIn && (
          <Button
            variant="contained"
            color="inherit"
            LinkComponent={Link}
            to={`/bookingdata/${id}`}
            fullWidth
          >
            Get Booking Data
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
