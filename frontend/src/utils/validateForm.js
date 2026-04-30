export const validateForm = (
  fields,
  data
) => {
  const errors = {};

  fields.forEach(
    (field) => {
      const value =
        data[
          field.name
        ];

      if (
        field.required &&
        !value
      ) {
        errors[
          field.name
        ] =
          `${field.props.label} is required`;
      }

      if (
        field.validate
      ) {
        const error =
          field.validate(
            value
          );

        if (error) {
          errors[
            field.name
          ] = error;
        }
      }
    }
  );

  return errors;
};