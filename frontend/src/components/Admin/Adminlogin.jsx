import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendAdminlogin,
 
} from "../../api-helpers/api-helper";
import { adminActions } from "../../store";
import Adminloginform from "./AdminLoginform";


function Adminlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;

    if (res.status === 200) {
      dispatch(adminActions.login());
      localStorage.setItem("adminid", data.admin._id);
      localStorage.setItem("token", data.token);
      navigate("/");
    }
  };
  const getData = (data) => {
    sendAdminlogin(data.inputs)
      .then(onResReceived)

      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Adminloginform onSubmit={getData} />
    </div>
  );
}

export default Adminlogin;
