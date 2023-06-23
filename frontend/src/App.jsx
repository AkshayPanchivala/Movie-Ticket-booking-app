import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import AddMovies from "./components/Movies/AddMovies";
import UserProfile from "./profile/UserProfile";
import { adminActions, theaterActions, userActions } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import TheaterProfile from "./profile/TheaterProfile";
import Authlogin from "./components/Auth/Authlogin";
import Authsignup from "./components/Auth/Authsignup";
import "react-toastify/dist/ReactToastify.css";
import Theatersignup from "./components/Theater/Theatersignup";
import Theaterlogin from "./components/Theater/Theaterlogin";
import Getdatabboking from "./profile/Getdatabboking";
import { ToastContainer } from "react-toastify";
import Adminlogin from "./components/Admin/Adminlogin";
import SeatSelection from "./SeatBooking/SeatSelection";
import Movies from "./Movies/Movies";
import Footer from "./components/footer/footer";
import Forgot from "./components/Auth/Forgotpassword";
import ResetPassword from "./components/Auth/ResetPassword";
import AllTheater from "./components/Theater/AllTheater";

function App() {
  const dispatch = useDispatch();
  const isTheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(theaterActions.login());
    } else if (localStorage.getItem("adminid")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/Admin" element={<Adminlogin />} />
          <Route path="/all" element={<AllTheater />} />

          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />

          {!isuserLoggedIn && !isTheaterLoggedIn && (
            <>
              <Route path="/theater/login" element={<Theaterlogin />} />
            </>
          )}
          {!isuserLoggedIn && !isTheaterLoggedIn && (
            <>
              <Route path="/auth" element={<Authsignup />} />
              <Route path="/auth/login" element={<Authlogin />} />
            </>
          )}

          {!isTheaterLoggedIn && isuserLoggedIn && (
            <Route path="/user" element={<UserProfile />} />
          )}

          {isadminLoggedIn && (
            <>
              <Route path="/add" element={<AddMovies />} />{" "}
              <Route path="/theater" element={<Theatersignup />} />
            </>
          )}
          {isTheaterLoggedIn && !isuserLoggedIn && (
            <>
              <Route path="/bookingdata/:id" element={<Getdatabboking />} />
            </>
          )}
          {isTheaterLoggedIn && !isuserLoggedIn && (
            <Route path="/user-admin" element={<TheaterProfile />} />
          )}

          {!isTheaterLoggedIn && isuserLoggedIn && (
            <>
              <Route
                path="/booking/seatbooking/:movieid/:theaterId"
                element={<SeatSelection />}
              />
              <Route path="booking/:id" element={<Booking />} />
            </>
          )}
        </Routes>
        <Footer />
      </section>
    </div>
  );
}

export default App;
