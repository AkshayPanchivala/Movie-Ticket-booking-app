import React from "react";
import { useDispatch } from "react-redux";
import { sendAdminAuthRequest } from "../../api-helpers/api-helper";
import { adminActions } from "../../store";
import AuthForm from "../Auth/AuthForm";

function Admin() {
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data.admin._id);
    console.log(data.token);

    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.admin._id);
    localStorage.setItem("token", data.token);
  };
  const getData = (data) => {
    sendAdminAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
}

export default Admin;
