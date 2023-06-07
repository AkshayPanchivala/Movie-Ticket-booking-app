import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendtheaterlogin,
  sendUserAuthRequest,
  sendUserlogin,
} from "../../api-helpers/api-helper";
import { adminActions } from "../../store";

import Theaterloginform from "./Theaterloginform";

function Theaterlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    console.log(res.data);
    const data = res.data;
    console.log(data.theater._id);
    console.log(data.token);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.theater._id);
    localStorage.setItem("token", data.token);
    navigate("/", { state: res.status });
  };
  const getData = (data) => {
    console.log("Auth", data.inputs);
    sendtheaterlogin(data.inputs)
      .then(onResReceived)

      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <AuthForm onSubmit={getData} isAdmin={false} /> */}
      <Theaterloginform onSubmit={getData} />
    </div>
  );
}
export default Theaterlogin;
