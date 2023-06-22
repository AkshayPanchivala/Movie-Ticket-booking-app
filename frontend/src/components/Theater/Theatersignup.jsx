import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendAdminAuthRequest,
  sendTheaterRequest,
} from "../../api-helpers/api-helper";
import { theaterActions } from "../../store";
import Theatersignupform from "./Theatersignupform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Theatersignup() {
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const onResReceived = (data) => {
    const status = data.status;
 
    if (status === 201) {

      navigate("/");
    }
  
  };
  const getData = (data, images, state, city, pincode) => {

    sendTheaterRequest(data.inputs, images[0], state, city, pincode)
      .then(onResReceived)
      .catch((err) => console.log("df" + err));
  };
  return (
    <div>
      <Theatersignupform onSubmit={getData} />
   
    </div>
  );
}

export default Theatersignup;
