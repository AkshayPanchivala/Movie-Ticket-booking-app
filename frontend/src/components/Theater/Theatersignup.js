import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helper";
import { adminActions } from "../../store";
import Theatersignupform from "./Theatersignupform";

function Theatersignup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data.data.theater._id);

    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.data.theater._id);
    localStorage.setItem("token", data.data.token);
    navigate("/");
  };
  const getData = (data, images, state, city, pincode) => {
    console.log(data, images, state, city, pincode);
    sendAdminAuthRequest(data.inputs, images[0], state, city, pincode)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Theatersignupform onSubmit={getData} />
    </div>
  );
}

export default Theatersignup;
