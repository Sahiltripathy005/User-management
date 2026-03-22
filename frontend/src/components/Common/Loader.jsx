import { Box, CircularProgress } from '@mui/material'
import { Typography } from "@mui/material";
import React from 'react'

function Loader({text = "Loading..."}) {
  return (
    <Box
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
      }}
    >

    <CircularProgress />
    <Typography mt={1}>
        {text}
    </Typography>
        
    </Box>
  )
}

export default Loader