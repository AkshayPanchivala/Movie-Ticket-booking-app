import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBooking } from "../api-helpers/api-helper";
import { toast } from "react-toastify";

export default function BookingCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
          if (res.status === 200) {
            toast.success("your booking is cancel", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((err) => console.log(err));
    }
    // Toggle the clicked state
    setIsHovered(!isHovered);
    setIsClicked(!isClicked);
  };


  const shouldRenderDeleteIcon =
    currentDate === formattedDate && time > t[1] && p === "pm";


  const renderdate = currentDate < formattedDate;

  return (
    <div
      style={{
        marginLeft: "300px",
        marginRight: "100px",
        marginBottom: "20px",
      }}
    >
      <Card>
        <Card.Header>{props.Title}</Card.Header>
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ flexGrow: 1 }}>
            <Card.Title>{props.TheaterName}</Card.Title>
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
              <Col xs={12} sm={4}>
                <Card.Text>
                  <strong>seatNumber:</strong>
                  {props.SeatNumber}
                </Card.Text>
              </Col>
            </Row>
          </div>
          {(shouldRenderDeleteIcon || p === "am" || renderdate) && (
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
