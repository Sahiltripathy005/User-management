export const validateForm =
  (
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
          field.name ===
          "email" &&
          value &&
          !/^\S+@\S+\.\S+$/.test(
            value
          )
        ) {
          errors[
            field.name
          ] =
            "Invalid email";
        }

        if (
          field.name ===
          "phone" &&
          value &&
          !/^[0-9]{10}$/.test(
            value
          )
        ) {
          errors[
            field.name
          ] =
            "Phone must be 10 digits";
        }

        if (
          field.name ===
          "age" &&
          value &&
          (Number(
            value
          ) < 1 ||
            Number(
              value
            ) > 120)
        ) {
          errors[
            field.name
          ] =
            "Age must be between 1-120";
        }

        if (
          field.name ===
          "password" &&
          value &&
          value.length < 6
        ) {
          errors[
            field.name
          ] =
            "Minimum 6 characters";
        }

        if (
          field.name === "price" && value && Number(value) <= 0) {
          errors[field.name] = "Invalid price";
        }
      }
    );

    return errors;
  };