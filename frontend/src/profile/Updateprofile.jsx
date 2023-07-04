




















import React, { useEffect, useState } from "react";
import { Box, Dialog, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import {
  getAdminById,
  pincodefetch,
  updateprofile,
} from "../api-helpers/api-helper";

function UpdateProfile() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [theater, setTheater] = useState();
  const [loader, setLoader] = useState(true);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address:""

  });

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

      event.preventDefault();
      setSubmit(true);
   
  };

  const pincodehandleChange = (event) => {
    if (event.target.value.length === 6) {
      setPincode(event.target.value);
    } else {
      setState("");
      setCity("");
    }
  };

  useEffect(() => {
    if (submit) {
      updateprofile(inputs, state, city, pincode)
        .then((res) => {
          console.log("Profile updated successfully");
          navigate("/user-admin"); 
        })
        .catch((err) => console.log(err));
    }
  }, [submit]);

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setTheater(res.admin);
        setInputs({
          name: res.admin.name,
          email: res.admin.email,
          phonenumber: res.admin.phonenumber,
        });
        setState(res.admin.state);
        setCity(res.admin.city);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    pincodefetch(pincode)
      .then((res) => {
        setCity(res[0].PostOffice[0].Block);
        setState(res[0].PostOffice[0].Circle);
      })
      .catch((err) => console.log(err));
  }, [pincode]);

  const handleBackdropClick = () => {
    navigate("/user-admin");
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 15, width: "500px", height: "auto" },
        }}
        open={true}
        onBackdropClick={handleBackdropClick}
      >
        <Typography variant="h4" textAlign={"center"} marginTop={1}>
          Update
        </Typography>
        <Box padding={3}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={inputs.name}
                  onChange={handleChange}
                  placeholder="name"
                  name="name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide A valide Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="6" as={Col} controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="email"
                  name="email"
                  disabled="disabled"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide A valide Email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="6" as={Col} controlId="validationCustom02">
                <Form.Label>PhoneNumber</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="phonenumber"
                  minLength={10}
                  maxLength={10}
                  width={50}
                  value={inputs.phonenumber}
                  onChange={handleChange}
                  name="phonenumber"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide A valide PhoneNumber.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>pincode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pincode"
                  required
                  onChange={pincodehandleChange}
                  value={inputs.pincode}
                  name="pincode"
                  minLength={6}
                  maxLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Pincode.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  required
                  onChange={handleChange}
                  value={state}
                  name="state"

                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid State.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  onChange={handleChange}
                  value={city}
                  name="city"
            
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid City.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group md="6" as={Col} controlId="validationCustom02">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="address"
                value={inputs.address}
                onChange={handleChange}
                name="address"
              />

              <Form.Control.Feedback type="invalid">
                Please provide A valide Address.
              </Form.Control.Feedback>
            </Form.Group>
         
            <Col md="6">
              <Form.Group controlId="validationCustom03">
                <Box marginTop={5}>
                  <Button type="submit">Update Profile</Button>
                </Box>
              </Form.Group>
            </Col>
          </Form>
        </Box>
      </Dialog>
    </>
  );
}

export default UpdateProfile;
