import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMoviesbyid, newBooking } from "../../api-helpers/api-helper";
import "./Payment.css";

function Payment() {
  const [Movie, setMovie] = useState("");

  const data = useLocation();
  console.log(data.state);
  const [booking, setBook] = useState({
    movie: data.state.movie,
    seatnumber: data.state.seatNumber,
    SeatType: data.state.SeatType,
    showtime: data.state.ShowTime,
    user: data.state.user,
    date: data.state.date,
    price: data.state.price,
    admin: data.state.admin,

    // name: "The Fault In Our Stars",
    // author: "John Green",
    // img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    // price: 250,
  });
  useEffect(() => {
    const id = booking.movie;
    getMoviesbyid(id)
      .then((data) => setMovie(data.movie))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
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

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_XjLr3daSU0JSug",
      amount: data.amount,
      currency: data.currency,
      name: booking.user,
      description: "Test Transaction",
      image: booking.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/booking/verify";
          const { data } = await axios.post(verifyUrl, response);
          if (data.message === "Payment verified successfully") {
            newBooking(booking)
              .then(onResReceived)
              .catch((err) => console.log(err));
            navigate("/movies");
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

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:5000/booking/orders";
      const { data } = await axios.post(orderUrl, { amount: booking.price });
      console.log(data);
      initPayment(data.data);
      //   newBooking(data)
      //     .then(onResReceived)
      //     .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {Movie && (
        <div className="paymentcard">
          <div className="booking_containerr">
            <img src={Movie.posterUrl} alt="book_img" className="movie_img" />
            <p className="movie_name">{Movie.title}</p>
            <p className="movie_detail"> Seat Type:{booking.SeatType}</p>
            <p className="movie_detail">
              Seat Number:{booking.seatnumber + " "}
            </p>
            <p className="movie_detail">
              {" "}
              Show Time : <span>{booking.showtime}</span>
            </p>
            <p className="movie_detail">
              {" "}
              Date: <span>{booking.date.toLocaleDateString()}</span>
            </p>
            <p className="movie_price">
              Price : <span>&#x20B9; {booking.price}</span>
            </p>
            <button onClick={handlePayment} className="buy_btn">
              Book Ticket
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Payment;
