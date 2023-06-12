import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helper";
import { theaterActions } from "../../store";
import Theatersignupform from "./Theatersignupform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Theatersignup() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    const status = data.status;
    console.log(data.data.theater._id);
    if (status === 201) {
    dispatch(theaterActions.login());
    localStorage.setItem("adminId", data.data.theater._id);
    localStorage.setItem("token", data.data.token);
    navigate("/");
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
  };}
  const getData = (data, images, state, city, pincode) => {
    
    sendAdminAuthRequest(data.inputs, images[0], state, city, pincode)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Theatersignupform onSubmit={getData} />
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
    </div>
  );
}

export default Theatersignup;
