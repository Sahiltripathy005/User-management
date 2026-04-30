import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  Divider,
} from "@mui/material";

import {
  useSelector,
} from "react-redux";

import {
  Link,
} from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";

function SideBar({
  open,
  setOpen,
}) {
  const { user } =
    useSelector(
      (state) =>
        state.auth
    );

  const drawerWidth =
    open ? 240 : 64;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width:
          drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper":
          {
            width:
              drawerWidth,
            overflowX:
              "hidden",
            transition:
              "width 0.3s ease",
            boxSizing:
              "border-box",
          },
      }}
    >
      {/* TOGGLE BUTTON */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 1,
        }}
      >
        <IconButton
          onClick={() =>
            setOpen(!open)
          }
          sx={{
            ml: 0,
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {/* PRODUCTS */}
        <ListItemButton
          component={Link}
          to="/products"
        >
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>

          {open && (
            <ListItemText primary="Products" />
          )}
        </ListItemButton>

        {/* PROFILE */}
        <ListItemButton
          component={Link}
          to="/profile"
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>

          {open && (
            <ListItemText primary="Profile" />
          )}
        </ListItemButton>

        {/* ADMIN ONLY */}
        {user?.role ===
          "admin" && (
          <>
            <ListItemButton
              component={
                Link
              }
              to="/user"
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>

              {open && (
                <ListItemText primary="User Management" />
              )}
            </ListItemButton>

            <ListItemButton
              component={
                Link
              }
              to="/products/manage"
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>

              {open && (
                <ListItemText primary="Product Management" />
              )}
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  );
}

export default SideBar;