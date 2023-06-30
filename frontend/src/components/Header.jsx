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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { getAllMovies } from "../api-helpers/api-helper";
import { adminActions, theaterActions, userActions } from "../store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = ["Add Movie", "Add Theater"];
const Allpages= ["All Movies", "Upcoming Movies"];


const Adminsettings = ["All Theater", "Logout"];

const Theatersettings = ["Today Booking","Profile", "Logout"];
const settings = ["Profile", "Logout"];
const initialsetting = ["Admin", "Theater", "User"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [movies, setMovies] = React.useState([]);

  const dispatch = useDispatch();
  const name = localStorage.getItem("Name");
  // console.log(name.slice(0,1));

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
    const movie = movies.find((m) => m.title === val);

    if (movie) {
      if (isuserLoggedIn) {
        navigate(`/booking/${movie._id}`);
      } else {
        navigate("/Auth");
      }
    } else {
      navigate(`/`);
    }
  };
  const handleadminSettingClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "All Theater":
        navigate("/all");
        break;
      case "Logout":
        dispatch(adminActions.logout());
        navigate("/");
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
        navigate("/add");
        break;
      case "Add Theater":
        navigate("/theater");
        break;

      default:
        navigate("/");
        break;
    }
  };
  const handlePageClick = (clickedPage) => {
    handleCloseUserMenu();
    switch (clickedPage) {
      case "All Movies":
        navigate("/movies");
        break;
      case "Upcoming Movies":
        navigate("/upcomingmovie");
        break;

      default:
        navigate("/");
        break;
    }
  };
  const handleuserSettingClick = (setting) => {
    handleCloseUserMenu();
    // console.log(setting);
    switch (setting) {
      case "Profile":
        navigate("/user");
        break;
      case "Logout":
        dispatch(userActions.logout());
        navigate("/");
        break;

      default:
        navigate("/");
        break;
    }
  };
  const handletheaterSettingClick = (setting) => {
    handleCloseUserMenu();
    console.log(setting);
    switch (setting) {
      case "Profile":
        navigate("user-admin");
        break;
      case "Today Booking":
        navigate("todaybooking");
        break;
      case "Logout":
        dispatch(theaterActions.logout());
        navigate("/");
        break;

      default:
        navigate("/");
        break;
    }
  };
  const handleInitialSettingClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Admin":
        navigate("/admin");
        break;
      case "Theater":
        navigate("/theater/login");
        break;
      case "User":
        navigate("/Auth");
        break;
      default:
        navigate("/");
        break;
    }
  };
  return (
    <AppBar position="static" sx={{ height: 80, backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
              TicketCinema
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
              TicketCinema
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
            {Allpages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageClick(page)}
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
            {isadminLoggedIn && (
              <>
                {pages.map((page) => (
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
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 2, ml: 2 }}>
                {/* <Avatar
                  sx={{ p: 2 }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                /> */}
                <Avatar sx={{ p: 2 }}>
                  {name ? (
                    name.slice(0, 1).toUpperCase()
                  ) : (
                    <AccountCircleIcon />
                  )}
                </Avatar>
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
                Adminsettings.map((setting) => (
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
                Theatersettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handletheaterSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              {!isadminLoggedIn &&
                !isuserLoggedIn &&
                !istheaterLoggedIn &&
                initialsetting.map((setting) => (
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
