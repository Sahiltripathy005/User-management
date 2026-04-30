import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import {
  fetchUsers,
  deleteUser,
  editUser,
} from "../features/user/userSlice";

import InputField from "../components/Common/InputField";
import AgeField from "../components/Common/AgeField";
import EmailField from "../components/Common/EmailField";
import PhoneField from "../components/Common/PhoneField";
import Loader from "../components/Common/Loader";
import EmptyState from "../components/Common/EmptyState";
import CommonModal from "../components/Common/CommonModal";


const editFields = [
  {
    name: "name",
    component: InputField,
    props: {
      label: "Name",
    },
  },
  {
    name: "email",
    component: EmailField,
    props: {
      label: "Email",
    },
  },
  {
    name: "phone",
    component: PhoneField,
    props: {},
  },
  {
    name: "age",
    component: AgeField,
    props: {
      type: "number",
      inputProps: { min: 0, max: 150 },
    },
  },
  {
    name: "comments",
    component: InputField,
    props: {
      label: "Comments",
      multiline: true,
      rows: 3,
    },
  },
];


const  TablePage = () =>{
  const dispatch = useDispatch();

  const { users, loading } = useSelector(
    (state) => state.users
  );

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    comments: "",
  });

  const [editErrors, setEditErrors] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    comments: "",
  });

  const validateEdit = () => {
  let temp = {};

  if (!editData.name?.trim())
    temp.name = "Name required";
  else if (editData.name.length < 3)
    temp.name = "Min 3 chars";

  if (!editData.email?.trim())
    temp.email = "Email required";
  else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
      editData.email
    )
  )
    temp.email = "Invalid email";

  if (!editData.phone?.trim())
    temp.phone = "Phone required";
  else if (!/^[0-9]{10}$/.test(editData.phone))
    temp.phone = "10 digit phone";

  if (editData.age === "")
    temp.age = "Age required";
  else if (
    editData.age < 0 ||
    editData.age > 150
  )
    temp.age = "0-150 only";

  if (!editData.comments?.trim())
    temp.comments = "Comments required";

  setEditErrors(temp);

  return Object.keys(temp).length === 0;
};



  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteUserToast(
        dispatch(deleteUser(id)).unwrap()
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setEditData(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!validateEdit()) return;

    try {
      await editUserToast(
        dispatch(editUser({
          id: editId,
          data: editData
        })).unwrap()
      );

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const showPromiseToast = (promise, messages) => {
    return toast.promise(promise, {
      pending: {
        render: () => messages.pending,
        icon: "⏳",
      },
      success: {
        render: () => messages.success,
        icon: "✅",
      },
      error: {
        render: () => messages.error,
        icon: "❌",
      },
    });
  };

  const deleteUserToast = (promise) => {
    return showPromiseToast(promise, {
      pending: "Deleting user...",
      success: "User deleted successfully!",
      error: "Failed to delete user",
    });
  };

  const editUserToast = (promise) => {
    return showPromiseToast(promise, {
      pending: "Updating user...",
      success: "User updated successfully!",
      error: "Failed to update user",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 900,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          align="center"
          fontWeight="bold"
        >
          Users Table
        </Typography>

        {loading ? (
          <Loader text="Fetching users..." />
        ) : users.length === 0 ? (
          <EmptyState message="No users found" />
        ) : (
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                }}
              >
                <TableCell sx={{ color: "white" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Phone
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Age
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Comments
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u._id} hover>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>{u.age}</TableCell>
                  <TableCell>{u.comments}</TableCell>

                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(u._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(u)
                      }
                    >
                      <ModeEditOutlineRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* EDIT */}

      <CommonModal
        open={open}
        handleClose={handleClose}
        title="Edit User"
        fields={editFields}
        data={editData}
        errors={editErrors}
        onChange={handleChange}
        onSubmit={handleSave}
        submitText="Update"
      />

    </Box>
  );
}

export default TablePage;