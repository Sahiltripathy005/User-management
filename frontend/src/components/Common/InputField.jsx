import { TextField } from "@mui/material";

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  type = "text",
}) {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="dense"
      error={error}
      helperText={helperText}
    />
  );
}

export default InputField;