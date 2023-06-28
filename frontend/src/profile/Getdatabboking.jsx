import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@mui/material";
import { ListGroup, ListGroupItem, Label } from "reactstrap";
import jsPDF from "jspdf";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ShowTime from "./../SeatBooking/constants/ShowTime";
import { getpdf } from "../api-helpers/api-helper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function generatePdf() {
    getpdf(selectedDate, Showtime, id)
      .then((res) => {
        console.log(res);
        showbookingdata(res.data.booking);

        if (res.data.message === "any booking not found") {
          return toast.error("any booking not found", {
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
        setPdfGenerated(true);
      })
      .catch((err) => console.log(err));

  }

  const pdfconvert = () => {
   
    if (bookingdata && bookingdata.length > 0) {
      var doc = new jsPDF("p", "pt", "a3");
      doc.setFont("courier");

      const x = 40;
      let y = 100;
      doc.text(x, y - 50, "Movie: " + bookingdata[0].movie.title);
      doc.text(x + 150, y - 50, " Show Time: " + bookingdata[0].ShowTime);
      doc.text(x + 350, y - 50, " Date: " + bookingdata[0].date);
      doc.text(x, y, "Name");
      doc.text(x + 150, y, "Email");
      doc.text(x + 400, y, "Seat Type");
      doc.text(x + 600, y, "Seat Number");
      bookingdata.forEach((booking, index) => {
        doc.text(x, y + 40, "" + booking.user.name);
        doc.text(x + 150, y + 40, "" + booking.user.email);
        doc.text(x + 400, y + 40, "" + booking.SeatType);
        doc.text(x + 600, y + 40, "" + booking.seatNumber);

        y += 20;

        if (y >= doc.internal.pageSize.height - 20) {
          doc.addPage();
          y = 40;
        }
      });
      doc.save(`${bookingdata[0].movie.title}.pdf`);
    }
  };
  pdfconvert();
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
            minDate={new Date()}
            maxDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
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
