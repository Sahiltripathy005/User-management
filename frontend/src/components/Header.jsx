import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(90deg,#1976d2,#42a5f5)",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          sx={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            background: "white",
            mr: 1,
          }}
        />

        {/* Name */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          User Manager Pro
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          Form
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/table"
        >
          Table
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;