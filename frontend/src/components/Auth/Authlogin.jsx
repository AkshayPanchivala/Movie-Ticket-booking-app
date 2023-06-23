import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserlogin } from "../../api-helpers/api-helper";
import { userActions } from "../../store";
import Authloginform from "./Authloginform";

function Authlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;
    console.log(res);
    if (res.status === 200) {
      dispatch(userActions.login());
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("token", data.token);

      navigate("/");
    }
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
