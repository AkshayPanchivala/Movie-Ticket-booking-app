import { useState } from "react";
import { Container, Row } from "reactstrap";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import SeatBooking from "./pages/SeatBooking";
import SelectSeatType from "./pages/SelectSeatType";
import Confirmation from "./pages/Confirmation";
import TAB_OPTIONS from "./constants/TabOptions";

export default function Index() {
  const [tab, setTab] = useState(TAB_OPTIONS.SEAT_TYPE);
  const [seatSelection, setSeatSelection] = useState({});
  function handleTabChange(tab, seatSelection) {
    console.log(seatSelection);
    setTab(tab);
    setSeatSelection(seatSelection);
    // console.log(tab,se)
  }
  return (
    <Container>
      <Row></Row>
      {tab === TAB_OPTIONS.SEAT_TYPE ? (
        <SelectSeatType onNext={handleTabChange} />
        // <SelectSeatType />
      ) : null}
      {tab === TAB_OPTIONS.SEAT_SELECTION ? (
        <SeatBooking onNext={handleTabChange} seatSelection={seatSelection} />
      ) : null}
      {tab === TAB_OPTIONS.CONFIRMATION ? (
        <Confirmation setTab={setTab} seatSelection={seatSelection} />
      ) : null}
    </Container>
  );
}
