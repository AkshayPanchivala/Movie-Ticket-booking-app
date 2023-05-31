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

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`http://localhost:5000/user/${signup ? "signup" : "login"}`, {
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

export const newBooking=async(data)=>{
  
}