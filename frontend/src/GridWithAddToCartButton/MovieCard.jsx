import React, { useEffect } from "react";
import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import { Rating } from "./Rating";
import { FavouriteButton } from "./FavouriteButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createlike, getlikebyuser } from "../api-helpers/api-helper";

export const MovieCard = (props) => {
  const { Movie, rootProps } = props;
  const { language, posterUrl, description, rating, title, likescount } = Movie;

  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  let id = Movie._id;
  const theme = useTheme();

  const istheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);

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
        <Stack direction="row" alignItems="center" marginLeft={1}>
          <Rating defaultValue={rating} id={id} size="small" />
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
              LinkComponent={Link}
              to={isuserLoggedIn ? `/booking/${id}` : "/auth/login"}
              style={{ marginRight: "8px" }}
              fullWidth
            >
              Update Movie
            </Button>

            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "8px" }}
              // Add the necessary props and event handlers for the second button
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
