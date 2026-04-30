import InputField from "../Common/InputField";

const productFields = [
  {
    name: "name",
    component: InputField,
    props: {
      label: "Product Name",
      placeholder:
        "Enter product name",
      type: "text",
    },
  },
  {
    name: "price",
    component: InputField,
    props: {
      label: "Price",
      placeholder:
        "Enter product price",
      type: "number",
    },
  },
  {
    name: "image",
    component: InputField,
    props: {
      label: "Product Image URL",
      placeholder:
        "Paste image URL",
      type: "text",
    },
  },
  {
    name: "description",
    component: InputField,
    props: {
      label:
        "Product Description",
      placeholder:
        "Write product description",
      multiline: true,
      rows: 4,
    },
  },
];

export default productFields;