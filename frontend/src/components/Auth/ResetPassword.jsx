
import { Box, Dialog, Typography } from "@mui/material";
import {  useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";

import {  useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { Resetpassword } from "../../api-helpers/api-helper";
function ResetPassword() {
  const navigate = useNavigate();
  const token = useParams();

  const [validated, setValidated] = useState(false);

  const [inputs, setInputs] = useState({
    password: "",
    confirmpassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (inputs.password !== inputs.confirmpassword) {
      return toast.error("Password and confirm password not match", {
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

    setValidated(true);

    event.preventDefault();
    Resetpassword({ inputs }, token.token);
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
          Reset password
        </Typography>
        <Box padding={3}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  minLength={6}
                  maxLength={8}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
                  required
                  onChange={handleChange}
                  value={inputs.password}
                  name="password"
                />

                <Form.Control.Feedback type="invalid">
                  Please provide a valid Password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group md="6" controlId="validationCustom03">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirmpassword"
                minLength={6}
                maxLength={8}
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
                required
                onChange={handleChange}
                value={inputs.confirmpassword}
                name="confirmpassword"
              />

              <Form.Control.Feedback type="invalid">
                Please provide a valid ConfirmPassword.
              </Form.Control.Feedback>
              <>
                {inputs.confirmpassword.length > 0 && (
                  <>
                    {passwordMatch ? (
                      <>
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </>
                    ) : (
                      <>
                        <Form.Control.Feedback type="invalid">
                          Passwords do not match.
                        </Form.Control.Feedback>
                      </>
                    )}
                  </>
                )}
                <Form.Text muted>
                  Password must contain at least one numeric character, one
                  uppercase letter, one lowercase letter, and one special
                  character.
                </Form.Text>
              </>
            </Form.Group>

            <Col md="6">
              <Form.Group controlId="validationCustom03">
                <Box marginTop={5} justifyContent="center" marginLeft={20}>
                  <Button type="submit">Reset Password</Button>
                </Box>
              </Form.Group>
            </Col>
          </Form>
        </Box>
      </Dialog>
    </>
  );
}

export default ResetPassword;
