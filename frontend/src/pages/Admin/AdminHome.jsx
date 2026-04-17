import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AdminCard from "../../components/Common/Admin/AdminCard";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EditIcon from "@mui/icons-material/Edit";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      {/* ADD USER */}
      <AdminCard
        title="Add User"
        description="Create new user in system"
        buttonText="Go"
        icon={<PersonAddIcon fontSize="large" />}
        onClick={() => navigate("/admin/add-user")}
      />

      {/* VIEW USERS */}
      <AdminCard
        title="View Users"
        description="See all users"
        buttonText="Open"
        icon={<PersonAddIcon fontSize="large" />}
        onClick={() => navigate("/table")}
      />

      {/* CREATE PRODUCT */}
      <AdminCard
        title="Create Product"
        description="Add new product"
        buttonText="Create"
        icon={<Inventory2Icon fontSize="large" />}
        onClick={() => navigate("/admin/create-product")}
      />

      {/* UPDATE PRODUCT */}
      <AdminCard
        title="Update Product"
        description="Edit existing products"
        buttonText="Update"
        icon={<EditIcon fontSize="large" />}
        onClick={() => navigate("/admin/update-product")}
      />
    </Box>
  );
}

export default AdminHome;