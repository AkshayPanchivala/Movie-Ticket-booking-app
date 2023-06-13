import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addMovie } from "../../api-helpers/api-helper";
import AddmoviesForm from "./AddmoviesForm";

function AddMovies() {
  const navigate = useNavigate();
  const onResReceived = (res) => {
    console.log(res);
    if (res.status === 201) {
      toast.success("Movie Add Successfully", {
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
    navigate("/");
  };
  const getData = (data, images, language) => {
    addMovie(data.inputs, images[0], language)
      .then((res) => onResReceived(res))
      .catch((err) => console.log(err));
  };
  return <AddmoviesForm onSubmit={getData} />;
}

export default AddMovies;
