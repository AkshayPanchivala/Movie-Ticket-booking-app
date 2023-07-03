import React from "react";
import { useNavigate } from "react-router-dom";

import { addMovie } from "../../api-helpers/api-helper";
import AddmoviesForm from "./AddmoviesForm";

function AddMovies() {
  const navigate = useNavigate();
  const onResReceived = (res) => {
    if (res.status === 201) {
      navigate("/");
    }
  };
  const getData = (data, images, language, Category) => {
    
    addMovie(data.inputs, images[0], language, Category)
      .then((res) => onResReceived(res))
      .catch((err) => console.log(err));
  };
  return <AddmoviesForm onSubmit={getData} />;
}

export default AddMovies;
