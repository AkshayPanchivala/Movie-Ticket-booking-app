import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import BookingCard from "./BookingCard";
function AdminProfile() {
  const [Admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);
  console.log(Admin);
  return (
    <Box width={"100%"} display="flex">
      <Box
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        width={"35%"}
        padding={3}
      >
        <AccountCircleIcon
          sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
        />
        <Typography
          padding={1}
          width={"auto"}
          textAlign={"center"}
          border={"1px solid #ccc"}
          borderRadius={6}
        >
          Name:{"akkak"}
        </Typography>
        <Typography
          mt={1}
          padding={1}
          width={"auto"}
          textAlign={"center"}
          border={"1px solid #ccc"}
          borderRadius={6}
        >
          Email:{"akkak"}
        </Typography>
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

        {[1, 2, 3].map(() => (
          <BookingCard />
        ))}
      </Box>
    </Box>
  );
}

export default AdminProfile;
