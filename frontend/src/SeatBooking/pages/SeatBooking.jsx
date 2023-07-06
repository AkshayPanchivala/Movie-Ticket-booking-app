

import { useEffect, useState } from "react";
import SEATS from "../constants/SeatOptions";
import TAB_OPTIONS from "../constants/TabOptions";
import Button from "../library/Button";
import { Row, Label, Col, Pagination } from "reactstrap";
import SingleSeat from "../library/SingleSeat";
import { newBooking, notAvailable } from "../../api-helpers/api-helper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PaginationItem, PaginationLink } from "reactstrap";

export default function SeatBooking({ onNext, seatSelection }) {
  const params = useParams();
  const id = localStorage.getItem("userId");

  const movieid = params.movieid;
  const theatreid = params.theaterId;
  
  const [setPrice, Price] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [notAvailableSeat, setnotAvailableSeat] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [type, setType] = useState(seatSelection.seatType);
 
  const navigate = useNavigate();
  useEffect(() => {
    const data = {
      movieid,
      theatreid,
      ShowDate: seatSelection.ShowDate,
      ShowTime: seatSelection.Showtime,
    };
    notAvailable(data).then((res) => setnotAvailableSeat(res.notavailable));
  }, []);


  function handleUpdateSelection(seatKey) {
    if (seatSelection.seatCount <= selectedSeats.length) {
      const ssss = [...selectedSeats, seatKey];
     

      ssss.shift();
      setSelectedSeats(ssss);
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  }

  function RenderSeatsRow({ structure }) {
    var rows = [];
    for (let i = 1; i <= structure.totalPlaces; i++) {
      rows.push(
        <SingleSeat
          seatNumber={i}
          row={structure.row}
          blank={!structure.seats.includes(i)}
          selected={selectedSeats.includes(`${structure.row}${i}`)}
          updateSelected={handleUpdateSelection}
          available={availableSeats.includes(`${structure.row}${i}`)}
          seatType={seatSelection.seatType}
        />
      );
    }
    return rows;
  }

  function getAvailableSeats() {
    const availableSeats = [];
    SEATS.SEAT_TYPE.map((itemType) =>
      SEATS.SEAT_STRUCTURE[itemType.type].map((rowItem) => {
        rowItem.seats.map((seatItem) =>
          !notAvailableSeat.includes(`${rowItem.row}${seatItem}`)
            ? availableSeats.push(`${rowItem.row}${seatItem}`)
            : null
        );
      })
    );
    return availableSeats;
  }
  useEffect(() => {
    const availableSeats = getAvailableSeats();
    setAvailableSeats(availableSeats);
    handleAutoSelection();
  }, [notAvailableSeat]);

  function handleAutoSelection() {
    const selectedTeam = [];

    SEATS.SEAT_STRUCTURE[seatSelection.seatType].map((seatRow) => {
      seatRow.seats.map((seat) => {
        if (
          !notAvailableSeat.includes(`${seatRow.row}${seat}`) &&
          selectedTeam.length < seatSelection.seatCount
        ) {
          selectedTeam.push(`${seatRow.row}${seat}`);
        }
      });
    });
    setSelectedSeats(selectedTeam);
  }

  function handleNext() {
    const data1 = {
      movie: movieid,
      date: seatSelection.ShowDate,
      seatNumber: selectedSeats,
      user: id,
      admin: theatreid,
      SeatType: seatSelection.seatType,
      ShowTime: seatSelection.Showtime,
      price: price,
    };

    /////////////////////////////////////////////
    const handlePayment = async () => {
      setLoader(true);
      const onResReceived = (res) => {
        const data = res.data;
        const status = res.status;

        if (status === 201) {
          navigate("/movies");
        }
      };
      navigate("/payment");
      const initPayment = (data) => {
        const options = {
          key: "rzp_test_XjLr3daSU0JSug",
          amount: data.amount,
          currency: data.currency,
          name: data1.user,
          description: "Test Transaction",
          image: data1.img,
          order_id: data.id,
          handler: async (response) => {
            const id = data.id;
            try {
              const verifyUrl = "http://localhost:5000/booking/verify";
              const { data } = await axios.post(verifyUrl, response);

              if (data.message === "Payment verified successfully") {
                newBooking(data1, id)
                  .then(onResReceived)
                  .catch((err) => console.log(err));
              } else {
              }
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.open();
      };

      try {
        const orderUrl = "http://localhost:5000/booking/orders";
        const { data } = await axios.post(orderUrl, { amount: data1.price });

        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    handlePayment();
  }
  const price =
    SEATS.SEAT_PRICE[seatSelection.seatType] * seatSelection.seatCount;

  return (
    <>
      {Loader && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Row style={{ marginTop: "3%" }}>
        <Col>
          {SEATS.SEAT_TYPE.map((item) => (
            <Row key={`${item.type}_type`}>
              <Label>{item.title}</Label>
              {SEATS.SEAT_STRUCTURE[item.type].map((itemRow) => (
                <Row key={itemRow.row}>
                  <Pagination aria-label="Page navigation example">
                    <RenderSeatsRow structure={itemRow} />
                  </Pagination>
                </Row>
              ))}
            </Row>
          ))}
        </Col>
        <Label>Price : ₹{price}.00</Label>

        <Box display="flex" justifyContent="flex-end">
          {[0, 1, 2].map((e) => (
            <>
              <PaginationLink
                className={
                  e === 0
                    ? "active-single-seat"
                    : e === 1
                    ? "not-available"
                    : "single-seat"
                }
                style={{ width: "auto", height: "25px" }}
              ></PaginationLink>
              {e === 0 ? (
                <Typography> Selected Seat</Typography>
              ) : e === 1 ? (
                <Typography> Sold Seat</Typography>
              ) : (
                <Typography> Available Seat</Typography>
              )}
            </>
          ))}
        </Box>

        <Row>
          <Col>
            <Button
              onClick={() => onNext(TAB_OPTIONS.SEAT_TYPE)}
              title="Prev"
            />{" "}
            <Button onClick={handleNext} title="Pay" />
          </Col>
        </Row>
      </Row>
    </>
  );
}
