import { useEffect, useState } from "react";
import SEATS from "../constants/SeatOptions";
import TAB_OPTIONS from "../constants/TabOptions";
import Button from "../library/Button";
import { Row, Label, Col, Pagination } from "reactstrap";
import SingleSeat from "../library/SingleSeat";
import { newBooking, notAvailable } from "../../api-helpers/api-helper";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// const notAvailableSeat = ["F2", "I4", "I9", "K2"]; // booking seat update ahiya che
export default function SeatBooking({ onNext, seatSelection }) {
  console.log(seatSelection.ShowDate, seatSelection.Showtime);
  const params = useParams();
  const id = localStorage.getItem("userId");

  const movieid = params.movieid;
  const theatreid = params.theaterId;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [notAvailableSeat, setnotAvailableSeat] = useState([]);
  const navigate = useNavigate();

  const not = () => {
    const data = {
      movieid,
      theatreid,
      ShowDate: seatSelection.ShowDate,
      ShowTime: seatSelection.Showtime,
    };
    notAvailable(data).then((res) => setnotAvailableSeat(res.notavailable));
  };
  not();

  function handleUpdateSelection(seatKey) {
    if (seatSelection.seatCount <= selectedSeats.length) {
      const ssss = [...selectedSeats, seatKey];
      ssss.shift();
      setSelectedSeats(ssss);
      console.log("sss" + ssss);
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
    SEATS.SEAT_TYPE.map((itemType) => {
      SEATS.SEAT_STRUCTURE[itemType.type].map((rowItem) => {
        // SEATS.SEAT_STRUCTURE[type].map((rowItem) => {
        //type ahiya change

        rowItem.seats.map((seatItem) =>
          !notAvailableSeat.includes(`${rowItem.row}${seatItem}`)
            ? availableSeats.push(`${rowItem.row}${seatItem}`)
            : null
        );
      });
    });
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
    console.log("selected" + selectedTeam); /// seatnumber
  }

  const onResReceived = (res) => {
    const data = res.data;
    const status = res.status;
    if (status === 201) {
      toast.success("Successfully book your seat", {
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

    navigate("/movies");
  };

  function handleNext() {
    const data = {
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
    navigate("/payment", {
      state: data,
    });
    // newBooking(data)
    //   .then(onResReceived)
    //   .catch((err) => console.log(err));
  }
  const price =
    SEATS.SEAT_PRICE[seatSelection.seatType] * seatSelection.seatCount;
  return (
    <Row>
      <Col>
        <Label>Select your desired seat</Label>
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
      <Row>
        <Col>
          <Button onClick={() => onNext(TAB_OPTIONS.SEAT_TYPE)} title="Prev" />{" "}
          <Button onClick={handleNext} title="Pay" />
        </Col>
      </Row>
    </Row>
  );
}
