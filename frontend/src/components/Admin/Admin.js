import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helper";
import { adminActions } from "../../store";

import Authsignupform from "../Auth/Authsignupform";
import Adminsignupform from "./Adminsignupform";

function Admin() {
  const navigate=useNavigate();

  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data.admin._id);
    console.log(data.token);

    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.admin._id);
    localStorage.setItem("token", data.token);
    navigate("/")
  };
  const getData = (data) => {
    sendAdminAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Adminsignupform onSubmit={getData}  />
    </div>
  );
}

export default Admin;
