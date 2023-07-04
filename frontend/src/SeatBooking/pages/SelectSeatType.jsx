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

import ShowTime from "../constants/ShowTime";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getMoviesbyid, notAvailable } from "../../api-helpers/api-helper";
import SeatSelection from "../SeatSelection";

export default function SelectSeatType({ onNext }) {
  const [seatCount, setSeatCount] = useState(0);
  const [seatType, setSeatType] = useState(null);
  const [Showtime, setShowTime] = useState(null);
  const [ShowDate, onChange] = useState(new Date());
  const [getLanguage, setgetLanguage] = useState([]);
  const [AvailableSeat, setAvailableSeat] = useState(0);
  const [Executiveavailablesheat, setExecutiveavailablesheat] = useState();
  const [Premiumavailablesheat, setPremiumavailablesheat] = useState();
  const [ECONOMYvailablesheat, setECONOMYavailablesheat] = useState();

  const [Language, setLanguage] = useState(null);
  const [value, setvalue] = useState({
    SeatCount: "",
    SeatType: "",
    showTime: "",
    showDate: "",
    showLanguage: "",
  });
  const params = useParams();
  const movieid = params.movieid;
  const theatreid = params.theaterId;
  const executive = [];
  const premium = [];
  const economy = [];
  useEffect(() => {
    const data = {
      movieid,
      theatreid,
      ShowDate: ShowDate,
      ShowTime: Showtime,
    };
    notAvailable(data).then((res) => {
      res.notavailable.map((e) => {
        if (e.startsWith("K")) {
          executive.push(e);
        }
        if (
          e.startsWith("A") ||
          e.startsWith("B") ||
          e.startsWith("C") ||
          e.startsWith("D") ||
          e.startsWith("E")
        ) {
          economy.push(e);
        }
        if (
          e.startsWith("F") ||
          e.startsWith("G") ||
          e.startsWith("H") ||
          e.startsWith("I") ||
          e.startsWith("J")
        ) {
          premium.push(e);
        }
      });

      const availableseat = 226 - +res.notavailable.length;
      const Executive = 16 - +executive.length;
   
   

      const Premium = 105 - +premium.length;
      const Economy = 105 - +economy.length;
      setExecutiveavailablesheat(Executive);
      setPremiumavailablesheat(Premium);
      setECONOMYavailablesheat(Economy);
      setAvailableSeat(availableseat);
    });
  }, [ShowDate, Showtime, movieid, theatreid]);

  const [isNextDisable, setNextDisable] = useState(true);

  const seathandler = (i) => {
    if (Executiveavailablesheat < i && seatType === "EXECUTIVE") {
      return 1;
    } else 
    if (Premiumavailablesheat < i && seatType === "PREMUIM_ECONOMY") {
      return 1;
    } else if (ECONOMYvailablesheat < i && seatType === "ECONOMY") {
      return 1;
    } else {
      setSeatCount(i);
    }
  };
  function RenderSeatCounts() {
    var rows = [];
    for (let i = 1; i <= SEAT.MAX_SEAT_ALLOWED; i++) {
      rows.push(
        <PaginationItem key={i} active={seatCount === i ? true : false}>
          <PaginationLink onClick={() => seathandler(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return rows;
  }
  useEffect(() => {
    if (seatCount > 0 && seatType && Showtime && ShowDate && Language)
      setNextDisable(false);
  }, [seatCount, seatType, Showtime, ShowDate, Language]);
  useEffect(() => {
    getMoviesbyid(params.movieid)
      .then((res) => setgetLanguage(res.movie.language))
      .catch((err) => console.log(err));
  }, []);

  

  const selecteddate = new Date(ShowDate).toLocaleString().split(",")[0];
  const reselecteddate = selecteddate.split("/")[0];
  function handleNext() {
    setvalue({
      seatCount: seatCount,
      SeatType: seatType,
      showTime: Showtime,
      showDate: ShowDate,
      showLanguage: Language,
    });

    onNext(TAB_OPTIONS.SEAT_SELECTION, {
      seatCount,
      seatType,
      Showtime,
      ShowDate,
      Language,
    });
  }

  const Time = new Date().toLocaleString().split(",")[1];
  const currentTime = +Time.split(":")[0] - 12;

  const date = new Date().toLocaleString().split(",")[0];
  const currentdate = date.split("/")[0];

  const timerendered = currentdate !== reselecteddate;
  useEffect(() => {
    console.log("first")
  }, [ ShowTime,timerendered]);
  const todaytimerendered = currentdate === reselecteddate;
  const SeattypeSelection = (type) => {
    if (Executiveavailablesheat === 0 && type === "EXECUTIVE") {
      return 1;
    } else 
    if (Premiumavailablesheat === 0 && type === "PREMUIM_ECONOMY") {
      return 1;
    } else if (ECONOMYvailablesheat === 0 && type === "ECONOMY") {
      return 1;
    } else {
      setSeatType(type);
    }
  };

  return (
    <Grid container spacing={2} marginTop={5}>
      <Grid item xs={6}>
        <Box>
          <Typography sx={{ color: "green" }}>
            Available Seat is: {AvailableSeat}
          </Typography>
          <Typography>
            <strong>Select a Date</strong>
          </Typography>
          <Calendar
            borderradius={5}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
            onChange={onChange}
            value={ShowDate}
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Row>
            <Col>
              <Label>
                <strong>Select Language</strong>
              </Label>
              <ListGroup horizontal>
                
                {getLanguage.map((item, index) => (
                  <ListGroupItem
                    key={index}
                    style={{cursor:"pointer"}}
                   
                    active={Language === item ? true : false}
                    tag="b"
                    onClick={() => setLanguage(item)}
                  >
                    {item}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Label>
                <strong>Select Show Time</strong>
              </Label>
              <ListGroup horizontal>
                {timerendered &&
                  ShowTime.Time.map((item, index) => (
                    <ListGroupItem
                      key={item.Id}
                      arrow
                      active={Showtime === item.Time ? true : false}
                      tag="b"
                      onClick={() => setShowTime(item.Time)}
                      style={{cursor:"pointer"}}
                    >
                      {item.Time}
                    </ListGroupItem>
                  ))}
                {todaytimerendered &&
                  ShowTime.Time.map((item, index) => (
                    <ListGroupItem
                      key={item.Id}
                      active={Showtime === item.Time ? true : false}
                      arrow
                      disabled={currentTime >= item.Time.split(" ")[2]}
                      tag="b"
                      onClick={() => setShowTime(item.Time)}
                      style={{cursor:Showtime === item.Time ? "not-allowed":"pointer"}}
                    >
                      {item.Time}
                    </ListGroupItem>
                  ))}
              </ListGroup>
              <Label>
                <strong>Select Seat Type</strong>
              </Label>
              <ListGroup horizontal>
                {SEAT.SEAT_TYPE.map((item) => (
                  <ListGroupItem
                    key={item.type}
                    active={seatType === item.type ? true : false}
                    tag="a"
                    arrow
                    style={{cursor:"pointer"}}
                    onClick={() => SeattypeSelection(item.type)}
                  >
                    {item.title} (₹{SEAT.SEAT_PRICE[item.type]}.00/seat)
                  
                    {item.title === "Executive" && (
                      <Typography
                        sx={{
                          color: seatType === "EXECUTIVE" ? "white" : "green",
                          cursor:Executiveavailablesheat===0?"not-allowed":"pointer",
                          marginTop: "5px",
                        }}
                      >
                        Available Seat is: {Executiveavailablesheat}
                      </Typography>
                    )}
                    {item.title === "Premium Economy" && (
                      <Typography
                        sx={{
                          color:
                            seatType === "PREMUIM_ECONOMY" ? "white" : "green",
                            cursor:Premiumavailablesheat===0?"not-allowed":"pointer",
                          marginTop: "5px",
                        }}
                      >
                        Available Seat is: {Premiumavailablesheat}
                      </Typography>
                    )}
                    {item.title === "Economy" && (
                      <Typography
                        sx={{
                          color: seatType === "ECONOMY" ? "white" : "green",
                          cursor:ECONOMYvailablesheat===0?"not-allowed":"pointer",
                        }}
                      >
                        Available Seat is: {ECONOMYvailablesheat}
                      </Typography>
                    )}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>
                <strong>Total Seats</strong>
              </Label>
              <Pagination aria-label="Page navigation example">
                <RenderSeatCounts />
              </Pagination>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>
                <strong>Total Price: </strong>
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
        </Box>
      </Grid>
    </Grid>
  );
}
