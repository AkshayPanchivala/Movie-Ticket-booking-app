import { Avatar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingCard from "./BookingCard";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddedMoviesCard from "./AddedMoviesCard";
function AdminProfile() {
  const [Theater, setTheater] = useState();
  const status = useLocation();
  const navigate = useNavigate();
  const [resStatus, setResStatus] = useState(status);
  const state = status.state;
  useEffect(() => {
    getAdminById()
      .then((res) => setTheater(res.admin))
      .catch((err) => console.log(err));
    if (state === 201) {
      return toast.success("Movie is created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);
  const updatehandler = () => {
    navigate("/updateprofile");
  };

  const profilehandler = () => {
    console.log("clicked");
  };

  return (
    <>
      {Theater && (
        <>
          {console.log(Theater.adedMovies)}
          <Box width={"100%"} display="flex" >
            <Box
              flexDirection={"column"}
              justifyContent="center"
              alignItems="center"
              width={"35%"}
              padding={3}

            >
              <Avatar
                alt="User Profile Photo"
                src={`${Theater.profilephoto}`}
                style={{ borderRadius: "50%", width: 325, height: 300 }}
              />

              <Typography
                marginTop={2}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                <strong>Name:</strong>
                {Theater.name}
              </Typography>
              <Typography
                mt={1}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                <strong> Email:</strong>
                {Theater.email}
              </Typography>
              <Typography
                mt={1}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                <strong> phoneNumber:</strong>
                {Theater.phonenumber}{" "}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </Typography>
              <Typography
                mt={1}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                <strong> State: </strong> {Theater.state}
              </Typography>
              <Typography
                mt={1}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                <strong> City:</strong>
                {Theater.city}
              </Typography>
              <Stack spacing={4} direction="row" margin={2}>
                <Button
                  variant="contained"
                  borderRadius={2}
                  onClick={updatehandler}
                >
                  update profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  style={{ color: "black" }}
                  onMouseEnter={(e) => (e.target.style.color = "red")}
                  onMouseLeave={(e) => (e.target.style.color = "black")}
                  onClick={profilehandler}
                >
                  Delete Profile
                </Button>
              </Stack>
            </Box>
            <Box width={"70%"} display="flex" flexDirection={"column"}>
              <Typography
                variant="h3"
                fontFamily={"verdana"}
                textAlign="center"
                padding={2}
              >
                Added Movies
              </Typography>

              {Theater.adedMovies &&
                Theater.adedMovies.map((e) => (
                  <>
                    {console.log("ee" + e)}
                    <AddedMoviesCard key={e} id={e} />
                  </>
                ))}
            </Box>
          </Box>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default AdminProfile;
