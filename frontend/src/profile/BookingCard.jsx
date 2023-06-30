import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBooking } from "../api-helpers/api-helper";
import { Link, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
// import { toast } from "react-toastify";

export default function BookingCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    hour12: true,
  });

  const t = currentTime.split(" ")[0];

  const p = currentTime.split(" ")[1];

  const date = new Date(props.Date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = props.ShowTime.split(" ")[0];

  const cancelbookinghandler = (id) => {
    setIsClicked(!isClicked);
    setIsHovered(!isHovered);

    if (isClicked && isHovered) {
      deleteBooking(id)
        .then((res) => {
          navigate("/");
        })

        .catch((err) => console.log(err));
    }

    setIsHovered(!isHovered);
    setIsClicked(!isClicked);
  };

  const shouldRenderDeleteIcon =
    currentDate === formattedDate && time > t[1] && p === "pm";

  const renderdate = currentDate < formattedDate;

  return (
    <div
      style={{
        marginLeft: "75px",
        marginRight: "80px",
        marginBottom: "20px",
      }}
    >
      <Card>
        <Card.Header>{props.Title}</Card.Header>
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          <Box style={{ flexGrow: 1 }}>
            <Card.Title>{props.TheaterName}</Card.Title>
            <Link
              overlay
              underline="none"
              href={`https://www.google.com/maps/search/?api=1&query=123+${props.Address}%2C+${props.city}%2C+India`}
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
            <Box marginTop={3}>
              <Row>
                <Col xs={12} sm={4}>
                  <Card.Text>
                    <strong>ShowDate:</strong>
                    {formattedDate}
                  </Card.Text>
                </Col>
                <Col xs={12} sm={4}>
                  <Card.Text>
                    <strong>ShowTime:</strong>
                    {props.ShowTime}
                  </Card.Text>
                </Col>
              </Row>{" "}
              <Row style={{marginTop:"2px"}}>
                <Card.Text>
                  <strong>SeatNumber:</strong>
                  {props.SeatNumber.join(",")}
                </Card.Text>
              </Row>
            </Box>
          </Box>
          {(shouldRenderDeleteIcon ||
            (p === "am" && currentDate <= formattedDate) ||
            renderdate) && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
                color: isHovered ? "red" : "inherit",
              }}
              onClick={() => cancelbookinghandler(props.id)}
            >
              <DeleteIcon />
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
