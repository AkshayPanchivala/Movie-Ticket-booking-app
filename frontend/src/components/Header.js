// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Autocomplete,
//   IconButton,
//   Tab,
//   Tabs,
//   TextField,
//   Toolbar,
// } from "@mui/material";
// import MovieIcon from "@mui/icons-material/Movie";
// import { Box } from "@mui/system";
// import { getAllMovies } from "../api-helpers/api-helper";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminActions, theaterActions, userActions } from "../store";

// function Header() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isTheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);
//   const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

//   const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
//   const [value, setvalue] = useState();

//   const logoutTheater = () => {
//     dispatch(theaterActions.logout());
//   };
//   const logoutUser = () => {
//     dispatch(userActions.logout());
//   };
//   const logoutAdmin = () => {
//     dispatch(adminActions.logout());
//   };

//   return (
//     <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
//       <Toolbar>
//         <Box width={"20%"}>
//           <IconButton LinkComponent={Link} to="/">
//             <MovieIcon />
//           </IconButton>
//         </Box>

//         <Box display={"flex"}>
//           <Tabs
//             textColor="inherit"
//             indicatorColor="secondary"
//             value={value}
//             onChange={(e, val) => setvalue(val)}
//           >
//             <Tab LinkComponent={Link} to="/movies" label="Movies" />
//             {!isTheaterLoggedIn && !isuserLoggedIn && !isadminLoggedIn && (
//               <>
//                 <Tab LinkComponent={Link} to="/admin" label="Admin" />
//                 <Tab LinkComponent={Link} to="/theater/login" label="Theater" />
//                 <Tab LinkComponent={Link} to="/Auth" label="Auth" />
//               </>
//             )}
//             {isadminLoggedIn && (
//               <>
//                 <Tab LinkComponent={Link} to="/add" label="Add Movie" />
//                 <Tab LinkComponent={Link} to="/theater" label="Add Theater" />
//                 {/* <Tab LinkComponent={Link} to="/user" label="Profile" /> */}

//                 <Tab
//                   onClick={() => logoutAdmin()}
//                   LinkComponent={Link}
//                   to="/"
//                   label="Logout"
//                 />
//               </>
//             )}
//             {isuserLoggedIn && (
//               <>
//                 <Tab LinkComponent={Link} to="/user" label="Profile" />
//                 <Tab
//                   onClick={() => logoutUser()}
//                   LinkComponent={Link}
//                   to="/"
//                   label="Logout"
//                 />
//               </>
//             )}
//             {/* {isadminLoggedIn && (
//               <>

//               </>
//             )} */}
//             {isTheaterLoggedIn && (
//               <>
//                 {/* <Tab LinkComponent={Link} to="/add" label="Add movie" /> */}
//                 <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
//                 <Tab
//                   onClick={() => logoutTheater()}
//                   LinkComponent={Link}
//                   to="/"
//                   label="Logout"
//                 />
//               </>
//             )}
//           </Tabs>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }
// export default Header;
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { getAllMovies } from "../api-helpers/api-helper";
import { adminActions, theaterActions, userActions } from "../store";

const pages = ["Add Movie", "Add Theater"];
const settings = ["Profile", "Logout"];
const initialsetting = ["Admin", "Theater", "User"];
function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [movies, setMovies] = React.useState([]);

  const [selectedmovie, setselectedmovie] = React.useState();
  const dispatch = useDispatch();
  React.useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const istheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
  const handleadminSettingClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Profile":
        navigate("/admin"); // Replace "/profile" with the actual path for the profile page
        break;
      case "Logout":
        dispatch(adminActions.logout()); // Replace "/logout" with the actual path for the logout functionality
        break;

      default:
        navigate("/");
        break;
    }
  };
  const handleAdminPageClick = (clickedPage) => {
    handleCloseUserMenu();
    switch (clickedPage) {
      case "Add Movie":
        navigate("/add"); // Replace "/profile" with the actual path for the profile page
        break;
      case "Add Theater":
        navigate("/theater"); // Replace "/logout" with the actual path for the logout functionality
        break;
      case "User":
        navigate("/Auth"); // Replace "/logout" with the actual path for the logout functionality
        break;
      default:
        navigate("/");
        break;
    }
  };
  const handleuserSettingClick = (setting) => {
    handleCloseUserMenu();
    console.log(setting);
    switch (setting) {
      case "Profile":
        navigate("/user"); // Replace "/profile" with the actual path for the profile page
        break;
      case "Logout":
        dispatch(userActions.logout()); // Replace "/logout" with the actual path for the logout functionality
        break;

      default:
        navigate("/");
        break;
    }
  };
  const handleInitialSettingClick = (setting) => {
    handleCloseUserMenu(); // Close the settings menu
    switch (setting) {
      case "Admin":
        navigate("/admin"); // Replace "/profile" with the actual path for the profile page
        break;
      case "Theater":
        navigate("/theater/login"); // Replace "/logout" with the actual path for the logout functionality
        break;
      case "User":
        navigate("/Auth"); // Replace "/logout" with the actual path for the logout functionality
        break;
      default:
        // Handle other settings if needed
        break;
    }
  };
  return (
    <AppBar position="static" sx={{ height: 80, backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>
          {!isadminLoggedIn && (
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
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {isadminLoggedIn &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleAdminPageClick(page)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "black",
                      borderRadius: "10",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 2, ml: 2 }}>
                <Avatar
                  sx={{ p: 2 }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isadminLoggedIn &&
                settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleadminSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              {isuserLoggedIn &&
                settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleuserSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              {istheaterLoggedIn &&
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              {!isadminLoggedIn &&
                !isuserLoggedIn &&
                !istheaterLoggedIn &&
                initialsetting.map((setting) => (
                  // <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  //   <Typography textAlign="center">{setting}</Typography>
                  // </MenuItem>
                  <MenuItem
                    key={setting}
                    onClick={() => handleInitialSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
