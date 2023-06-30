import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  Stack,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import { getAlladmin, Theaterdelete } from "../../api-helpers/api-helper";
import DeleteIcon from "@mui/icons-material/Delete";

function AllTheater() {
  const [Theater, SetTheater] = useState("");
  const [totalPages, settotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [Delete,setDelete]=useState(true)
  const [Loader, setLoader] = useState(true);
  useEffect(() => {
    getAlladmin(currentPage)
      .then((res) => {
        settotalPages(res.data.totalPages);
        SetTheater(res.data.data);
        setLoader(false);
      })

      .catch((err) => console.log(err));
  }, [currentPage,Delete]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const Theaterdeletehandler = (id) => {
    Theaterdelete(id);
    setDelete(!Delete)
   
  };
  return (
    <>
      {Loader && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {Theater &&
            Theater.map((theater) => (
              <>
                <Grid item xs={2} sm={4} md={6}>
                  <>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        overflow: "hidden",
                        margin: "10px",
                        minHeight:"250px"
                      }}
                      variant="outlined"
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          maxWidth: { xs: "90%", sm: "200px" },
                          objectFit: "cover",
                        }}
                        src={`${theater.profilephoto}`}
                        alt="Caffe Latte"
                      />

                      <Stack sx={{ flex: 1 }}>
                        {console.log(theater._id)}
                        <CardContent>
                          <Typography variant="h10" component="div">
                            <strong>Theater Name:</strong> {theater.name}
                          </Typography>
                          <Typography>
                            <strong>Email:</strong>
                            {theater.email}
                          </Typography>

                          <Typography>
                            <strong>Address:</strong>
                            {theater.address}
                          </Typography>
                          <Typography>
                            <strong>Pincode:</strong>
                            {theater.pincode}
                          </Typography>
                          <Typography>
                            <strong>City:</strong>
                            {theater.city}
                          </Typography>
                        </CardContent>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            width: "150px",
                            marginLeft: "240px",
                            marginTop:"30px",
                            height: "30px",
                          }}
                          onClick={() => {
                            Theaterdeletehandler(theater._id);
                          }}
                        >
                          <IconButton color="default" aria-label="delete">
                            <DeleteIcon sx={{ marginLeft: "0px" }} />
                          </IconButton>
                        </Button>
                      </Stack>
                    </Card>
                  </>
                </Grid>
              </>
            ))}
        </Grid>
      </Box>

      <Stack spacing={2} marginLeft={65} marginTop={10}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}

export default AllTheater;

// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   Box,
//   Typography,
//   Stack,
//   Divider,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import { getAlladmin } from "../../api-helpers/api-helper";
// import Button from "../../SeatBooking/library/Button";

// function AllTheater() {
//   const [Theater, SetTheater] = useState("");
//   useEffect(() => {
//     getAlladmin()
//       .then((res) => SetTheater(res.data.data))

//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <>
//       {console.log(Theater)}
//       {Theater &&
//         Theater.map((theater) => (
//           <>
//             <Card
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 overflow: "hidden",
//                 margin:"10px",
//                 width:"50%"
//               }}
//               variant="outlined"
//             >
//               <CardMedia
//                 component="img"
//                 sx={{
//                   maxWidth: { xs: "100%", sm: "200px" },
//                   objectFit: "cover",
//                 }}
//                 src={`${theater.profilephoto}`}
//                 alt="Caffe Latte"
//               />

//               <Stack sx={{ flex: 1 }}>
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                   {theater.name}
//                   </Typography>

//                   <Typography py={2}>
//                   {theater.address}
//                   </Typography>
//                 </CardContent>

//               </Stack>
//             </Card>
//           </>
//         ))}
//     </>
//   );
// }

// export default AllTheater;
