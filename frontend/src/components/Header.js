import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, theaterActions, userActions } from "../store";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const [value, setvalue] = useState();
  const [movies, setMovies] = useState([]);

  // const [selectedmovie,setselectedmovie]=useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const logoutTheater = () => {
    dispatch(theaterActions.logout());
  };
  const logoutUser = () => {
    dispatch(userActions.logout());
  };
  const logoutAdmin = () => {
    dispatch(adminActions.logout());
  };
  const handlechange = (e, val) => {
    // setselectedmovie(val);
    const movie = movies.find((m) => m.title === val);

    console.log(movie);
    if (isuserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    } else {
      navigate("/Auth");
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handlechange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search across Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setvalue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            {!isTheaterLoggedIn && !isuserLoggedIn && !isadminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/theater/login" label="Theater" />
                <Tab LinkComponent={Link} to="/Auth" label="Auth" />
              </>
            )}
            {isadminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab LinkComponent={Link} to="/theater" label="Add Theater" />
                {/* <Tab LinkComponent={Link} to="/user" label="Profile" /> */}

                <Tab
                  onClick={() => logoutAdmin()}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
            {isuserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab
                  onClick={() => logoutUser()}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
            {/* {isadminLoggedIn && (
              <>
               
              </>
            )} */}
            {isTheaterLoggedIn && (
              <>
                {/* <Tab LinkComponent={Link} to="/add" label="Add movie" /> */}
                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                <Tab
                  onClick={() => logoutTheater()}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
