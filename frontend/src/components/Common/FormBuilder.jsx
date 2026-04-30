import {
  Box,
} from "@mui/material";

function FormBuilder({
  fields,
  data,
  errors,
  onChange,
}) {
  return (
    <Box>
      {fields.map(
        (field) => {
          const Component =
            field.component;

          return (
            <Component
              key={
                field.name
              }
              name={
                field.name
              }
              value={
                data[
                  field.name
                ]
              }
              onChange={
                onChange
              }
              error={Boolean(
                errors?.[
                  field.name
                ]
              )}
              helperText={
                errors?.[
                  field.name
                ]
              }
              {...field.props}
            />
          );
        }
      )}
    </Box>
  );
}

export default FormBuilder;