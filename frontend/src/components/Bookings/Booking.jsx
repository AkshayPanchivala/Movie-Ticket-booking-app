import AspectRatio from "@mui/joy/AspectRatio";
import {
  Autocomplete,
  Card,
  CircularProgress,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createcomment,
  getAlladmin,
  getAlladminCity,
  getlikebyuser,
  getMovieDetails,
  getTheaterbycity,
  getTheaterbypagination,
} from "../../api-helpers/api-helper";
import CardOverflow from "@mui/joy/CardOverflow";
import Theatrecard from "./Theatrecard";
import { Input } from "reactstrap";
import { Face } from "@mui/icons-material";
import { Rating } from "./Rating";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";

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
  const [Comment, setComment] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [resComment, setresComment] = useState("");
  const [createComment, setcreateComment] = useState(false);
  const [rating, setrating] = useState(0);
  const [showComent, setshowComent] = useState(false);
  const [Commenthandler, setCommenthandler] = useState(false);
  const [Loader, setLoader] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setresComment(res.movie.comment);
        setMovie(res.movie);
        setLoader(true);
      })
      .catch((err) => console.log(err));
    getlikebyuser(id)
      .then((res) => {
        if (res.data.likes.length > 0) {
          setrating(res.data.likes[0].rating);
        } else {
          setrating(0);
        }
      })
      .catch((err) => console.log(err));
    getTheaterbypagination(currentPage)
      .then((res) => {
        settotalPages(res.data.totalPages);
        setTheatre(res.data.theater);
      })
      .catch((err) => console.log(err));
    getAlladminCity()
      .then((res) => {
    
      
        setCity(res.data.data);
      })
      .catch((err) => console.log(err));
    getTheaterbycity(searchedCity, currentPage).then((res) => {
      Settheaterbycity(res.data.theater);
      setcitytotalPages(res.data.totalPages);
    });

  }, [id, currentPage, searchedCity, createComment, Commenthandler]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlechange = (e, val) => {
    setsearchcity(true);
    setCurrentPage(1);
    if (val === null) {
      setsearchcity(false);
    }
    SetsearchedCity(val);
  };

  const handleInputChange = (e, val) => {
    setComment(e.target.value);
  };
  const commenthandler = () => {
    createcomment(Comment, id).then(() => {
      setcreateComment(!createComment);
      setComment("");
      setCommenthandler(!Commenthandler);
    });
  };
  const viewmorehandler = () => {
    setshowComent(!showComent);
  };
  return (
    <>
    
      {!Loader && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div>
        <Box display="flex" marginTop={"2%"} marginLeft="75.5%">
          {city && (
            <Box width={"200px"} border={"darkgrey"}>
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
            <Box
              display={"flex"}
              justifyContent={"center"}
              marginLeft="5%"
              borderRadius={5}
            >
              <Box sx={{ minHeight: 300, marginTop: "25px" }}>
                <Card variant="elevation">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      maxWidth: 520,
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <div>
                        <div
                          sx={{
                            margin: "20px",
                          }}
                        >
                          <Typography
                            level="h2"
                            variant="h6"
                            sx={{
                              fontSize: "24px",

                              
                              fontWeight: "550",
                            }}
                            mb={0.5}
                          >
                            {movie.title}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                    <Card
                    
                      variant="outlined"
                      sx={{
                        width: 400,
                        height: 533,
                        boxShadow: isHovered
                          ? "0 0 10px rgba(0, 0, 0, 0.3)"
                          : "none",
                        transform: isHovered ? "scale(1.05)" : "none",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        margin: "0 auto",
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

                    <Stack direction="row" alignItems="center" marginLeft={5}>
                      <Rating defaultValue={rating} id={id} size="small" />
                    </Stack>
                    <Typography level="body2" sx={{ marginLeft: "35px" }}>
                      <strong>Language:</strong>[{movie.language.join(",")}]
                    </Typography>
                    <Typography level="body2" sx={{ marginLeft: "35px" }}>
                      <strong>Genres:</strong>[{movie.category}]
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.0, mt: "auto" }}>
                      <Box style={{ marginLeft: "35px" }}>
                        <Typography>
                          {" "}
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

                    <Box sx={{ display: "flex", gap: 1.0 }}>
                      <Box style={{ marginLeft: "35px", width: "400px" }}>
                        {resComment.length > 0 && (
                          <Typography>
                            {" "}
                            <strong>Reviews </strong>
                          </Typography>
                        )}

                        {resComment.length > 0 && (
                          <>
                            {!showComent &&
                              resComment.slice(0, 3).map((commen) => (
                                <Card
                                  sx={{ maxWidth: 520, marginBottom: "15px" }}
                                >
                                  <CardHeader
                                    avatar={
                                      <Avatar
                                        src={commen.user.profilephoto}
                                        sx={{ bgcolor: red[500] }}
                                      ></Avatar>
                                    }
                                    title={commen.user.name}
                                    subheader={commen.comment}
                                  />
                                </Card>
                              ))}{" "}
                            {resComment.length > 3 && !showComent && (
                              <Link
                                onClick={viewmorehandler}
                                color="text.primary"
                              style={{textDecoration:"none"}}
                              >
                                View More
                              </Link>
                            )}
                            {showComent &&
                              resComment.map((commen) => (
                                <Card
                                  sx={{ maxWidth: 520, marginBottom: "15px" }}
                                >
                                  <CardHeader
                                    avatar={
                                      <Avatar
                                        src={commen.user.profilephoto}
                                        sx={{ bgcolor: red[500] }}
                                      ></Avatar>
                                    }
                                    title={commen.user.name}
                                    subheader={commen.comment}
                                  />
                                </Card>
                              ))}
                            {showComent && (
                              <Link
                                onClick={viewmorehandler}
                                color="text.primary"
                                style={{textDecoration:"none"}}
                              >
                                Less comment
                              </Link>
                            )}
                          </>
                        )}
                      </Box>
                    </Box>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: " 88%",
                        marginBottom: "20px",
                      }}
                    >
                      <IconButton
                        size="sm"
                        variant="plain"
                        color="neutral"
                        sx={{ ml: 3 }}
                      >
                        <Face />
                      </IconButton>
                      <Input
                        variant="plain"
                        size="xs"
                        value={Comment}
                        placeholder="Add a Review…"
                        sx={{
                          flexGrow: 1,
                          mr: 1,
                          "--Input-focusedThickness": "0px",
                        }}
                        onChange={handleInputChange}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          textDecoration: "none",
                          marginBottom: "15px",
                          marginLeft: "20px",
                        }}
                      >
                        <Link role="button" onClick={commenthandler} style={{textDecoration:"none",paddingTop:"12px"}}>
                          Post
                        </Link>
                      </div>
                    </div>
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
                      city={Theater.city}
                      state={Theater.state}
                      pincode={Theater.pincode}
                    />
                  ))}

                {searchcity &&
                  theaterbycity &&
                  theaterbycity.map((Theater, index) => (
                    <>
                      <Theatrecard
                        key={Theater._id}
                        profilepicture={Theater.profilephoto}
                        Address={Theater.address}
                        name={Theater.name}
                        id={Theater._id}
                        city={Theater.city}
                        state={Theater.state}
                        pincode={Theater.pincode}
                      />
                    </>
                  ))}
                {!searchcity && (
                  <Stack spacing={2} marginLeft={30}>
                    <Pagination
                      count={totalPages}
                      color="primary"
                      onChange={handlePageChange}
                    />
                  </Stack>
                )}
                {searchcity && (
                  <Stack spacing={2} marginLeft={30}>
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
    </>
  );
}

export default Booking;
