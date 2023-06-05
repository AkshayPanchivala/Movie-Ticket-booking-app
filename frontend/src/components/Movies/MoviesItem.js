import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function MoviesItem({ title, releaseDate, posterurl, id }) {
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  // {isuserLoggedIn && navigate(`/booking/${movie._id}`);}
  // {const link=isuserLoggedIn && (`/booking/${id}`) : `/Auth` }
{isuserLoggedIn && navigate("/Auth")}
  return (
    <Card
      sx={{
        margin: 2,
        maxWidth: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img height={"50%"} width="100%" src={posterurl} alt={title} />
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={isuserLoggedIn && `/booking/${id}`}
          sx={{ margin: "auto",bgcolor:"#2b2d42",":hover":{
            bgcolor:"#121217",
          } }}
          size="small"
        >
          Book
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}

export default MoviesItem;
