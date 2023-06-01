import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helper";
import { userActions } from "../../store";
import AuthForm from "./AuthForm";

function Auth() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data.user._id);

    dispatch(userActions.login());
    localStorage.setItem("userId", data.user._id);
    navigate("/")
  };
  const getData = (data) => {
    console.log("Auth", data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)

      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
}

export default Auth;
