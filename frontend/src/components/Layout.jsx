import Header from "./Header";
import Footer from "./Footer";
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

      <Box
        sx={{
          flex: 1,
          p: 2,
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default Layout;