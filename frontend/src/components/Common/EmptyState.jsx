import { Box } from '@mui/material'
import { Typography } from "@mui/material";
import React from 'react'

function EmptyState({message}) {
  return (
    <Box
    sx={{
        textAlign: "center",
        mt: 3,
        color: "gray",
    }}
    >
    <Typography variant="h6">
        {message}
      </Typography>
    </Box>
  )
}

export default EmptyState;