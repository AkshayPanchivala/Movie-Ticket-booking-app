import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router-dom";
import Index from "../SeatBooking/Index";

export default function BookingCard(props) {
  const id = useParams();
  const movieid = id.id;
  console.log(movieid);
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
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
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
          {/* <Index/> */}
            California, USA
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: "none", ml: "2" }}
        >
          Cool weather all day long
        </Chip>
      </div>
    </Card>
  );
}
