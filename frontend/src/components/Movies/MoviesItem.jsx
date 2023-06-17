// import {
//   Button,
//   Card,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   IconButton,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   ListSubheader,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import InfoIcon from "@mui/icons-material/Info";
// import Box from "@mui/material/Box";

// function MoviesItem({
//   title,
//   posterUrl,
//   id,

//   language,
//   description,
// }) {
//   const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const isTheaterLoggedIn = useSelector((state) => state.theater.isLoggedIn);
//   const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
//   const [isHovered, setIsHovered] = useState(false);
//   // const handleClick = () => {
//   //   setIsClicked(true);
//   // };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };
//   // {
//   //   !isuserLoggedIn && navigate("/Auth");
//   // }
//   // ":hover": {
//   //   boxShadow: "10px 10px 20px #ccc",
//   // },
//   const sliderStyles = {
//     position: "relative",
//     height: "100%",

//     margin: "8px",
//   };

//   return (
//     <Card sx={{ maxWidth: 325, maxHeight: 490, margin: "8px" }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="800"
//           image={`${posterUrl}`}
//           alt="green iguana"
//           style={sliderStyles}
//         />

//       </CardActionArea>
//     </Card>
//   );
// }
// <Card
//   onMouseEnter={handleMouseEnter}
//   onMouseLeave={handleMouseLeave}
//   sx={{
//     margin: 2,
//     maxWidth: 220,
//     maxHeight: 300,
//     // maxheight: 20,
//     borderRadius: 5,
//     // backgroundColor: isHovered ? '#f0f0f0' : 'inherit',
//     // transition: 'background-color 0.3s ease',
//     transform: isHovered ? "scale(1.17)" : "scale(1)",
//     transition: "transform 0.3s ease",
//   }}
// >
//   <div
//     style={{
//       position: "relative",
//       height: "45%",
//       width: "100%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//   >
//     <img
//       style={{
//         maxHeight: "100%",
//         maxWidth: "100%",
//         objectFit: "contain",
//       }}
//       src={posterUrl}
//       alt={title}
//     />
//   </div>
//   {/* <img height={"45%"} width="100%" src={posterUrl} alt={title} /> */}
//   {/* <CardMedia
//     sx={{ height: 140,width:100 }}
//     image={posterurl}
//     title="green iguana"
//   /> */}
//   <CardContent>
//     <Typography gutterBottom variant="h5" component="div">
//       {title}
//     </Typography>
//     <Typography variant="body2" color="text.secondary">
//       {language + " "}
//     </Typography>
//     <Typography sx={{}} gutterBottom variant="h10" component="div">
//       <div
//         style={{
//           justifyContent: "center",
//           display: "flex",
//           textAlign: "right",
//           textAlign: "left",
//         }}
//       ></div>
//     </Typography>
//     {/* {language &&
//       language.map((e) => { */}

//     {/* })} */}
//   </CardContent>
//   <CardActions>
//     {!isTheaterLoggedIn && !isuserLoggedIn && (
//       <Button
//         variant="contained"
//         fullWidth
//         LinkComponent={Link}
//         to={isuserLoggedIn ? `/booking/${id}` : "/auth/login"}
//         sx={{
//           margin: "auto",
//           bgcolor: "#2b2d42",
//           ":hover": {
//             bgcolor: "#121217",
//           },
//         }}
//         size="small"
//       >
//         Book
//       </Button>
//     )}
//     {!isAdminLoggedIn && isuserLoggedIn && (
//       <Button
//         variant="contained"
//         fullWidth
//         LinkComponent={Link}
//         to={isuserLoggedIn ? `/booking/${id}` : "/auth/login"}
//         sx={{
//           margin: "auto",
//           bgcolor: "#2b2d42",
//           ":hover": {
//             bgcolor: "#121217",
//           },
//         }}
//         size="small"
//       >
//         Book
//       </Button>
//     )}
//     {!isAdminLoggedIn && isTheaterLoggedIn && (
//       <Button
//         variant="contained"
//         fullWidth
//         LinkComponent={Link}
//         to={`/bookingdata/${id}`}
//         sx={{
//           margin: "auto",
//           bgcolor: "#2b2d42",
//           ":hover": {
//             bgcolor: "#121217",
//           },
//         }}
//         size="small"
//       >
//         Get Booking Detail
//       </Button>
//     )}
//   </CardActions>
// </Card>
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
function MoviesItem({
    title,
    posterUrl,
    id,
  
    language,
    description,
  }
  )
 {
  return (
    <>
      {console.log(posterUrl)}
      <Box>
      <AspectRatio
        objectFit="contain"
        sx={{ width: 700, borderRadius: "sm" }}
      >
        <img
          src={posterUrl}
          srcSet={posterUrl}
          alt="A beautiful landscape."
          style={{ width: "100%", height: "100%" }}
        />
      </AspectRatio>
    </Box>
    </>
  );

}
export default MoviesItem;
