import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendUserAuthRequest,
  sendUserlogin,
} from "../../api-helpers/api-helper";
import { userActions } from "../../store";
import Authloginform from "./Authloginform";
// import Authform from "./Authform1";
import Authsignupform from "./Authsignupform";
// import AuthForm from "./AuthForm";

function Authlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    console.log(res.data);
    const data = res.data;
    console.log(data.user._id);

    dispatch(userActions.login());
    localStorage.setItem("userId", data.user._id);
    navigate("/", { state: res.status });
  };
  const getData = (data) => {
    console.log("Auth", data.inputs);
    sendUserlogin(data.inputs)
      .then(onResReceived)

      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <AuthForm onSubmit={getData} isAdmin={false} /> */}
      <Authloginform onSubmit={getData} />
    </div>
  );
}

export default Authlogin;
