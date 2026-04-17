import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 200,
        p: 2,
        borderRight: "1px solid #ddd",
      }}
    >
      <Button fullWidth component={Link} to="/products">
        Products
      </Button>

      <Button fullWidth component={Link} to="/admin">
        Admin
      </Button>
    </Box>
  );
}

export default Sidebar;