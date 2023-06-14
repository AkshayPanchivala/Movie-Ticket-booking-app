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
import CardOverflow from "@mui/joy/CardOverflow";
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

  const [isHovered, setIsHovered] = useState(false);

  // Rest of your component code

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
          {console.log(movie)}
          <Box display={"flex"} justifyContent={"center"} marginLeft="5%">
            <Box
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Card
                variant="outlined"
                sx={{
                  width: 720,
                  height: 550,
                  boxShadow: isHovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none",
                  transform: isHovered ? "scale(1.05)" : "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <img
                      src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                      srcSet={`${movie.posterUrl}`}
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
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
              </Card>
            </Box>
            
            <Box width={"50%"} paddingTop={3} marginRight={"7%"}>
              {!searchcity &&
                Theatre &&
                Theatre.map((Theater, index) => (
                  <Theatrecard
                    key={Theater._id}
                    name={Theater.name}
                    id={Theater._id}
                    profilepicture={Theater.profilephoto}
                    Address={Theater.Address}
                  />
                ))}

              {searchcity &&
                theaterbycity &&
                theaterbycity.map((Theater, index) => (
                  <>
                    {console.log(Theater.profilephoto)}
                    <Theatrecard
                      key={Theater._id}
                      profilepicture={Theater.profilephoto}
                      Address={Theater.Address}
                      name={Theater.name}
                      id={Theater._id}
                    />
                  </>
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

