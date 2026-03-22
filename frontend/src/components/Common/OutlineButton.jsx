import { Button } from "@mui/material";

function OutlineButton({ children, ...props}) {
  return (
    <Button
      variant="outlined"
      fullWidth
      {...props}
    >
      {children}
    </Button>
  );
}

export default OutlineButton;