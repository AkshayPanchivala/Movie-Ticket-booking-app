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
import Loaderpage from "./profile/Loaderpage";
import PageNotFound from "./components/PageNotFound";
import UpdateProfile from "./profile/Updateprofile";
import TodayBooking from "./profile/TodayBooking";
import UpcomingMovie from "./Movies/UpcomingMovie";


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

          <Route path="/payment" element={<Loaderpage />} />
          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/upcomingmovie" element={<UpcomingMovie />} />
  
          {!isuserLoggedIn && !isTheaterLoggedIn && !isadminLoggedIn && (
            <>
              <Route path="/theater/login" element={<Theaterlogin />} />
              <Route path="/auth" element={<Authsignup />} />
              <Route path="/auth/login" element={<Authlogin />} />
              <Route path="/Admin" element={<Adminlogin />} />
            </>
          )}
         

          {!isTheaterLoggedIn && !isadminLoggedIn && isuserLoggedIn && (
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="booking/:id" element={<Booking />} />
              <Route
                path="/booking/seatbooking/:movieid/:theaterId"
                element={<SeatSelection />}
              />
            </>
          )}

          {!isTheaterLoggedIn && isadminLoggedIn && !isuserLoggedIn && (
            <>
              <Route path="/add" element={<AddMovies />} />{" "}
              <Route path="/theater" element={<Theatersignup />} />
              <Route path="/all" element={<AllTheater />} />
            </>
          )}
          {isTheaterLoggedIn && !isadminLoggedIn && !isuserLoggedIn && (
            <>
              <Route path="/bookingdata/:id" element={<Getdatabboking />} />
              <Route path="/user-admin" element={<TheaterProfile />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/todaybooking" element={<TodayBooking />} />

              

            </>
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </section>
    </div>
  );
}

export default App;
