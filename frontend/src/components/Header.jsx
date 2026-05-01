import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logoutUser } from "../features/auth/authSlice";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");

    handleClose();
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());

    handleClose();

    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg,#1976d2,#42a5f5)",
      }}
    >
      <Toolbar>
        {/* LOGO */}
        <Box
          sx={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            background: "white",
            mr: 2,
          }}
        />

        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          User Manager Pro
        </Typography>

        {/* USER / GUEST */}
        {user?._id ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography mr={1}>{user.name}</Typography>

            <IconButton onClick={handleClick}>
              <Avatar>{user.name[0]}</Avatar>
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              bgcolor: "white",
              color: "#1976d2",
              fontWeight: 600,
              px: 3,
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
