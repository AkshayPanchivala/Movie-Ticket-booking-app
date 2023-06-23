import React from "react";
import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import HalfRating from "./Rating";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  
  movieDelete,
} from "../api-helpers/api-helper";


export const MovieCard = (props) => {
  const { Movie, rootProps } = props;
  const { language, posterUrl,  rating, title, likescount } = Movie;

  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  let id = Movie._id;
  const theme = useTheme();

  const istheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);
  const Moviedeletehandler = (id) => {
    movieDelete(id)
    window.location.reload()
    
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
          }}
        />
        <Stack direction="row" alignItems="center" marginLeft={0}>
          <HalfRating defaultValue={rating} id={id}  />
          <Typography
            variant="body2"
            fontSize="body2.fontSize"
            color="text.secondary"
            marginLeft={8}
          >
            {likescount} Votes
          </Typography>
        </Stack>

        <Box display="flex" alignItems="center"></Box>
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
        {isuserLoggedIn && (
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
        {!isuserLoggedIn && !isadminLoggedIn && !istheaterLoggedIn && (
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
        {isadminLoggedIn && (
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => {
                Moviedeletehandler(id);
              }}
              style={{ marginRight: "8px" }}
              fullWidth
            >
              Delete Movie
            </Button>

            
          </div>
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
