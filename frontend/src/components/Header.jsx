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
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContainedButton from "./Common/ContainedButton";
function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

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
        <IconButton sx={{ mr: 2 }} onClick={() => navigate("/cart")}>
          <Badge badgeContent={items.length} color="error">
            <ShoppingCartIcon
              sx={{
                color: "white",
              }}
            />
          </Badge>
        </IconButton>

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
          <ContainedButton
            onClick={() => navigate("/login")}
            sx={{
              width: "auto",
              mt: 0,
              px: 3,
            }}
          >
            Login
          </ContainedButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
