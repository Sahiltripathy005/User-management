import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const CommonModal = ({
  open,
  handleClose,
  title,
  fields = [],
  data,
  errors = {},
  onChange,
  onSubmit,
  submitText = "Save",
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {fields.map((field, index) => {
          const Component = field.component;

          return (
            <Component
              key={index}
              {...field.props}
              name={field.name}
              value={data[field.name] || ""}
              onChange={onChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
            />
          );
        })}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button variant="contained" onClick={onSubmit}>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;