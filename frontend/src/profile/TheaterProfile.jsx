import { Avatar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helper";
import { Card } from "@mui/material";

function TheaterProfile() {
  const [Theater, setTheater] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setTheater(res.admin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {Theater && (
        <>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              marginLeft: "550px",
              marginTop: "70px",
              backgroundColor: "whitesmoke",
              borderRadius: "20px",
              maxWidth: "530px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Avatar
              alt="User Profile Photo"
              src={`${Theater.profilephoto}`}
              style={{
                borderRadius: "50%",
                width: 250,
                height: 230,
                objectFit: "cover",
              }}
            />

            <Typography
              marginTop={2}
              padding={1}
              width={"320px"}
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
              width={"320px"}
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
              width={"320px"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              <strong> phoneNumber:</strong>
              {Theater.phonenumber}{" "}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"320px"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              <strong> State: </strong> {Theater.state}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"320px"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              <strong> City:</strong>
              {Theater.city}
            </Typography>
            <Stack spacing={4} direction="row" margin={2}></Stack>
          </Card>
        </>
      )}
    </>
  );
}

export default TheaterProfile;
