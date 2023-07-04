import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {

  sendTheaterRequest,
} from "../../api-helpers/api-helper";

import Theatersignupform from "./Theatersignupform";


function Theatersignup() {
  const navigate = useNavigate();
  const [Loader, setLoader] = useState(false);

  const onResReceived = (data) => {
    const status = data.status;
    setLoader(false)
    if (status === 201) {

      navigate("/");
    }
  
  };
  const getData = (data, images, state, city, pincode) => {
    setLoader(true)
    sendTheaterRequest(data.inputs, images[0], state, city, pincode)
      .then(onResReceived)
      .catch((err) => console.log("df" + err));
  };
  return (
    <div>
         {Loader && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
     {!Loader && <Theatersignupform onSubmit={getData} />}
   
    </div>
  );
}

export default Theatersignup;
