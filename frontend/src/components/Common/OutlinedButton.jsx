import { Button } from "@mui/material";

function OutlinedButton({ children, sx = {}, ...props }) {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        mt: 2,
        py: 1.2,
        borderRadius: 2,
        fontWeight: 600,
        textTransform: "capitalize",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default OutlinedButton;
