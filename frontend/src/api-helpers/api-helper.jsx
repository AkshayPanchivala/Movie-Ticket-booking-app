import axios from "axios";
import { toast } from "react-toastify";

////////////////// User register//////////////////
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

  if (res.status === 400) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 409) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 500) {
    return toast.error("Something went wrong", {
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
  if (res.status === 201) {
    toast.success(`${res.data.message}`, {
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

  return res;
};

/////////////user Login////////////////////////
export const sendUserlogin = async (data) => {
  const res = await axios
    .post(`http://localhost:5000/user/login`, {
      email: data.email,
      password: data.password,
    })
    .catch((err) => {
      return err.response;
    });

  if (res.status === 400) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 404) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 500) {
    return toast.error("Something went wrong", {
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
  if (res.status === 200) {
    toast.success(`${res.data.message}`, {
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
  return res;
};

/////////////////////////create Theater//////////////////////
export const sendTheaterRequest = async (
  data,
  images,
  state,
  city,
  pincode
) => {
  const res = await axios
    .post(
      `http://localhost:5000/theater/signup`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phonenumber: data.phonenumber,
        address: data.address,
        profilephoto: images,
        state: state,
        city: city,
        pincode: pincode,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => {
      return err.response;
    });
  if (res.status === 400) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 500) {
    return toast.error(`Something Went Wrong`, {
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
  if (res.status === 409) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 201) {
    toast.success(`${res.data.message}`, {
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
  const resData = await res;

  return resData;
};

//////////Add Movie//////////////

export const addMovie = async (data, images, language) => {
  const res = await axios
    .post(
      "http://localhost:5000/movie",
      {
        title: data.title,
        description: data.description,
        posterUrl: images,
        language: language,
        admin: localStorage.getItem("adminid"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => {
      return err.response;
    });

  if (res.status === 409) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 400) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 500) {
    return toast.error("Something went wrong", {
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
  if (res.status === 201) {
    toast.success(`${res.data.message}`, {
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
  return res;
};

//////////////////Theater Login///////////////////
export const sendtheaterlogin = async (data) => {
  const res = await axios
    .post(`http://localhost:5000/theater/login`, {
      email: data.email,
      password: data.password,
    })
    .catch((err) => {
      return err.response;
    });
  console.log(res);
  if (res.status === 400) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 500) {
    return toast.error(`Something went wrong`, {
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
  if (res.status === 404) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 200) {
    toast.success(`${res.data.message}`, {
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
  return res;
};

/////////////Admin Login///////////
export const sendAdminlogin = async (data) => {
  const res = await axios
    .post(`http://localhost:5000/admin/login`, {
      email: data.email,
      password: data.password,
    })
    .catch((err) => {
      return err.response;
    });
  console.log(res);
  if (res.status === 400) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 500) {
    return toast.error(`Something went wrong`, {
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
  if (res.status === 404) {
    return toast.error(`${res.data.message}`, {
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
  if (res.status === 200) {
    toast.success(`${res.data.message}`, {
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
  return res;
};

///////////////////get All Movies //////////////////////
export const getAllMovies = async (currentPage) => {
  const res = await axios
    .get(`http://localhost:5000/movie?page=${currentPage}`)
    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  const data = res.data;

  return data;
};
///////////////////get Movies By ID //////////////////////
export const getMoviesbyid = async (id) => {
  const res = await axios
    .get(`http://localhost:5000/movie/${id}`)
    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  const data = await res.data;

  return data;
};

////////////////////////Get all theater/////////////////
export const getAlladmin = async (currentPage) => {
  const res = await axios
    .get(`http://localhost:5000/theater?page=${currentPage}`)
    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  const resData = await res;

  return resData;
};
/////////////get Movie Detail////////////////////
export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`http://localhost:5000/movie/${id}`)
    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data, id) => {
  const res = await axios
    .post(
      "http://localhost:5000/booking",
      {
        movie: data.movie,
        date: data.date,
        seatNumber: data.seatNumber,
        user: data.user,
        theater: data.admin,
        SeatType: data.SeatType,
        ShowTime: data.ShowTime,
        paymentId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => {
      return err.response;
    });

  if (res.status === 400) {
    return toast.error(`${res.message}`, {
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
  if (res.status === 500) {
    return toast.error(`Something went wrong`, {
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
  if (res.status === 201) {
    toast.success(`Booking is created`, {
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
  return res;
};
// get User Booking
export const getUserBooking = async (currentPage) => {
  const id = localStorage.getItem("userId");

  const res = await axios
    .get(`http://localhost:5000/booking/${id}?page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  if (res.status === 404) {
    return toast.error(`${res.message}`, {
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
  const resData = await res;

  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");

  const res = await axios
    .get(`http://localhost:5000/theater/${adminId}`)
    .catch((err) => {
      return err.response;
    });

  if (res.status !== 200) {
    return toast.error(`${res.message}`, {
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

  const resData = await res.data;
  return resData;
};

export const getUserbyid = async (id) => {
  const userId = localStorage.getItem("userId");

  const res = await axios
    .get(`http://localhost:5000/user/${userId}`)
    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  const resData = await res.data.user;

  return resData;
};

/////////////////Not available seat update//////////////////////////
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
    .catch((err) => {
      return err.response;
    });

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;

  return resData;
};

////Pincode fetch///////////
export const pincodefetch = async (data) => {
  const pincode = data;

  const res = await axios
    .get(`https://api.postalpincode.in/pincode/${pincode}`)
    .catch((err) => {
      return err.response;
    });

  if (res.data[0].Status === "Error") {
    return toast.error(`Please Enter a valid pincode`, {
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

  const resData = await res.data;

  return resData;
};

//////////////////////////
export const updateprofile = async ({ inputs }, state, city, pincode) => {
  const userId = localStorage.getItem("userId");

  const data = inputs;

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

export const getpdf = async (selectedDate, Showtime, id) => {
  const adminId = localStorage.getItem("adminId");

  const res = await axios
    .post(
      `http://localhost:5000/booking/download`,
      {
        date: selectedDate,
        showtime: Showtime,
        theater: adminId,
        movie: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  const resData = await res;

  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`http://localhost:5000/booking/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  if (res.status === 200) {
    return toast.error(`Booking is deleted`, {
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
  const resData = await res;

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

  return res;
};

export const createlike = async (movieid, rating) => {
  const userId = localStorage.getItem("userId");
  await axios
    .post(
      `http://localhost:5000/movie/like`,
      {
        user: userId,
        movie: movieid,
        rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));
};
export const getlikebyuser = async (id) => {
  const movieid = id;

  const res = await axios
    .get(`http://localhost:5000/movie/getlike/${movieid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => console.log(err));

  return res;
};

export const gettopMovies = async () => {
  const res = await axios
    .get(`http://localhost:5000/movie/MostLiked`)
    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    console.log(res);
  }

  return res.data.mostlikedmovie;
};

export const createcomment = async (comment, id) => {
  const userId = localStorage.getItem("userId");
  await axios
    .post(
      `http://localhost:5000/movie/comment/${id}`,
      {
        user: userId,
        comment: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));
};
export const movieDelete = async (id) => {
  const res = await axios
    .delete(`http://localhost:5000/movie/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => console.log(err));
  if (res.status === 200) {
    toast.success(`Movie is Deleted`, {
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
  return res;
};

// export const
export const getAlladminCity = async () => {
  const res = await axios
    .get(`http://localhost:5000/theater/theatercity`)
    .catch((err) => {
      return err.response;
    });
  if (res.status !== 200) {
    return toast.error(`Something Went wrong`, {
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
  const resData = await res;

  return resData;
};
