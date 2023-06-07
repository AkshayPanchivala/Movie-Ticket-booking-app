import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@mui/material";
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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShowTime from "./../SeatBooking/constants/ShowTime";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Getdatabboking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [Showtime, setShowTime] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, borderRadius: 10, height: 300 }}>
          <h2 id="parent-modal-title">Get Your Booking Details</h2>
          <Typography> Select a Date</Typography>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
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

          <Stack spacing={2} direction="row" margin={2} marginLeft={20}>
            <Button variant="contained">Get Data</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
export default Getdatabboking;
