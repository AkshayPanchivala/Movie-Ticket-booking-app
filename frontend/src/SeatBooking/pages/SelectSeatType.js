import { useState, useEffect } from "react";
import SEAT from "../constants/SeatOptions";
import Button from "../library/Button";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Label,
} from "reactstrap";
import TAB_OPTIONS from "../constants/TabOptions";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import Showtime from "../Showtime";
import ShowTime from "../constants/ShowTime";
import { Typography } from "@mui/material";
export default function SelectSeatType({ onNext }) {
  const [seatCount, setSeatCount] = useState(0);
  const [seatType, setSeatType] = useState(null);
  const [Showtime, setShowTime] = useState(null);
  const [ShowDate, onChange] = useState(new Date());
  const [value, setvalue] = useState({
    SeatCount: "",
    SeatType: "",
    showTime: "",
    showDate: "",
  });

  const [isNextDisable, setNextDisable] = useState(true);
  function RenderSeatCounts() {
    var rows = [];
    for (let i = 1; i <= SEAT.MAX_SEAT_ALLOWED; i++) {
      rows.push(
        <PaginationItem key={i} active={seatCount === i ? true : false}>
          <PaginationLink onClick={() => setSeatCount(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return rows;
  }
  useEffect(() => {
    if (seatCount > 0 && seatType && Showtime && ShowDate)
      setNextDisable(false);
  }, [seatCount, seatType, Showtime, ShowDate]);

  function handleNext() {
    setvalue({
      seatCount: seatCount,
      SeatType: seatType,
      showTime: Showtime,
      showDate: ShowDate,
    });
    onNext(TAB_OPTIONS.SEAT_SELECTION, {
      seatCount,
      seatType,
      Showtime,
      ShowDate,
    });
  }
{  const Time = new Date().toLocaleString().split(",")[1];
console.log(Time);}
  return (
    <>
      <Typography>Select a Date</Typography>
      <Calendar
        borderradius={5}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
        onChange={onChange}
        value={ShowDate}
      />
      {/* {console.log(valu)} */}
    
      <Row>
        <Row>
          <Col>
            <Label>Select Show Time</Label>
            <ListGroup horizontal>
              {ShowTime.Time.map((item) => (
                <ListGroupItem
                  key={item.Id}
                  active={Showtime === item.Time ? true : false}
                  tag="b"
                  onClick={() => setShowTime(item.Time)}
                >
                  {item.Time}
                </ListGroupItem>
              ))}
            </ListGroup>
            <Label>Select Seat Type</Label>
            <ListGroup horizontal>
              {SEAT.SEAT_TYPE.map((item) => (
                <ListGroupItem
                  key={item.type}
                  active={seatType === item.type ? true : false}
                  tag="a"
                  onClick={() => setSeatType(item.type)}
                >
                  {item.title} (₹{SEAT.SEAT_PRICE[item.type]}.00/seat)
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Total Seats</Label>
            <Pagination aria-label="Page navigation example">
              <RenderSeatCounts />
            </Pagination>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>
              Total Price:{" "}
              <b>
                ₹
                {seatCount > 0 && seatType
                  ? SEAT.SEAT_PRICE[seatType] * seatCount
                  : 0}
                .00
              </b>
            </Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={handleNext}
              title="Next"
              disabled={isNextDisable}
            />
          </Col>
        </Row>
      </Row>
    </>
  );
}
