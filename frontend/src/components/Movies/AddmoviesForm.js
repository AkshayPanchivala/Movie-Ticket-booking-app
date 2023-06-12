import {
  Alert,
  Box,
  Dialog,

  Typography,
} from "@mui/material";
import { useState } from "react";
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





function AddmoviesForm({ onSubmit }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const [isHindi, setIsHindi] = useState(false);
  const [isEnglish, setisEnglish] = useState(false);
  const [isGujarati, setisGujarati] = useState(false);

  const handleCheckbox1Change = (event) => {
    setIsHindi(event.target.checked);
  };
  const handleCheckbox2Change = (event) => {
    setisEnglish(event.target.checked);
  };
  const handleCheckbox3Change = (event) => {
    setisGujarati(event.target.checked);
  };
  const language = [];

  const photoupload = (event) => {
    let file = event.target.files;
  
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
  
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setIsError(false);
    event.preventDefault();
    if (!isHindi && !isEnglish && !isGujarati) {
      setIsError(true);
      return;
    }
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    if (validated === true) {
      event.preventDefault();
      if (isHindi === true) {
        if (language.includes("Hindi")) {
          return 1;
        }
        language.push("Hindi");
      }
      if (isEnglish === true) {
        if (language.includes("English")) {
          return 1;
        }
        language.push("English");
      }
      if (isGujarati === true) {
        if (language.includes("Gujarati")) {
          return 1;
        }
        language.push("Gujarati");
      }
  

      onSubmit({ inputs }, images, language);
    }
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
          AddMovies
        </Typography>
        <Box padding={3}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={inputs.title}
                  onChange={handleChange}
                  placeholder="title"
                  name="title"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide A valide Title.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={inputs.description}
                  onChange={handleChange}
                  placeholder="description"
                  name="description"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                <Form.Control.Feedback type="invalid">
                  Please provide A valide Description.
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
              
              <Form.Group controlId="validationCustomUsername">
                <Form.Label>Language</Form.Label>
                <Form.Check
                  type="checkbox"
                  id="profilePhotoCheckbox"
                  label="Hindi"
                  checked={isHindi}
                  onChange={handleCheckbox1Change}
                 
                />

                <Form.Check
                  type="checkbox"
                  id="profilePhotoCheckbox"
                  label="English"
                  checked={isEnglish}
                  onChange={handleCheckbox2Change}
               
                />

                <Form.Check
                  type="checkbox"
                  id="profilePhotoCheckbox"
                  label="Gujarati"
                  checked={isGujarati}
                  onChange={handleCheckbox3Change}
                  
                />
                {isError && (
                  <Alert variant="danger" color="red">
                    Please check at least one checkbox.
                  </Alert>
                )}
              </Form.Group>
            </Row>
            
            <Col md="6">
              <Form.Group controlId="validationCustom03">
                <Box marginTop={5}>
                  <Button type="submit">Add Movie</Button>
                </Box>
              </Form.Group>
            </Col>
          </Form>
        </Box>
      </Dialog>
    </>
  );
}
export default AddmoviesForm;
