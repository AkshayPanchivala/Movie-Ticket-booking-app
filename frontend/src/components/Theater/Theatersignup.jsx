import React from "react";

import { useNavigate } from "react-router-dom";
import {

  sendTheaterRequest,
} from "../../api-helpers/api-helper";

import Theatersignupform from "./Theatersignupform";


function Theatersignup() {
  const navigate = useNavigate();


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
