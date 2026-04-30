import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

function AdminBackButton() {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      onClick={() => navigate("/admin")}
      sx={{ mb: 2 }}
    >
      Back to Admin
    </Button>
  );
}

export default AdminBackButton;