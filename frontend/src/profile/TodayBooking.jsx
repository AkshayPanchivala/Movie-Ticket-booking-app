import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { MovieCard } from '../Movies/MovieCard';
import   {getTodaybooking} from "./../api-helpers/api-helper"

function TodayBooking() {
    const [TodayBooking,SetTodayBooking]=useState();
    const [Loader, setLoader] = useState(true);
    useEffect(()=>{
        getTodaybooking().then(
            (res)=>{
                SetTodayBooking(res.data.booking)
                setLoader(false)
         
            }
            
        ).catch()
    },[])
  return (<>

    {Loader && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
          {TodayBooking&& TodayBooking.length===0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
       <Typography> No booking Today</Typography>
       </Box>
      )}
          {TodayBooking&& TodayBooking.length>0 && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
   <Container maxWidth="lg" sx={{ paddingTop: "10px" }}>
          <Grid container spacing={3}>
            {TodayBooking.map((Movie) => (
              <Grid item key={Movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard Movie={Movie} />
              </Grid>
            ))}
          </Grid>
        </Container>
       </Box>
      )}
        </>
  )
}

export default TodayBooking