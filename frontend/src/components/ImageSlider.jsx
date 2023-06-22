// // import { useEffect, useState } from "react";

// // const slideStyles = {
// //   width: "100%",
// //   height: "100%",
// //   borderRadius: "10px",
// //   backgroundSize: "cover",
// //   backgroundPosition: "center",
// // };

// // const rightArrowStyles = {
// //   position: "absolute",
// //   top: "50%",
// //   transform: "translate(0, -50%)",
// //   right: "32px",
// //   fontSize: "45px",
// //   color: "#fff",
// //   zIndex: 1,
// //   cursor: "pointer",
// // };

// // const leftArrowStyles = {
// //   position: "absolute",
// //   top: "50%",
// //   transform: "translate(0, -50%)",
// //   left: "32px",
// //   fontSize: "45px",
// //   color: "#fff",
// //   zIndex: 1,
// //   cursor: "pointer",
// // };

// // const sliderStyles = {
// //   position: "relative",
// //   height: "100%",
// // };

// // const dotsContainerStyles = {
// //   display: "flex",
// //   justifyContent: "center",
// // };

// // const dotStyle = {
// //   margin: "0 3px",
// //   cursor: "pointer",
// //   fontSize: "20px",
// // };

// // const ImageSlider = ({ slides }) => {
// //   console.log(slides);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [currentdot, setdot] = useState(1);
// //   const goToPrevious = () => {
// //     const isFirstSlide = currentIndex === 0;
// //     const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
// //     setCurrentIndex(newIndex);
// //   };
// //   const goToNext = () => {
// //     const isLastSlide = currentIndex === slides.length - 1;
// //     const newIndex = isLastSlide ? 0 : currentIndex + 1;

// //     setCurrentIndex(newIndex);
// //   };
// //   const goToSlide = (slideIndex) => {
// //     setCurrentIndex(slideIndex);
// //   };
// //   setTimeout(goToNext, 5000);
// //   const slideStylesWidthBackground = {
// //     ...slideStyles,
// //     backgroundImage: `url(${slides[currentIndex].url})`,
// //   };

// //   return (
// //     <div style={sliderStyles}>
// //       <div>
// //         <div onClick={goToPrevious} style={leftArrowStyles}>
// //           ❰
// //         </div>
// //         <div onClick={goToNext} style={rightArrowStyles}>
// //           ❱
// //         </div>
// //       </div>
// //       <div style={slideStylesWidthBackground}></div>
// //       <div style={dotsContainerStyles}>
// //         {/* {console.log(slides)} */}
// //         {slides.map((slide, slideIndex) => (
// //           <div key={slideIndex} onClick={() => goToSlide(slideIndex)}>
// //             ●
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImageSlider;
// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { getAllMovies } from "../api-helpers/api-helper";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// function ImageSlider() {
//   const [slides, setSlides] = useState([]);
//   const sliderRef = useRef(null);
//   const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const navigate = useNavigate();
//   useEffect(() => {
//     // Fetch the data for the slides
//     // Example: API call or data retrieval logic
//     const fetchSlides = async () => {
//       getAllMovies()
//         .then((data) => {
//           setSlides(data.movies);
//         })
//         .catch((err) => console.log(err));
//       // try {
//       //   // Retrieve the data for the slides
//       //   const response = await fetch("https://example.com/api/slides");
//       //   const data = await response.json();

//       //   // Update the state with the retrieved slides
//       //
//       // } catch (error) {
//       //   console.error("Error fetching slides:", error);
//       // }
//     };

//     fetchSlides();
//   }, []);
//   useEffect(() => {
//     const slider = sliderRef.current;
//     const interval = setInterval(() => {}, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Customize the settings for the slider (optional)
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true, // Enable automatic slide rotation
//     autoplaySpeed: 5000,
//   };
//   const slideStyles = {
//     width: "1000px",
//     height: "450px",
//     borderRadius: "10px",
//     objectFit: "cover",
//     marginLeft: "270px",
//   };

//   const handleImageClick = (slideId) => {
//     // Handle the click event, e.g., navigate to a new page or show a modal
//     if (isuserLoggedIn) {
//       navigate(`/booking/${slideId}`);
//     } else {
//       navigate("/auth/login");
//     }
//   };
//   return (
//     <Slider {...settings}>
//       {slides.slice(0, 3).map((slide, index) => (
//         <div
//           key={slide._id}
//           id={slide._id}
//           style={slideStyles}
//           onClick={() => handleImageClick(slide._id)}
//         >
//           <img src={slide.posterUrl} alt={slide.title} style={slideStyles} />
//         </div>
//       ))}
//     </Slider>
//   );
// }

// export default ImageSlider;
// // Use the ImageSlider component in your desired location:

// // javascript
// // Copy code
// // function Homepage() {
// //   return (
// //     <div>
// //       <h1>Welcome to the Homepage</h1>
// //       <ImageSlider />
// //     </div>
// //   );
// // }
