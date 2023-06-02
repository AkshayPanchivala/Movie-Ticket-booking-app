import { makeStyles } from "@mui/styles";
import { CardActionArea, CardMedia, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getUserBooking, getUserbyid } from "../api-helpers/api-helper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import BookingCard from "./BookingCard";
import Booking from "../components/Bookings/Booking";
import { Card } from "reactstrap";
import { Button } from "@mui/base";
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
  const classes = useStyles();
  const [Bookings, setBookings] = useState();
  const [User, setUser] = useState();
  const [profile, setProfile] = useState("");

  useEffect(() => {
    // getUserBooking()
    //   .then((res) => setBookings(res.bookings))
    //   .catch((err) => console.log(err));
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));
    const user = getUserbyid();
    user.then((res) => setUser(res.user)).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (User) {
      const email = User.profilephoto;
      setProfile(email);
    }
  }, []);
  // import avatar from `./../../../backend/Photos/user/userProfile/${email}`;
  {
    User && console.log("userfromuser", User);
  }
  return (
    <>
      {User && (
        <Box width={"100%"} display="flex">
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            width={"35%"}
            padding={3}
          >
            {console.log("jhjh" + User.profilephoto)}

            {profile && (
              <Card className={classes.circularCard}>
                <CardActionArea>
                  <CardMedia
                    className={classes.circularImage}
                    component="img"
                    alt="User Profile"
                    height="200"
                    width="150"
                    src={`./../../../backend/Photos/user/userProfile/${profile}`}
                  />
                </CardActionArea>
              </Card>
            )}
            <Typography
              marginTop={2}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name:{User.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email:{User.email}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              phoneNumber:{User.phonenumber}
            </Typography>
            <Stack spacing={2} direction="row" margin={2}>
              <Button variant="contained" borderRadius={2}>
                update profile
              </Button>
              <Button variant="cantained">Delete Profile</Button>
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

            {Bookings && Bookings.map(() => <BookingCard key={Bookings._id} />)}
          </Box>
        </Box>
      )}
    </>
  );
}

export default UserProfile;
