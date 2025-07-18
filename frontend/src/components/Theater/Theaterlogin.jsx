import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendtheaterlogin } from "../../api-helpers/api-helper";
import { theaterActions } from "../../store";

import Theaterloginform from "./Theaterloginform";

function Theaterlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;

    if (res.status === 200) {
      dispatch(theaterActions.login());
      localStorage.setItem("adminId", data.theater._id);
      localStorage.setItem("Name", data.theater.name);
      localStorage.setItem("token", data.token);
      navigate("/", { state: res.status });
    }
  };
  const getData = (data) => {
    sendtheaterlogin(data.inputs)
      .then(onResReceived)

      .catch((err) => console.log(err));
  };
  return (
    <div>

      <Theaterloginform onSubmit={getData} />
    </div>
  );
}
export default Theaterlogin;
