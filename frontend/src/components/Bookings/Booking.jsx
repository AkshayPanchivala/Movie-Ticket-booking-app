import AspectRatio from "@mui/joy/AspectRatio";
import {
  Autocomplete,
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAlladmin,
  getmovie,
  getMovieDetails,
  getTheaterbycity,
  getTheaterbypagination,
} from "../../api-helpers/api-helper";
import CardOverflow from "@mui/joy/CardOverflow";
import Theatrecard from "./Theatrecard";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
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
  console.log(Theatre);
  return (
    <div>
      <Box display="flex" marginTop={"2%"}>
        {city && (
          <Box width={"20%"} marginLeft={170} border={"darkgrey"}>
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
          <Box
            display={"flex"}
            justifyContent={"center"}
            marginLeft="5%"
            borderRadius={5}
          >
            {/* <Box
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Card
                marginRight={20}
                variant="outlined"
                sx={{
                  width: 400,
                  height: 540,
                  boxShadow: isHovered ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none",
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
                <Stack direction="row" alignItems="center">
                  <Typography
                    level="h2"
                    fontSize="25px"
                    fontWeight={50}
                    marginBottom={3}
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    level="body3"
                    fontWeight="md"
                    textColor="text.secondary"
                    marginLeft={60}
                    marginBottom={3}
                  >
                    Likes: {movie.likescount}
                  </Typography>
                </Stack>
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
             
            </Box> */}

            <Box sx={{ minHeight: 300 }}>
              <Card
                variant="outlined"
                sx={(theme) => ({
                  width: 500,
                  gridColumn: "span 2",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  resize: "horizontal",
                  overflow: "hidden",
                  gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
                  transition: "transform 0.3s, border 0.3s",

                  "& > *": {
                    minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                  },
                })}
              >
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
                      height: 540,
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
                  <Typography level="body2" sx={{ marginLeft: "20px" }}>
                    Language:[{movie.language+" "}]
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1.0, mt: "auto" }}>
                    <Box style={{ marginLeft: "5%" }}>
                      <Typography>About the movie:</Typography>
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

            <Box width={"50%"} paddingTop={3} marginRight={"7%"}>
              {!searchcity &&
                Theatre &&
                Theatre.map((Theater, index) => (
                  <Theatrecard
                    key={Theater._id}
                    name={Theater.name}
                    id={Theater._id}
                    profilepicture={Theater.profilephoto}
                    Address={Theater.address}
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
