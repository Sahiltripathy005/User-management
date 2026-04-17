import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import { useState } from "react";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // dummy user (later from auth)
  const user = {
    name: "Sahil",
  };

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

        {/* App Name */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          User Manager Pro
        </Typography>

        {/* USER SECTION */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          
          <Typography mr={1}>
            {user.name}
          </Typography>

          <IconButton onClick={handleClick}>
            <Avatar>
              {user.name[0]}
            </Avatar>
          </IconButton>

          {/* DROPDOWN MENU */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;