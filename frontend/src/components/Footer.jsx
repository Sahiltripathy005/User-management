import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(90deg,#1976d2,#42a5f5)",
        color: "white",
        textAlign: "center",
        py: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        © 2026 User Manager Pro
      </Typography>

      <Typography variant="caption">
        Developed for Demo Project
      </Typography>
    </Box>
  );
}

export default Footer;