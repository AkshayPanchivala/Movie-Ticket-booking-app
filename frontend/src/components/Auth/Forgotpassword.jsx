import React from "react";
import { Box, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { Link, useNavigate } from "react-router-dom";
import { SendForgotpasswordLink } from "../../api-helpers/api-helper";

function Forgotpassword() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({ email: "" });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    SendForgotpasswordLink({ inputs }).then((res) => {
      if (res === "Success") {
        navigate("/auth/login");
      }
    });
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBackdropClick = () => {
    navigate("/");
  };
  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 15, width: "500px", height: "auto" },
        }}
        open={true}
        onClose={handleBackdropClick}
      >
        <Typography variant="h4" textAlign={"center"} marginTop={1}>
          Forgot Password
        </Typography>
        <Box padding={5}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group md="10" controlId="validationCustom02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="email"
                name="email"
              />

              <Form.Control.Feedback type="invalid">
                Please provide A valide Email.
              </Form.Control.Feedback>
            </Form.Group>

            <Col md="12">
              <Form.Group controlId="validationCustom03">
                <Box
                  marginTop={5}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button type="submit">Send Mail</Button>
                </Box>
              </Form.Group>
            </Col>
          </Form>
        </Box>
      </Dialog>
    </>
  );
}

export default Forgotpassword;
