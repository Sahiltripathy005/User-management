import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./SideBar";

import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <Box
          sx={{
            flex: 1,
            p: 3,
          }}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;