import { Box } from "@mui/material";

function FormBuilder({ fields, data, errors, onChange }) {
  const handleChange = (e, field) => {
    let value = e.target.value;

    if (field.type === "number") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (field.name === "phone") {
      value = value.slice(0, 10);
    }

    onChange({
      target: {
        name: field.name,
        value,
      },
    });
  };

  return (
    <Box>
      {fields.map((field) => {
        const Component = field.component;

        return (
          <Component
            key={field.name}
            name={field.name}
            value={data[field.name]}
            onChange={(e) => handleChange(e, field)}
            error={Boolean(errors?.[field.name])}
            helperText={errors?.[field.name]}
            {...field.props}
          />
        );
      })}
    </Box>
  );
}

export default FormBuilder;
