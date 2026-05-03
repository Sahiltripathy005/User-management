import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import FormBuilder from "./FormBuilder";
import ContainedButton from "./ContainedButton";
import OutlinedButton from "./OutlinedButton";

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
        <FormBuilder
          fields={fields}
          data={data}
          errors={errors}
          onChange={onChange}
        />
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          gap: 2,
        }}
      >
        <OutlinedButton
          onClick={handleClose}
          sx={{
            mt: 0,
          }}
        >
          Cancel
        </OutlinedButton>

        <ContainedButton
          onClick={onSubmit}
          sx={{
            mt: 0,
          }}
        >
          {submitText}
        </ContainedButton>
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;
