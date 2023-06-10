import { Box, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import storage from "../../utils/firebase";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { pincodefetch } from "../../api-helpers/api-helper";
function Theatersignupform({ onSubmit }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [pincode, setpincode] = useState();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
  });
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const photoupload = (event) => {
    let file = event.target.files;
    console.log(file);
    if (!file) {
      alert("Please upload an image first!");
    }

    for (let i = 0; i < file.length; i++) {
      const storageRef = addRef(storage, `/files/${file[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, file[i]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImages((prevImages) => [...prevImages, url]);
          });
        }
      );
    }
  };

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(inputs);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    console.log(form);
    setValidated(true);
    if (validated === true) {
      event.preventDefault();
      onSubmit({ inputs }, images, state, city, pincode);
    }
  };
  const pincodehandleChange = (event) => {
    if (event.target.value.length === 6) {
      setpincode(event.target.value);
    } else {
      setstate("");
      setcity("");
    }
    // if(===6)
  };
  useEffect(() => {
    pincodefetch(pincode)
      .then((res) => {
        console.log(res             );
        setcity(res[0].PostOffice[0].Block);
        setstate(res[0].PostOffice[0].Circle);
      })
      .catch((err) => console.log(err));
  }, [pincode]);
  console.log(state, city);
  const loginhandler = () => {
    navigate("/Theater/login");
  };
  const handleBackdropClick = () => {
    navigate("/");
  };
  const handleConfirmPasswordChange = (event) => {
    let confirmPassword = event.target.value;
    console.log(confirmPassword);
    setPasswordMatch(inputs.password === event.target.value);
    // Check if password and confirm password match
  };
  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 15, width: "500px", height: "700px" },
        }}
        open={true}
        onBackdropClick={handleBackdropClick}
      >
        <Typography variant="h4" textAlign={"center"} marginTop={1}>
          Register
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
              <Form.Group md="4" controlId="validationCustomUsername">
                <Form.Label>ProfilePhoto</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <AccountCircleIcon />
                  </InputGroup.Text>
                  <Form.Control
                    type="file"
                    placeholder="Profilephoto"
                    value={inputs.profilephoto}
                    onChange={photoupload}
                    name="profilephoto"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a ProFilePhoto.
                  </Form.Control.Feedback>
                </InputGroup>
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
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid State.
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
                  defaultValue="Otto"
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
            <Form.Group md="6" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="password"
                pattern="^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$"
                minLength={6}
                maxLength={8}
                required
                onChange={handleChange}
                value={inputs.password}
                name="password"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="6" controlId="validationCustom03">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirmpassword"
                minLength={6}
                maxLength={8}
                pattern="^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$"
                required
                onChange={handleChange}
                value={inputs.confirmpassword}
                name="confirmpassword"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Confirm Password.
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
                <Box marginTop={5}>
                  <Button type="submit">Register</Button>
                </Box>
              </Form.Group>
            </Col>
            <Row className="mb-3">
              <Col md="6">
                <Form.Group controlId="validationCustom03">
                  <Box marginTop={3}>
                    <Typography alignContent={"center"}>
                      If you have Account?
                    </Typography>
                  </Box>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="validationCustom03">
                  <Box marginTop={2}>
                    <Button onClick={loginhandler}>Login</Button>
                  </Box>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Box>
      </Dialog>
    </>
  );
}

export default Theatersignupform;
