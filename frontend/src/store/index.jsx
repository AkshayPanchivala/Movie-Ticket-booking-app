import { configureStore, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("rzp_device_id");
      localStorage.removeItem("rzp_checkout_anon_id");
      localStorage.removeItem("rzp_checkout_user_id");
      
      toast.success(`Logout successfull`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      state.isLoggedIn = false;
    },
  },
});

const theaterSlice = createSlice({
  name: "theater",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      localStorage.removeItem("rzp_device_id");
      localStorage.removeItem("rzp_checkout_anon_id");
      localStorage.removeItem("rzp_checkout_user_id");
      toast.success(`Logout successfull`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      state.isLoggedIn = false;
    },
  },
});
const adminSlice = createSlice({
  name: "admin",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("adminid");
      localStorage.removeItem("token");
      localStorage.removeItem("rzp_device_id");
      localStorage.removeItem("rzp_checkout_anon_id");
      localStorage.removeItem("rzp_checkout_user_id");
      toast.success(`Logout successfull`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      state.isLoggedIn = false;
    },
  },
});
export const userActions = userSlice.actions;
export const theaterActions = theaterSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theater: theaterSlice.reducer,
    admin: adminSlice.reducer,
  },
});
