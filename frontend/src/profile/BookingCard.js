import * as React from "react";
import Card from "react-bootstrap/Card";
import { Col, Row } from "reactstrap";



export default function BookingCard(props) {


  return (
    <div
      style={{
        marginLeft: "300px",
        marginRight: "100px",
        marginBottom: "20px",
      }}
    >
      <Card>
        <Card.Header> {props.Title}</Card.Header>
        <Card.Body>
          <Card.Title>{props.TheaterName}</Card.Title>
          <Row>
            <Col xs={12} sm={4}>
              <Card.Text><strong>ShowDate:</strong>{props.Date}</Card.Text>
            </Col>
            <Col xs={12} sm={4}>
              <Card.Text> <strong>ShowTime:</strong>{props.ShowTime}</Card.Text>
            </Col>
            <Col xs={12} sm={4}>
              <Card.Text> <strong>seatNumber:</strong>{props.SeatNumber}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

