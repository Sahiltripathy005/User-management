import React from 'react'
import { Button } from "@mui/material";

function ContainedButton({children , ...props}) {
  return (
    <Button
    variant='contained'
    fullWidth
    sx = {{mt :2}}
    {...props}
    >
        {children}
    </Button>
  )
}

export default ContainedButton;