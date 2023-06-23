import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helper";
import { userActions } from "../../store";


import Authsignupform from "./Authsignupform";

function Authsignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;
    const status = res.status;

    if (status === 201) {
      dispatch(userActions.login());
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("token", data.token);
      navigate("/");
     
      }
     
    


  };
  const getData = (data, images, state, city, pincode) => {
    sendUserAuthRequest(data.inputs, images[0], state, city, pincode)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Authsignupform onSubmit={getData} />
    </div>
  );
}

export default Authsignup;
