import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helper";
import { userActions } from "../../store";

// import Authform from "./Authform1";
import Authsignupform from "./Authsignupform";
// import AuthForm from "./AuthForm";

function Authsignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (res) => {
    const data = res.data;
    const status = res.status;
    console.log(status);

    console.log(data);
    console.log(data.user._id);

    dispatch(userActions.login());
    localStorage.setItem("userId", data.user._id);
    // if (status === 201) {
    //   console.log("kjkj toster");

    //  return toast.success("Account is created", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   })
    navigate("/", { state: status });
    // }
  };
  const getData = (data, images) => {
    console.log("Auth", images[0]);
    sendUserAuthRequest(data.inputs, images[0])
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <AuthForm onSubmit={getData} isAdmin={false} /> */}
      <Authsignupform onSubmit={getData} />

      {/* Same as */}
    </div>
  );
}

export default Authsignup;
