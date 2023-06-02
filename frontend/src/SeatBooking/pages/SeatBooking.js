import { useEffect, useState } from "react";
import SEATS from "../constants/SeatOptions";
import TAB_OPTIONS from "../constants/TabOptions";
import Button from "../library/Button";
import { Row, Label, Col, Pagination } from "reactstrap";
import SingleSeat from "../library/SingleSeat";

const notAvailableSeat = ["F2", "I4", "I9", "K2"]; // booking seat update ahiya che
export default function SeatBooking({ onNext, seatSelection }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [type, setType] = useState(seatSelection.seatType);
  const a = [];
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
  console.log("fgfg" + a);
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
  }, []);

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
  function handleNext() {}
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
