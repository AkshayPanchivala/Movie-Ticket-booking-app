import React from "react";
import { Box, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function Authloginform({ onSubmit }) {
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
   
    setValidated(true);
    if (validated === true) {
    
      onSubmit({ inputs });
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const signuphandler = () => {
    console.log("click");
  };
  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 15, width: "500px", height: "700px" },
        }}
        open={true}
      >
        <Typography variant="h4" textAlign={"center"} marginTop={1}>
          Login
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide A valide Email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="7" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="password"
                required
                onChange={handleChange}
                value={inputs.password}
                name="password"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>
            <Col md="6">
              <Form.Group controlId="validationCustom03">
                <Box marginTop={5}>
                  <Button type="submit">Submit form</Button>
                </Box>
              </Form.Group>
            </Col>

            <Col md="6">
              <Form.Group controlId="validationCustom03">
                <Box marginTop={5}>
                  <Button onClick={signuphandler}>SignUp</Button>
                </Box>
              </Form.Group>
            </Col>
          </Form>
        </Box>
      </Dialog>
    </>
  );
}

export default Authloginform;
