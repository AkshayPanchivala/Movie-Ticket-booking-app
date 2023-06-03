import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendUserAuthRequest,
  
} from "../../api-helpers/api-helper";
import { userActions } from "../../store";
// import Authform from "./Authform1";
import Authsignupform from "./Authsignupform";
// import AuthForm from "./AuthForm";

function Authsignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data.user._id);

    dispatch(userActions.login());
    localStorage.setItem("userId", data.user._id);
    navigate("/");
  };
  const getData = (data,images) => {
    console.log("Auth", );
    sendUserAuthRequest(data.inputs,images[0])
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <AuthForm onSubmit={getData} isAdmin={false} /> */}
      <Authsignupform onSubmit={getData} />
    </div>
  );
}

export default Authsignup;
