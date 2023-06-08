import * as React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BookingCard(props) {
  const [isHovered, setIsHovered] = React.useState(false);
  // const currentTime = new Date().toLocaleString([], { hour12: true }).split(",")[1];
  // const currentDate = new Date().toLocaleString().split(",")[0];
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    hour12: true,
  });
  const t = currentTime.split(" ")[0];
  console.log("dflkj" + currentDate);
  const date = new Date(props.Date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  console.log("kkjzxzxc" + formattedDate.split("/")[0]);
  console.log("kkjsdf" + currentDate.split("/")[0]);
  const time = props.ShowTime.split(" ")[0];
  console.log("sda" + typeof t);
  console.log("sda" + typeof time);
  console.log("kjjk" + time);
  const cancelbookinghandler = (id) => {
    console.log(id);
  };
  // const shouldRenderDeleteIcon =
  //   new Date(formattedDate) > new Date(currentDate) &&
  //   new Date(formattedDate) === new Date(currentDate);
  console.log("lklk" + t > currentTime);
  const shouldRenderDeleteIcon =
    new Date(formattedDate) >= new Date(currentDate) && +t < +time;
  const render=currentDate.split("/")[0]<formattedDate.split("/")[0];
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
          {(shouldRenderDeleteIcon || render)&& (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
                color: isHovered ? "red" : "inherit",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={cancelbookinghandler(props.id)}
            >
              <DeleteIcon />
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
