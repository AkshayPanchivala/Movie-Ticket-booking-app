
import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { getUpcommingmovie } from "../api-helpers/api-helper";
import { CircularProgress, Grid, Pagination } from "@mui/material";

export default function UpcomingMovie() {
  const [movie, Setmovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perpagemovie, Setperpagemovie] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [moviesPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState();
  const [expandedMovie, setExpandedMovie] = useState("");

  useEffect(() => {
    setLoader(true);
    console.log("kddslhgl");
    getUpcommingmovie().then((res) => {
      Setmovie(res);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = currentPage * moviesPerPage;
    Setperpagemovie(movie.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(movie.length / moviesPerPage));
  }, [currentPage, moviesPerPage, movie]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const toggleDescription = (movieId) => {
    setExpandedMovie((prevState) => (prevState === movieId ? "" : movieId));
  };

  return (
    <>
      {Loader && (
        <>
          {console.log("load")}
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      )}
      <Box
        sx={{ marginBottom: 2, marginTop: 3, marginLeft: 20, marginRight: 0 }}
      >
        <Grid container spacing={1}>
          {!Loader &&
            perpagemovie.map((e) => (
              <>
                {e.poster_path === null && null}

                {e.poster_path !== null && (
                  <Grid item xs={12} sm={4} md={4} lg={4} key={e.id}>
                    <Box
                      position="relative"
                      draggable="false"
                      sx={{ marginRight: 0 }}
                    >
                      <Card
                        variant="outlined"
                        sx={(theme) => ({
                          width: 300,
                          minHeight: 610,
                          gridColumn: "span 2",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          overflow: "hidden",
                          gap: "clamp(0px, (100% - 360px + 32px) * 999, 8px)",
                          transition: "transform 0.3s, border 0.3s",
                          "&:hover": {
                            borderColor:
                              theme.vars.palette.primary.outlinedHoverBorder,
                            transform: "translateY(-2px)",
                          },
                          "& > *": {
                            minWidth: "clamp(0px, (360px - 100%) * 999,100%)",
                          },
                        })}
                      >
                        <AspectRatio
                          variant="soft"
                          sx={{
                            flexGrow: 1,
                            display: "contents",
                            "--AspectRatio-paddingBottom":
                              "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
                          }}
                        >
                          {e.poster_path && (
                            <img
                              alt=""
                              src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                            />
                          )}
                        </AspectRatio>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            maxWidth: 200,
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <div>
                              <Typography
                                level="h2"
                                sx={{ fontSize: "md" }}
                                mb={0.5}
                              >
                                <Link
                                  overlay
                                  underline="none"
                                  sx={{
                                    color: "text.primary",
                                    "&.Mui-focusVisible:after": {
                                      outlineOffset: "-4px",
                                    },
                                  }}
                                >
                                  {e.title}
                                </Link>
                              </Typography>
                              <Typography level="body2">
                                {e.original_language === "en" && "English"}
                                {e.original_language === "hi" && "Hindi"}
                              </Typography>
                            </div>
                          </Box>

                          {e.poster_path && (
                            <AspectRatio ratio="3/4">
                              <img
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                              />
                            </AspectRatio>
                          )}
                          <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
                            <Box>
                              <Typography>
                                <strong>Release Date:</strong> {e.release_date}
                              </Typography>

                              <Typography>
                                <strong>About the movie</strong>
                              </Typography>
                              {expandedMovie === e.id ? (
                                <Typography fontWeight="15px" level="body2">
                                  {e.overview}
                                  <Link onClick={() => toggleDescription(e.id)}>
                                    <Typography>
                                      {e.overview.length > 100 && "view less"}
                                    </Typography>
                                  </Link>
                                </Typography>
                              ) : (
                                <Typography fontWeight="15px" level="body2">
                                  {e.overview.slice(0, 100)}{" "}
                                  <Link onClick={() => toggleDescription(e.id)}>
                                    <Typography>
                                      {e.overview.length > 100 && "view more"}
                                    </Typography>
                                  </Link>
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Box>
                  </Grid>
                )}
              </>
            ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
}
