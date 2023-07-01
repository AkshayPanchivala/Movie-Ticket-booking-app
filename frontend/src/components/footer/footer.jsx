import React from "react";

import { Box, Container, Grid, Typography, Link } from "@material-ui/core";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#007BFF",
    },
    secondary: {
      main: "#FFC107",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.type === "light" ? "black" : "#212121",
    color: theme.palette.type === "light" ? "#333333" : "#F5F5F5",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
  },
  listHeader: {
    fontWeight: 500,
    fontSize: "18px",
    color: "white",
    marginBottom: theme.spacing(2),
  },
  link: {
    display: "block",
    color: "inherit",
    marginBottom: theme.spacing(1),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  borderTop: {
    borderTop: `1px solid ${
      theme.palette.type === "light" ? "#E0E0E0" : "#757575"
    }`,
  },
  footerText: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  socialButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: theme.palette.type === "light" ? "#F5F5F5" : "#424242",
    cursor: "pointer",
    transition: "background 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.type === "light" ? "#EEEEEE" : "#616161",
    },
  },
}));

const ListHeader = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.listHeader} variant="subtitle1">
      {children}
    </Typography>
  );
};

export default function Footer() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme} style={{contain: "strict"}}>
      <Box className={classes.root} style={{ marginTop: "20vh"}}>
  
        <Container className={classes.container}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{ textAlign: "left" }}>
                <ListHeader style={{ paddingRight: "0px",paddingBottom:"20px" }}>Company</ListHeader>
                <Typography>About Us</Typography>
                <Typography>Blog</Typography>
                <Typography>Careers</Typography>
           
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div style={{ textAlign: "left", paddingRight: "0px",paddingBottom:"20px" }}>
                <ListHeader>Support</ListHeader>
                <Typography>Help Center</Typography>
                <Typography>Safety Center</Typography>
                <Typography>Community Guidelines</Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Box className={classes.borderTop}>
          <Container className={classes.container} py={4}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={6}
            >
              <Grid item xs={12}>
                <Typography
                  className={classes.footerText}
                  style={{ color: "white", textAlign: "center" ,paddingTop:"15px"}}
                >
                  © 2023 TicketCinema. All rights reserved
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
