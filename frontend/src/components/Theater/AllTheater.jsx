import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  Stack,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  CircularProgress,
  Button,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  getAlladmin,
  getAlladminCity,
  getTheaterbycity,
  Theaterdelete,
} from "../../api-helpers/api-helper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function AllTheater() {
  const [Theater, SetTheater] = useState("");
  const [totalPages, settotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [Delete, setDelete] = useState(true);
  const [Loader, setLoader] = useState(true);
  const [theaterbycity, Settheaterbycity] = useState(true);

  const [searchedCity, SetsearchedCity] = useState();
  const [searchcity, setsearchcity] = useState(false);
  const [currentPagebycity, setcurrentPagebycity] = useState(1);
  const [city, setCity] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getAlladmin(currentPage)
      .then((res) => {
        settotalPages(res.data.totalPages);
        SetTheater(res.data.data);
        setLoader(false);
      })

      .catch((err) => console.log(err));
  }, [currentPage, Delete, theaterbycity]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const handlePageChangebycity = (event, page) => {
    setcurrentPagebycity(page);
  };

  const Theaterdeletehandler = (id) => {
    Theaterdelete(id).then(() => {
      setDelete(!Delete);
      navigate("/");
    });


  };

  useEffect(() => {
    getAlladminCity()
      .then((res) => {
        setCity(res.data.data);
      })
      .catch((err) => console.log(err));

    getTheaterbycity(searchedCity, currentPagebycity).then((res) => {
      if (searchcity === true) {
        SetTheater(res.data.theater);
        settotalPages(res.data.totalPages);
      }
    });
  }, [currentPagebycity, searchedCity, searchcity, Delete]);
  const handlechange = (e, val) => {
    setsearchcity(true);

    setCurrentPage(1);
    if (val === null) {
      setsearchcity(false);
      setLoader(true);
      setcurrentPagebycity(1);
      setCurrentPage(1);
      Settheaterbycity(!theaterbycity);
    }
    SetsearchedCity(val);
  };
  return (
    <>
      {Loader && (
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
      {city && (
        <Box
          width={"200px"}
          border={"darkgrey"}
          marginTop="18px"
          marginLeft="5px"
        >
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {Theater &&
            Theater.map((theater) => (
              <>
                <Grid item xs={2} sm={4} md={6}>
                  <>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        overflow: "hidden",
                        margin: "10px",
                        minHeight: "230px",
                      }}
                      variant="outlined"
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          maxWidth: { xs: "90%", sm: "200px" },
                          objectFit: "cover",
                        }}
                        src={`${theater.profilephoto}`}
                        alt="Caffe Latte"
                      />

                      <Stack sx={{ flex: 1 }}>
                      
                        <CardContent>
                          <Typography variant="h10" component="div">
                            <strong>Theater Name:</strong> {theater.name}
                          </Typography>
                          <Typography>
                            <strong>Email:</strong>
                            {theater.email}
                          </Typography>

                          <Typography>
                            <strong>Address:</strong>
                            {theater.address}
                            {","} {theater.city}
                            {","} {theater.state}
                            {","}
                            {theater.pincode}
                          </Typography>
                          <Typography>
                            <strong>Pincode:</strong>
                            {theater.pincode}
                          </Typography>
                          <Typography>
                            <strong>City:</strong>
                            {theater.city}
                          </Typography>
                        </CardContent>
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => {
                            Theaterdeletehandler(theater._id);
                          }}
                        >
                          <IconButton color="default" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Button>
                      </Stack>
                    </Card>
                  </>
                </Grid>
              </>
            ))}
        </Grid>
      </Box>

      {!searchcity && (
        <Stack spacing={2} marginLeft={65} marginTop={10}>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      )}

      {searchcity && (
        <Stack spacing={2} marginLeft={65} marginTop={10}>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={handlePageChangebycity}
          />
        </Stack>
      )}
    </>
  );
}

export default AllTheater;
