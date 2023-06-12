import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendAdminlogin,
  sendUserAuthRequest,
  sendUserlogin,
} from "../../api-helpers/api-helper";
import { adminActions } from "../../store";
import Adminloginform from "./AdminLoginform";
import { ToastContainer, toast } from "react-toastify";

function Adminlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminid", data.admin._id);
    if (res.status === 200) {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
