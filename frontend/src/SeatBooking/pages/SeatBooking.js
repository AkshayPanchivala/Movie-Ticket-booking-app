import { useEffect, useState } from "react";
import SEATS from "../constants/SeatOptions";
import TAB_OPTIONS from "../constants/TabOptions";
import Button from "../library/Button";
import { Row, Label, Col, Pagination } from "reactstrap";
import SingleSeat from "../library/SingleSeat";
import { newBooking, notAvailable } from "../../api-helpers/api-helper";
import { useNavigate, useParams } from "react-router-dom";

// const notAvailableSeat = ["F2", "I4", "I9", "K2"]; // booking seat update ahiya che
export default function SeatBooking({ onNext, seatSelection }) {
  console.log(seatSelection.ShowDate, seatSelection.Showtime);
  const params = useParams();
  const id = localStorage.getItem("userId");
  console.log(params);
  console.log(params.movieid);
  const movieid = params.movieid;
  const theatreid = params.theatreId;
  // console.log(params.theatreId);

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
  console.log(notAvailableSeat);
  console.log(typeof seatSelection.seatType);

  // if (seatSelection.seatType != "PREMUIM_ECONOMY") {
  //   for (let i = 70; i < 74; i++) {
  //     for (
  //       let j = 0;
  //       j < SEATS.SEAT_STRUCTURE.PREMUIM_ECONOMY.totalPlaces;
  //       j++
  //     ) {
  //       const b = a.push(String.fromCharCode(i)(j + 1));
  //       console.log(b);
  //     }
  //   }
  //   console.log("asasa" + a);
  // }
  // console.log("fgfg" + a);
  console.log("klklkl" + seatSelection.seatType);
  function handleUpdateSelection(seatKey) {
    // console.log(seatSelection.seatCount, selectedSeats.length);
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
    // console.log("seats", SEATS.SEAT_STRUCTURE[seatSelection.seatType]);
    SEATS.SEAT_STRUCTURE[seatSelection.seatType].map((seatRow) => {
      seatRow.seats.map((seat) => {
        //   console.log(`${seatRow.row}${seat}`);
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
    console.log(status);

    // if (status === 201) {
    //   console.log("kjkj toster");

    //  return toast.success("Account is created", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   })
    navigate("/movies", { state: status });
    // }
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
    };
    /////////////////////////////////////////////
    newBooking(data)
      .then(onResReceived)
      .catch((err) => console.log(err));
    console.log(
      "seat selection" +
        seatSelection.seatCount +
        seatSelection.seatType +
        seatSelection.Showtime +
        seatSelection.ShowDate +
        "ghgh" +
        selectedSeats
    );
  }
  return (
    <Row>
      <Col>
        <Label>Select your desired seat</Label>
        {SEATS.SEAT_TYPE.map((item) => (
          <Row key={`${item.type}_type`}>
            {console.log(item.type)}
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
      <Label>
        Price : ₹
        {SEATS.SEAT_PRICE[seatSelection.seatType] * seatSelection.seatCount}.00
      </Label>
      <Row>
        <Col>
          <Button onClick={() => onNext(TAB_OPTIONS.SEAT_TYPE)} title="Prev" />{" "}
          <Button onClick={handleNext} title="Pay" />
        </Col>
      </Row>
    </Row>
  );
}
