import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Pagination,
  Stack,
  CircularProgress,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { getUserBooking, getUserbyid } from "../api-helpers/api-helper";
import BookingCard from "./BookingCard";

const UserProfile = () => {
  const [User, setUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [Loader, setLoader] = useState(true);

  const [Bookings, setBookings] = useState();
  const [totalPages, settotalPages] = useState("");

  useEffect(() => {
    getUserBooking(currentPage).then((res) => {
      console.log(res.data)
      settotalPages(res.data.totalPages);
      setBookings(res.data.booking);
    });
    const user = getUserbyid();
    user
      .then((res) => {
        setUser(res);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
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
      {User && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                maxWidth: "430px",
                margin: "10px",
                marginLeft: "120px",
                justifyContent: "flex-start",
                alignItems: "center",
                pt: 8,
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  backgroundColor: "whitesmoke",
                  borderRadius: "20px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Avatar
                  sx={{
                    width: 170,
                    height: 170,
                    marginBottom: "20px",
                    marginTop: "25px",
                    backgroundColor: "white",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <img
                    src={User && User.profilephoto}
                    alt="Profile Pic"
                    style={{
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Avatar>

                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "black", textAlign: "left" }}
                  >
                    <strong> Full Name: </strong>
                    {User?.name}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "black", textAlign: "left" }}
                  >
                    <strong> E-mail: </strong>
                    {User.email}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "black", textAlign: "left" }}
                  >
                    <strong> Phone number: </strong>
                    {User.phonenumber}
                  </Typography>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: "black", textAlign: "left" }}
                    >
                      <strong> City: </strong>
                      {User.city}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: "black",
                        textAlign: "left",
                        marginLeft: "45px",
                      }}
                    >
                      <strong>Pincode: </strong>
                      {User.pincode}
                    </Typography>
                  </div>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "black", textAlign: "left" }}
                  >
                    <strong> State: </strong>
                    {User.state}
                  </Typography>
                </CardContent>
              </Card>
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
              {Bookings && (
                <>
                  {Bookings?.map((e) => (
                    <>
                      <BookingCard
                        key={e._id}
                        id={e._id}
                        Title={e.movie?.title}
                        Date={e.date}
                        SeatNumber={e.seatNumber}
                        ShowTime={e.ShowTime}
                        TheaterName={e.theater?.name}
                        Address={e.theater?.address}
                        city={e.theater?.city}
                        state={e.theater?.state}
                        pincode={e.theater?.pincode}

                      />
                    </>
                  ))}
                  <Stack spacing={2} marginLeft={40}>
                    <Pagination
                      count={totalPages}
                      color="primary"
                      onChange={handlePageChange}
                    />
                  </Stack>
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default UserProfile;
