import axios from "axios";

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

export const getMoviesbyid = async (id) => {
  const res = await axios
    .get(`http://localhost:5000/movie/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;

  return data;
};
export const sendUserAuthRequest = async (
  data,
  images,
  state,
  city,
  pincode
) => {
  const res = await axios
    .post(`http://localhost:5000/user/signup`, {
      name: data.name,
      email: data.email,
      password: data.password,
      phonenumber: data.phonenumber,
      profilephoto: images,
      state: state,
      city: city,
      pincode: pincode,
    })
    .catch((err) => {
      return err.response;
    });

  if (res.status !== 200 && res.status !== 201) {
    console.log("unexpexted error occured");
  }
  if (res.status === 409) {
    console.log("lklk");
  }
  const resstatus = await res.status;

  const resData = await res.data;
  return res;
};

export const sendUserlogin = async (data) => {
  const res = await axios
    .post(`http://localhost:5000/user/login`, {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  const resData = await res;

  return resData;
};
export const getAlladmin = async () => {
  const res = await axios
    .get(`http://localhost:5000/theater`)
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    console.log("unexpexted error occured");
  }
  const resData = await res;

  return resData;
};
export const sendAdminAuthRequest = async (
  data,
  images,
  state,
  city,
  pincode
) => {
  const res = await axios
    .post(`http://localhost:5000/theater/signup`, {
      name: data.name,
      email: data.email,
      password: data.password,
      phonenumber: data.phonenumber,
      profilephoto: images,
      state: state,
      city: city,
      pincode: pincode,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    console.log("unexpexted error occured");
  }
  const resData = await res;
  console.log(resData);
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
      theater: data.admin,
      SeatType: data.SeatType,
      ShowTime: data.ShowTime,
    })
    .catch((err) => console.log(err));
  return res;
};
//
export const getUserBooking = async (currentPage) => {
  const id = localStorage.getItem("userId");
  console.log(id);
  const res = await axios
    .get(`http://localhost:5000/booking/${id}?page=${currentPage}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("unexpected Error");
  }
  const resData = await res;

  return resData;
};

export const addMovie = async (data, images, language) => {
  const res = await axios
    .post(
      "http://localhost:5000/movie",
      {
        title: data.title,
        description: data.description,
        posterUrl: images,
        language: language,
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

  const resData = await res;
  return resData;
};
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  console.log(adminId);
  const res = await axios
    .get(`http://localhost:5000/theater/${adminId}`)
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

  const resData = await res.data.user;
  // console.log(res.data.user);
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
export const pincodefetch = async (data) => {
  const pincode = data;
  console.log(data);
  const res = await axios
    .get(`https://api.postalpincode.in/pincode/${pincode}`)
    .catch((err) => console.log(err));
  // console.log(res.data);
  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  // console.log("resdatafromhenldr", resData);
  return resData;
};

//////////////////////////
export const updateprofile = async ({ inputs }, state, city, pincode) => {
  const userId = localStorage.getItem("userId");
  console.log(inputs, state, city, pincode);
  const data = inputs;
  console.log("userId", userId);
  const res = await axios
    .put(`http://localhost:5000/user/${userId}`, {
      name: data.name,
      email: data.email,
      password: data.password,
      phonenumber: data.phonenumber,

      state: state,
      city: city,
      pincode: pincode,
    })
    .then(console.log("account is updated"))
    .catch((err) => console.log(err));
  return res;
};
export const sendtheaterlogin = async (data) => {
  console.log(data.password);
  const res = await axios
    .post(`http://localhost:5000/theater/login`, {
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

export const getpdf = async (selectedDate, Showtime) => {
  const adminId = localStorage.getItem("adminId");
  console.log({ date: selectedDate, showtime: Showtime, theater: adminId });
  const res = await axios
    .post(`http://localhost:5000/booking/download`, {
      date: selectedDate,
      showtime: Showtime,
      theater: adminId,
    })

    .catch((err) => console.log(err));
  const resData = await res;
  console.log(resData);
  return resData;
};

export const deleteBooking = async (id) => {
  console.log(id);
  const res = await axios
    .delete(`http://localhost:5000/booking/${id}`)

    .catch((err) => console.log(err));
  const resData = await res;
  console.log(resData);
  return resData;
};

export const getTheaterbypagination = async (page) => {
  const userId = localStorage.getItem("userId");
  const res = await axios.post(
    `http://localhost:5000/theater/getTheaterbypagination?page=${page}`,
    {
      id: userId,
    }
  );
  return res;
};

export const getTheaterbycity = async (city, page) => {
  const res = await axios.post(`http://localhost:5000/theater?page=${page}`, {
    city: city,
  });
  console.log(res);
  return res;
};

export const sendAdminlogin = async (data) => {
  console.log(data);
  const res = await axios.post(`http://localhost:5000/admin/login`, {
    email: data.email,
    password: data.password,
  });
  console.log(res);
  return res;
};
