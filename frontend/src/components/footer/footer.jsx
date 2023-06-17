import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Typography, Link } from "@material-ui/core";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "light", // Change to 'dark' for a dark theme
    primary: {
      main: "#007BFF", // Customize the primary color
    },
    secondary: {
      main: "#FFC107", // Customize the secondary color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Customize the default font family
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.type === "light" ? "#F8F9FA" : "#212121",
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

const SocialButton = ({ children, label, href }) => {
  const classes = useStyles();
  return (
    <a className={classes.socialButton} href={href} aria-label={label}>
      {children}
    </a>
  );
};

export default function Footer() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root} style={{ marginTop: "5%" }}>
        <Container className={classes.container}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <ListHeader>Company</ListHeader>
                <Link href="#">About Us</Link>
                <Link href="#">Blog</Link>
                <Link href="#">Careers</Link>
                <Link href="#">Contact Us</Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <ListHeader>Support</ListHeader>
                <Link href="#">Help Center</Link>
                <Link href="#">Safety Center</Link>
                <Link href="#">Community Guidelines</Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <ListHeader>Legal</ListHeader>
                <Link href="#">Cookies Policy</Link>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms of Service</Link>
                <Link href="#">Law Enforcement</Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <ListHeader>Install App</ListHeader>
                <div>{/* Render AppStoreBadge component here */}</div>
                <div>{/* Render PlayStoreBadge component here */}</div>
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
              <Grid item xs={12} md={6}>
                <Typography className={classes.footerText}>
                  © 2022 Chakra Templates. All rights reserved
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
