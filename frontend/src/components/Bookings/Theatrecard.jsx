import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
// import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";

import Typography from "@mui/joy/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";

function Theatrecard(props) {
  const id = useParams();
  const navigate = useNavigate();
  const movieid = id.id;
  console.log(props.city);
  console.log(props.state);
  console.log(props.pincode);
  const handleBookNow = () => {
    navigate(`/booking/seatbooking/${movieid}/${props.id}`);
  };
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 600,
        marginLeft: "8%",
        marginRight: "25%",
        marginBottom: "2%",
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <Box>
        <Typography
          level="h2"
          fontSize="lg"
          id="card-description"
          mb={0.5}
          ml={2}
        >
          {props.name}
        </Typography>

        <Typography
          fontSize="sm"
          aria-describedby="card-description"
          mb={1}
          ml={2}
          mt={1}
        >
          <Link
            overlay
            underline="none"
            to={`https://www.google.com/maps/search/?api=1&query=123+${props.Address}%2C+${props.city}%2C+India`}
            target="_blank"
            style={{ color: "text.tertiary", textDecoration: "none" }}
          >
            <LocationOnIcon /> {props.Address}
            {","}
            {props.city}
            {","}
            {props.state}
            {","}
            {props.pincode}
          </Link>
        </Typography>
      </Box>{" "}
      <div>
        <AspectRatio ratio="5/3" sx={{ width: 150 }}>
          <img
            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            srcSet={`${props.profilepicture}`}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Button
          variant="contained"
          color="inherit"
          sx={{ width: "150px", height: "30px", marginTop: "10px" }}
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
}

export default Theatrecard;
{
  /* <Button
          variant="contained"
          color="inherit"
          sx={{ marginLeft: "280px", marginTop: "50px" }}
          onClick={handleBookNow}
        >
          Book Now
        </Button> */
}
