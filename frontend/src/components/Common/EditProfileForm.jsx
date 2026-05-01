import { Box } from "@mui/material";

import InputField from "./InputField";
import ContainedButton from "./ContainedButton";

function EditProfileForm({ formData, onChange, onSubmit }) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={onChange}
      />

      <InputField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={onChange}
      />

      <InputField
        label="Age"
        name="age"
        value={formData.age}
        onChange={onChange}
      />

      <InputField
        label="Comments"
        name="comments"
        value={formData.comments}
        onChange={onChange}
        multiline
        rows={3}
      />

      <ContainedButton type="submit">Save Changes</ContainedButton>
    </Box>
  );
}

export default EditProfileForm;
