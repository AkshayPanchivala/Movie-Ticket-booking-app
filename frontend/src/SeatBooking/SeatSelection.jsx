import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Index from "./Index";
import AspectRatio from "@mui/joy/AspectRatio";
import {
  Autocomplete,
  Card,
  CardContent,
  Divider,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAlladmin,
  getmovie,
  getMovieDetails,
  getTheaterbycity,
  getTheaterbypagination,
} from "../api-helpers/api-helper";
import CardOverflow from "@mui/joy/CardOverflow";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
function SeatSelection() {
  const [movie, setMovie] = useState();
  const [Theatre, setTheatre] = useState();

  const [totalPages, settotalPages] = useState("");
  const [citytotalPages, setcitytotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [city, setCity] = useState();
  const [searchcity, setsearchcity] = useState(false);
  const [searchedCity, SetsearchedCity] = useState();
  const [theaterbycity, Settheaterbycity] = useState();

  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();
  console.log(params.theaterId);
  // Rest of your component code

  // const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const id = useParams().movieid;
  console.log(id);
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

  return (
    <div style={{ display: "flex", marginTop: "50px" }}>
      <div style={{ flex: 1 }}>
        <div>
          {movie && (
            <>
             
              <Box display={"flex"} justifyContent={"center"} marginLeft="5%">
                <Box sx={{ minHeight: 300 }}>
                  <Card variant="elevation">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxWidth: 500,
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <div>
                          <div sx={{ margin: "20px" }}>
                            <Typography
                              level="h2"
                              variant="h6"
                              sx={{
                                fontSize: "24px",
                                marginLeft: "220px",
                                fontWeight: "450",
                              }}
                              mb={0.5}
                            >
                              {movie.title}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                      <Card
                        marginRight={20}
                        variant="outlined"
                        sx={{
                          width: 400,
                          height: 533,
                          boxShadow: isHovered
                            ? "0 0 10px rgba(0, 0, 0, 0.3)"
                            : "none",
                          transform: isHovered ? "scale(1.05)" : "none",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          marginLeft: 5,
                        }}
                      >
                        <CardOverflow>
                          <AspectRatio ratio="3/4">
                            <img
                              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                              srcSet={`${movie.posterUrl}`}
                              loading="lazy"
                              alt=""
                            />
                          </AspectRatio>
                        </CardOverflow>
                      </Card>
                      <IconButton
                        size="sm"
                        variant="plain"
                        color="neutral"
                        sx={{ ml: "25px", alignSelf: "flex-start" }}
                      >
                        <FavoriteBorderRoundedIcon color="danger" />
                      </IconButton>
                      <Typography level="body2" sx={{ marginLeft: "33px" }}>
                        <strong> Language:</strong>[{movie.language + " "}]
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1.0, mt: "auto" }}>
                        <Box style={{ marginLeft: "6%" }}>
                          <Typography>
                            <strong>About the movie:</strong>
                          </Typography>
                          <Typography
                            fontWeight="lg"
                            level="body2"
                            sx={{ whiteSpace: "pre-wrap", marginLeft: "10px" }}
                          >
                            {movie.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>
            </>
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Index></Index>
      </div>
    </div>
  );
}

export default SeatSelection;
