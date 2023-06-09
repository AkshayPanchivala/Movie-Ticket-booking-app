import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendUserAuthRequest,
  sendUserlogin,
} from "../../api-helpers/api-helper";
import { userActions } from "../../store";
import Authloginform from "./Authloginform";
import { ToastContainer, toast } from "react-toastify";

function Authlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;

    dispatch(userActions.login());
    localStorage.setItem("userId", data.user._id);
    navigate("/", { state: res.status });
  };
  const getData = (data) => {
    sendUserlogin(data.inputs)
      .then(onResReceived)

      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Authloginform onSubmit={getData} />
    </div>
  );
}

export default Authlogin;
