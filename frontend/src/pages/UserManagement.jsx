import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  deleteUser,
  editUser,
} from "../features/user/userSlice";

import PageHeader from "../components/Management/PageHeader";
import SearchBar from "../components/Management/SearchBar";
import UserTable from "../components/Management/UserTable";
import userFields from "../components/Management/UserFormFields";

import CommonModal from "../components/Common/CommonModal";
import ConfirmModal from "../components/Common/ConfirmModal";

import {
  showSuccess,
  showError,
} from "../utils/toast";

function UserManagement() {
  const dispatch = useDispatch();

  const { users } = useSelector(
    (state) => state.users
  );

  const [search, setSearch] =
    useState("");

  const [openAdd, setOpenAdd] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      age: "",
      comments: "",
    });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers =
    users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      comments: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = async () => {
    try {
    await dispatch(
        addUser(formData)
    ).unwrap();

    showSuccess(
        "User added successfully"
    );
    } catch {
    showError(
        "Failed to add user"
    );
    }

    resetForm();
    setOpenAdd(false);
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setFormData(user);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    try {
    await dispatch(
        editUser({
        id: editId,
        data: formData,
        })
    ).unwrap();

    showSuccess(
        "User updated successfully"
    );
    } catch {
    showError(
        "Failed to update user"
    );
    }

    setOpenEdit(false);
    resetForm();
  };

  const handleDeleteAsk = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
    await dispatch(
        deleteUser(deleteId)
    ).unwrap();

    showSuccess(
        "User deleted successfully"
    );
    } catch {
    showError(
        "Failed to delete user"
    );
    }

    setConfirmOpen(false);
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <PageHeader
        title="User Management"
        buttonText="Add User"
        onClick={() =>
          setOpenAdd(true)
        }
      />

      {/* SEARCH */}
      <SearchBar
        label="Search User"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      {/* TABLE */}
      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={
          handleDeleteAsk
        }
      />

      {/* ADD USER MODAL */}
      <CommonModal
        open={openAdd}
        handleClose={() =>
          setOpenAdd(false)
        }
        title="Add User"
        fields={userFields}
        data={formData}
        onChange={handleChange}
        onSubmit={handleAdd}
        submitText="Add"
      />

      {/* EDIT USER MODAL */}
      <CommonModal
        open={openEdit}
        handleClose={() =>
          setOpenEdit(false)
        }
        title="Edit User"
        fields={userFields}
        data={formData}
        onChange={handleChange}
        onSubmit={
          handleUpdate
        }
        submitText="Update"
      />

      {/* DELETE CONFIRM MODAL */}
      <ConfirmModal
        open={confirmOpen}
        onCancel={() =>
          setConfirmOpen(false)
        }
        onConfirm={
          handleDelete
        }
        title="Delete User"
        message="Are you sure you want to delete this user?"
      />
    </Box>
  );
}

export default UserManagement;