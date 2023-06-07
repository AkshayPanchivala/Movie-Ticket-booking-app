import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import AddMovies from "./components/Movies/AddMovies";
import Movies from "./components/Movies/Movies";
import UserProfile from "./profile/UserProfile";
import { adminActions, userActions } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminProfile from "./profile/AdminProfile";
// import SeatBooking from "./SeatBooking/Index";
import Index from "./SeatBooking/Index";
import Authlogin from "./components/Auth/Authlogin";
import Authsignup from "./components/Auth/Authsignup";
import UpdateProfile from "./profile/UpdateProfile";

import Theatersignup from "./components/Theater/Theatersignup";
import Theaterlogin from "./components/Theater/Theaterlogin";
import Getdatabboking from "./profile/Getdatabboking";

function App() {
  const dispatch = useDispatch();
  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isadminLoggedIn, isuserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />
          {!isuserLoggedIn && !isadminLoggedIn && (
            <>
              <Route path="/admin" element={<Theatersignup />} />
              <Route path="/theater/login" element={<Theaterlogin />} />
            </>
          )}
          {!isuserLoggedIn && !isadminLoggedIn && (
            <>
              <Route path="/auth" element={<Authsignup />} />
              <Route path="/auth/login" element={<Authlogin />} />
            </>
          )}

          {!isadminLoggedIn && isuserLoggedIn && (
            <Route path="/user" element={<UserProfile />} />
          )}
          {!isadminLoggedIn && isuserLoggedIn && (
            <Route path="/updateprofile" element={<UpdateProfile />} />
          )}
          {isadminLoggedIn && !isuserLoggedIn && (
            <>
              <Route path="/add" element={<AddMovies />} />
              <Route path="/bookingdata/:id" element={<Getdatabboking />} />
            </>
          )}
          {isadminLoggedIn && !isuserLoggedIn && (
            <Route path="/user-admin" element={<AdminProfile />} />
          )}

          {!isadminLoggedIn && isuserLoggedIn && (
            <>
              <Route
                path="/booking/seatbooking/:movieid/:theatreId"
                element={<Index />}
              />
              <Route path="booking/:id" element={<Booking />} />
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
