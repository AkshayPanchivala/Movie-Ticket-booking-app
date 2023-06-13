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
import jsPDF from "jspdf";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShowTime from "./../SeatBooking/constants/ShowTime";
import { getpdf } from "../api-helpers/api-helper";
import { useNavigate } from "react-router-dom";
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
  const [bookingdata, showbookingdata] = useState([]);
  const navigate=useNavigate();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function generatePdf() {
    var doc = new jsPDF("p", "pt", "a3");

    // Set the margin to 20 units
    // doc.setMargin(20, 20, 20, 20);
    getpdf(selectedDate, Showtime)
      .then((res) => showbookingdata(res.data.booking))
      .catch((err) => console.log(err));
    console.log(bookingdata);
    doc.setFont("courier");
    if (bookingdata.length < 0) {
      console.log("lklkl");
    }
    if (bookingdata) {
      const x = 40; // X-coordinate for the booking data
      let y = 100; // Initial Y-coordinate for each row
      doc.text(x, y - 50, "Movie: " + bookingdata[0].movie.title);
      doc.text(x + 150, y - 50, " Show Time: " + bookingdata[0].ShowTime);
      doc.text(x + 350, y - 50, " Date: " + bookingdata[0].date);
      doc.text(x, y, "Name");
      doc.text(x + 150, y, "Email");
      doc.text(x + 500, y, "Seat Type");
      doc.text(x + 600, y, "Seat Number");
      bookingdata.forEach((booking, index) => {
        doc.text(x, y + 40, "" + booking.user.name);
        doc.text(x + 150, y + 40, "" + booking.user.email);
        doc.text(x + 500, y + 40, "" + booking.SeatType);
        doc.text(x + 600, y + 40, "" + booking.seatNumber);

        y += 20;

        if (y >= doc.internal.pageSize.height - 20) {
          doc.addPage();
          y = 40;
        }
      });
    }

    doc.save("generated.pdf");
  }
  const handleBackdropClick = () => {
    navigate("/");
  };
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        onBackdropClick={handleBackdropClick}
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
            <Button variant="contained" onClick={generatePdf}>
              Get Data
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
export default Getdatabboking;
