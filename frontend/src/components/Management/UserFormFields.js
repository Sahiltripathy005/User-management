import InputField from "../Common/InputField";

const userFields = [
  {
    name: "name",
    component: InputField,
    props: {
      label: "Full Name",
      placeholder:
        "Enter full name",
      type: "text",
    },
  },
  {
    name: "email",
    component: InputField,
    props: {
      label: "Email Address",
      placeholder:
        "Enter email address",
      type: "email",
    },
  },
  {
    name: "phone",
    component: InputField,
    props: {
      label: "Phone Number",
      placeholder:
        "Enter phone number",
      type: "tel",
    },
  },
  {
    name: "age",
    component: InputField,
    props: {
      label: "Age",
      placeholder:
        "Enter age",
      type: "number",
    },
  },
  {
    name: "comments",
    component: InputField,
    props: {
      label: "Comments",
      placeholder:
        "Write additional notes",
      multiline: true,
      rows: 3,
    },
  },
];

export default userFields;