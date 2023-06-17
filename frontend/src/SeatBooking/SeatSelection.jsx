import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Index from "./Index";
import AspectRatio from "@mui/joy/AspectRatio";
import {
  Autocomplete,
  Card,
  CardContent,
  Divider,
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
              {console.log(movie)}
              <Box display={"flex"} justifyContent={"center"} marginLeft="5%">
                <Box
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Card
                    marginRight={20}
                    variant="outlined"
                    sx={{
                      width: 400,
                      height: 540,
                      boxShadow: isHovered
                        ? "0 0 10px rgba(0, 0, 0, 0.3)"
                        : "none",
                      transform: isHovered ? "scale(1.05)" : "none",
                      transition: "transform 0.2s, box-shadow 0.2s",
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

                  <CardContent marginTop={3}>
                    <Typography 
                      level="h2"
                      fontSize="25px"
                      fontWeight={50}
                      marginBottom={3}
                    >
                      {movie.title}
                    </Typography>
                    <Typography level="h2" fontSize="md">
                      {movie.description}
                    </Typography>
                  </CardContent>
                  <CardOverflow
                    variant="soft"
                    sx={{ bgcolor: "background.level1" }}
                  >
                    <Divider inset="context" />
                    <CardContent orientation="horizontal">
                      <Typography
                        level="body3"
                        fontWeight="md"
                        textColor="text.secondary"
                      >
                        {movie.language}
                      </Typography>
                      <Divider orientation="vertical" />
                    </CardContent>
                  </CardOverflow>
                  {/* </Card> */}
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
