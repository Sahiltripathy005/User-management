import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar"; // NEW
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(to right, #e3f2fd, #f5f5f5)",
      }}
    >
      <Header />

      {/* MAIN CONTENT WITH SIDEBAR */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        {/* SIDEBAR */}
        <Sidebar />

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flex: 1,
            p: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default Layout;