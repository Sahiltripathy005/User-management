import { Box, Paper, Typography, Avatar, Divider, Chip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router-dom";

import { useState } from "react";

import { updateProfile } from "../features/auth/authSlice";

import EditProfileForm from "../components/Common/EditProfileForm";

import { showSuccess, showError } from "../utils/toast";
import ChangePasswordForm from "../components/Common/ChangePasswordForm";

import { changePassword } from "../features/auth/authSlice";
import ContainedButton from "../components/Common/ContainedButton";
import OutlinedButton from "../components/Common/OutlinedButton";

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    age: user?.age || "",
    comments: user?.comments || "",
  });

  const [passwordMode, setPasswordMode] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      updateProfile({
        _id: user._id,
        ...formData,
      }),
    );

    showSuccess("Profile updated");

    setEditing(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      ).unwrap();

      showSuccess("Password changed");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setPasswordMode(false);
    } catch (err) {
      showError(err.message || "Password change failed");
    }
  };

  const DetailItem = ({ label, value }) => (
    <>
      <Box
        sx={{
          py: 2.5,
        }}
      >
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          {label}
        </Typography>

        <Typography variant="body1" fontWeight="600">
          {value || "-"}
        </Typography>
      </Box>

      <Divider />
    </>
  );

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper
        elevation={8}
        sx={{
          width: 550,
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            background: "linear-gradient(135deg,#1976d2,#42a5f5)",
            py: 5,
            px: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: 38,
              mb: 2,
              border: "4px solid white",
            }}
          >
            {user.name[0]}
          </Avatar>

          <Typography variant="h5" fontWeight="bold" color="white">
            {user.name}
          </Typography>

          <Chip
            label={user.role}
            sx={{
              mt: 2,
              fontWeight: 600,
              textTransform: "capitalize",
              bgcolor: "white",
            }}
          />
        </Box>

        {/* BODY */}
        <Box
          sx={{
            p: 4,
          }}
        >
          {passwordMode ? (
            <ChangePasswordForm
              formData={passwordData}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  [e.target.name]: e.target.value,
                })
              }
              onSubmit={handlePasswordChange}
            />
          ) : editing ? (
            <EditProfileForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          ) : (
            <>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Profile Details
              </Typography>

              <DetailItem label="Full Name" value={user.name} />

              <DetailItem label="Email Address" value={user.email} />

              <DetailItem label="Phone Number" value={user.phone} />

              <DetailItem label="Age" value={user.age} />

              <DetailItem label="Comments" value={user.comments} />

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <ContainedButton
                  onClick={() => setEditing(true)}
                  sx={{
                    width: "auto",
                    mt: 0,
                    px: 3,
                  }}
                >
                  Edit Profile
                </ContainedButton>

                <OutlinedButton
                  onClick={() => setPasswordMode(true)}
                  sx={{
                    width: "auto",
                    mt: 0,
                    px: 3,
                  }}
                >
                  Change Password
                </OutlinedButton>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile;
