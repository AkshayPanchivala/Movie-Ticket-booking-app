// import {
//   Autocomplete,
//   Box,
//   Pagination,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { getAllMovies } from "../../api-helpers/api-helper";
// import MoviesItem from "./MoviesItem";

// function Movies() {
//   const [movies, setMovies] = useState([]);
//   const [searchlanguage, setsearchlanguage] = useState(false);
//   const [moviesBylanguage, Setmoviesbylanguage] = useState([]);
//   const [totalPages, settotalPages] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     getAllMovies(currentPage)
//       .then((data) => {
//         console.log(data.movies);
//         setMovies(data.movies);
//         settotalPages(data.totalpages);
//       })
//       .catch((err) => console.log(err));
//   }, [currentPage]);
//   console.log(movies, searchlanguage);

//   const handlechange = (e, val) => {
//     console.log(e);
//     setsearchlanguage(true);
//     if (val === null) {
//       setsearchlanguage(false);
//     }

//     const filteredMovies = movies.filter((movie) =>
//       movie.language.includes(val)
//     );
//     Setmoviesbylanguage(filteredMovies);
//     console.log("fdfdfxczdf" + searchlanguage);

//     // );
//   };
//   // moviesBylanguage.forEach((movie) => {
//   //   console.log(movie.title);
//   // });
//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };
//   const language = ["Hindi", "English", "Gujarati"];
//   return (
//     <>
//       <Box marginTop={4}>
//         <Box width={"20%"} marginLeft={"80%"}>
//           <Autocomplete
//             id="free-solo-demo"
//             freeSolo
//             options={language.map((option) => option)}
//             renderInput={(params) => (
//               <TextField {...params} label="LanguageSelect" />
//             )}
//             onChange={handlechange}
//           />
//         </Box>

//         <Box
//           width={"90%"}
//           marginLeft={22}
//           marginTop={5}
//           display={"flex"}
//           justifyContent="flex-start"
//           flexWrap={"wrap"}
//         >
//           {searchlanguage &&
//             moviesBylanguage &&
//             moviesBylanguage.map((movie, index) => (
//               <>
//                 {console.log("lk1")}
//                 {console.log(movie)}
//                 <MoviesItem
//                   key={index}
//                   id={movie._id}
//                   posterUrl={movie.posterUrl}
//                   language={movie.language}
//                   description={movie.description}
//                   title={movie.title}
//                 />
//               </>
//             ))}
//           {movies &&
//             !searchlanguage &&
//             movies.map((movie, index) => (
//               <>
//                 {" "}
//                 {console.log("lk2")}
//                 {console.log(movie)}
//                 <MoviesItem
//                   key={index}
//                   id={movie._id}
//                   posterUrl={movie.posterUrl}
//                   language={movie.language}
//                   description={movie.description}
//                   title={movie.title}
//                   imagePath={movie.posterUrl}
//                 />
//               </>
//             ))}
//         </Box>
//       </Box>
//       <Stack spacing={2} marginLeft={100}>
//         <Pagination
//           count={totalPages}
//           color="primary"
//           onChange={handlePageChange}
//         />
//       </Stack>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// }

// export default Movies;
