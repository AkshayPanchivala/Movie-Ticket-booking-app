import React from "react";
import { Dialog, Typography } from "@mui/material";

function AuthForm() {
  return (
    <Dialog open={true}>
      <Typography variant="h4" textAlign={"center"}>
        Login
      </Typography>
    </Dialog>
  );
}

export default AuthForm;
