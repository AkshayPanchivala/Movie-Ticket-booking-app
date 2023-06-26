import { CircularProgress } from '@mui/material';
import React from 'react'

function Loaderpage() {
  return (

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
    
  )
}

export default Loaderpage