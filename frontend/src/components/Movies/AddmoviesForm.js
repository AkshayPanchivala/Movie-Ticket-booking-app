// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import * as formik from "formik";
// import * as yup from "yup";
// import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import { useState } from "react";

// function AddmoviesForm() {
//   const [Inputs,setInputs]=useState({title:"",description:"",posterUrl:"",releaseDate:""});
//   const handleChange=(e)=>{
//     setInputs((prevstate)=>({...prevstate,[e.target.name]:e.target.value,}))
//   }
//   const { Formik } = formik;

//   const schema = yup.object().shape({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     username: yup.string().required(),
//     city: yup.string().required(),
//     state: yup.string().required(),
//     zip: yup.string().required(),
//     terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
//   });

//   return (
//     <>
//       <Box
//         width={"50%"}
//         padding={10}
//         margin="auto"
//         display={"flex"}
//         flexDirection="column"
//         boxShadow={"10px 10px 20px #ccc"}
//       >
//         <Typography textAlign={"center"} variant="h5" fontFamily={"vardana"} marginBottom={3}>
//           AddMovies
//         </Typography>
//         <Formik
//           validationSchema={schema}
//           onSubmit={console.log}
//           initialValues={{
//             firstName: "Mark",
//             lastName: "Otto",
//             username: "",
//             city: "",
//             state: "",
//             zip: "",
//             terms: false,
//           }}
//         >
//           {({ handleSubmit, handleChange, values, touched, errors }) => (
//             <Form noValidate onSubmit={handleSubmit}>
//               <Row className="mb-3">
//                 <Form.Group as={Col} md="4" controlId="validationFormik01">
//                   <Form.Label>First name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="firstName"
//                     value={values.firstName}
//                     onChange={handleChange}
//                     isValid={touched.firstName && !errors.firstName}
//                   />
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group as={Col} md="4" controlId="validationFormik02">
//                   <Form.Label>Last name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="lastName"
//                     value={values.lastName}
//                     onChange={handleChange}
//                     isValid={touched.lastName && !errors.lastName}
//                   />

//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   md="4"
//                   controlId="validationFormikUsername"
//                 >
//                   <Form.Label>Username</Form.Label>
//                   <InputGroup hasValidation>
//                     <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                     <Form.Control
//                       type="text"
//                       placeholder="Username"
//                       aria-describedby="inputGroupPrepend"
//                       name="username"
//                       value={values.username}
//                       onChange={handleChange}
//                       isInvalid={!!errors.username}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.username}
//                     </Form.Control.Feedback>
//                   </InputGroup>
//                 </Form.Group>
//               </Row>
//               <Row className="mb-3">
//                 <Form.Group as={Col} md="6" controlId="validationFormik03">
//                   <Form.Label>City</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="City"
//                     name="city"
//                     value={values.city}
//                     onChange={handleChange}
//                     isInvalid={!!errors.city}
//                   />

//                   <Form.Control.Feedback type="invalid">
//                     {errors.city}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group as={Col} md="3" controlId="validationFormik04">
//                   <Form.Label>State</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="State"
//                     name="state"
//                     value={values.state}
//                     onChange={handleChange}
//                     isInvalid={!!errors.state}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.state}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group as={Col} md="3" controlId="validationFormik05">
//                   <Form.Label>Zip</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Zip"
//                     name="zip"
//                     value={values.zip}
//                     onChange={handleChange}
//                     isInvalid={!!errors.zip}
//                   />

//                   <Form.Control.Feedback type="invalid">
//                     {errors.zip}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Row>
//               <Form.Group className="mb-3">
//                 <Form.Check
//                   required
//                   name="terms"
//                   label="Agree to terms and conditions"
//                   onChange={handleChange}
//                   isInvalid={!!errors.terms}
//                   feedback={errors.terms}
//                   feedbackType="invalid"
//                   id="validationFormik0"
//                 />
//               </Form.Group>
//               <Button type="submit">Submit form</Button>
//             </Form>
//           )}
//         </Formik>
//       </Box>
//     </>
//   );
// }

// export default AddmoviesForm;
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "./../../api-helpers/api-helper";
const labelProps = {
  mt: 1,
  mb: 1,
};
const AddmoviesForm = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddmoviesForm;
