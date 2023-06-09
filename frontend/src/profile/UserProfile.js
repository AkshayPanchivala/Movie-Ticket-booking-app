import { makeStyles } from "@mui/styles";
import { Avatar, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getUserBooking, getUserbyid } from "../api-helpers/api-helper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingCard from "./BookingCard";
import Booking from "../components/Bookings/Booking";
import { Card } from "reactstrap";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const useStyles = makeStyles({
  circularCard: {
    maxWidth: 345,
    borderRadius: "50%",
    overflow: "hidden",
  },
  circularImage: {
    paddingTop: "100%", // Set the aspect ratio to create a perfect circle
  },
});
function UserProfile() {
  const [Bookings, setBookings] = useState();
  const [User, setUser] = useState();
  const [profile, setProfile] = useState("");
  const [totalPages, settotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const status = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // getUserBooking()
    //   .then((res) => setBookings(res.bookings))
    //   .catch((err) => console.log(err));
    //
    getUserBooking(currentPage)
      .then((res) => {
        console.log(res);
        console.log(res.data.totalPages);
        settotalPages(res.data.totalPages);
        setBookings(res.data.booking);
      })
      .catch((err) => console.log(err));
    const user = getUserbyid();
    user.then((res) => setUser(res)).catch((err) => console.log(err));
  }, [currentPage]);
  console.log(User);
  useEffect(() => {
    if (User) {
      const email = User.profilephoto;
      setProfile(email);
    }
    if (status.state === 200) {
      toast.success("Account is updated", {
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

  // import avatar from `./../../../backend/Photos/user/userProfile/${email}`;
  const updatehandler = () => {
    navigate("/updateprofile", { state: User });
  };

  const profilehandler = () => {
    console.log("clicked");
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  // {Bookings &&
  //   Bookings.map((e) => (
  //     <>
  //       {console.log("ee" + e.seatNumber)}
  //       <BookingCard
  //         key={Bookings._id}
  //         Title={e.movie.title}
  //         Date={e.date}
  //         SeatNumber={e.seatNumber}
  //         ShowTime={e.ShowTime}
  //         TheatreName={e.admin.name}
  //       />
  //     </>
  //   ))}
  return (
    <>
      {User && (
        <Box width={"100%"} display="flex">
          {console.log("hdjfdfjdf", Bookings)}
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            width={"35%"}
            padding={3}
          >
            <Avatar
              alt="User Profile Photo"
              src={`${User.profilephoto}`}
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
              {User.name}
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
              {User.email}
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
              {User.phonenumber}{" "}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                page
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
              <strong> State: </strong> {User.state}
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
              {User.city}
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
              Bookings
            </Typography>

            {Bookings &&
              Bookings.map((e) => (
                <>
                  {console.log("ee" + e.seatNumber)}
                  <BookingCard
                    key={e._id}
                    id={e._id}
                    Title={e.movie.title}
                    Date={e.date}
                    SeatNumber={e.seatNumber}
                    ShowTime={e.ShowTime}
                    TheaterName={e.theater.name}
                  />
                </>
              ))}
            <Stack spacing={2} marginLeft={50}>
              <Pagination
                count={totalPages}
                color="primary"
                onChange={handlePageChange}
              />
            </Stack>
          </Box>
        </Box>
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

export default UserProfile;
