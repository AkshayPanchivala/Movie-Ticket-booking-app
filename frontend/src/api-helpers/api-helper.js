import axios from "axios";
import { useParams } from "react-router-dom";

export const getAllMovies = async () => {
  const res = await axios
    .get("http://localhost:5000/movie")
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;

  return data;
};

export const sendUserAuthRequest = async (data, images) => {
  // if (data.password === data.confirmpassword) {
  //   return console.log("password are not match");
  // }
  console.log(images);
  const res = await axios
    .post(`http://localhost:5000/user/signup`, {
      name: data.name,
      email: data.email,
      password: data.password,
      phonenumber: data.phonenumber,
      profilephoto: images,
      state: data.state,
      city: data.city,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    console.log("unexpexted error occured");
  }

  const resstatus = await res.status;

  console.log(res);
  const resData = await res.data;
  return res;
};

export const sendUserlogin = async (data) => {
  // if (data.password === data.confirmpassword) {
  //   return console.log("password are not match");
  // }
  // var headers = new Headers();
  // headers.append("X-CSCAPI-KEY", "API_KEY");

  // var requestOptions = {
  //   method: "GET",
  //   headers: headers,
  //   redirect: "follow",
  // };

  // fetch(
  //   "https://api.countrystatecity.in/v1/countries/IN/states/MH/cities",
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));

  console.log(data);
  const res = await axios
    .post(`http://localhost:5000/user/login`, {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  // if (res.status !== 200 && res.status !== 201) {
  //   console.log("unexpexted error occured");
  // }
  const resData = await res;
  console.log(resData);
  return resData;
};
export const getAlladmin = async () => {
  const res = await axios
    .get(`http://localhost:5000/admin`)
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    console.log("unexpexted error occured");
  }
  const resData = await res.data;
  console.log(resData);
  return resData;
};
export const sendAdminAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`http://localhost:5000/admin/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    console.log("unexpexted error occured");
  }
  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`http://localhost:5000/movie/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = axios
    .post("http://localhost:5000/booking", {
      movie: data.movie,
      date: data.date,
      seatNumber: data.seatNumber,
      user: data.user,
      admin: data.admin,
      SeatType: data.SeatType,
      ShowTime: data.ShowTime,
    })
    .catch((err) => console.log(err));
  return res;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  console.log(id);
  const res = await axios
    .get(`http://localhost:5000/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("unexpected Error");
  }
  const resData = await res.data;

  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "http://localhost:5000/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  console.log(adminId);
  const res = await axios
    .get(`http://localhost:5000/admin/${adminId}`)
    .catch((err) => console.log(err));
  console.log(res.data);
  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getUserbyid = async (id) => {
  const userId = localStorage.getItem("userId");
  console.log("userId", userId);
  const res = await axios
    .get(`http://localhost:5000/user/${userId}`)
    .catch((err) => console.log(err));
  // console.log(res.data);
  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  // console.log("resdatafromhenldr", resData);
  return resData;
};

export const notAvailable = async (data) => {
  const movieid = data.movieid;
  const theatreid = data.theatreid;

  const res = await axios
    .post(
      `http://localhost:5000/booking/notavailableseat/${movieid}/${theatreid}`,
      {
        ShowDate: data.ShowDate,
        ShowTime: data.ShowTime,
      }
    )
    .catch((err) => console.log(err));
  // console.log(res.data);
  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  // console.log("resdatafromhenldr", resData);
  return resData;
};
