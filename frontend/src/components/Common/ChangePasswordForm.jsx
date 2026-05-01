import { Box } from "@mui/material";

import InputField from "./InputField";
import ContainedButton from "./ContainedButton";

function ChangePasswordForm({ formData, onChange, onSubmit }) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <InputField
        label="Current Password"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={onChange}
      />

      <InputField
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={onChange}
      />

      <InputField
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        value={formData.confirmNewPassword}
        onChange={onChange}
      />

      <ContainedButton type="submit">Change Password</ContainedButton>
    </Box>
  );
}

export default ChangePasswordForm;
