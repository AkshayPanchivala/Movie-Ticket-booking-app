import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helper";
import { userActions } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authsignupform from "./Authsignupform";

function Authsignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;
    const status = res.status;

    if (status === 201) {
      dispatch(userActions.login());
      localStorage.setItem("userId", data.user._id);
      navigate({ name: "/", state: status, params: "akshay" });
    }

    if (status === 409) {
      return toast.error("Already account is created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const getData = (data, images, state, city, pincode) => {
    sendUserAuthRequest(data.inputs, images[0], state, city, pincode)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <AuthForm onSubmit={getData} isAdmin={false} /> */}
      <Authsignupform onSubmit={getData} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {/* Same as */}
    </div>
  );
}

export default Authsignup;
