import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";

import Typography from "@mui/joy/Typography";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";

function Theatrecard(props) {
  const id = useParams();
  const movieid = id.id;

  const BookingHandler = () => {
    console.log("click");
  };
  return (
    <Card
      onClick={BookingHandler}
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 800,
        marginLeft: "15%",
        marginBottom: "2%",
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet={`${props.profilepicture}`}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
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
        >
          <Link
            overlay
            underline="none"
            href={`seatbooking/${movieid}/${props.id}`}
            sx={{ color: "text.tertiary" }}
          >
            {props.Address}
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}

export default Theatrecard;
