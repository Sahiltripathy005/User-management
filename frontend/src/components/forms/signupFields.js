import InputField from "../Common/InputField";

const signupFields = [
    {
        name: "name",
        component:
            InputField,
        required: true,
        props: {
            label: "Name",
        },
    },
    {
        name: "email",
        component:
            InputField,
        required: true,
        props: {
            label: "Email",
            type: "email",
        },
    },
    {
        name: "password",
        component:
            InputField,
        required: true,
        props: {
            label: "Password",
            type: "password",
        },
    },
    {
        name:
            "confirmPassword",
        component:
            InputField,
        required: true,
        props: {
            label:
                "Confirm Password",
            type: "password",
        },
    },
    {
        name: "phone",
        component:
            InputField,
        props: {
            label:
                "Phone (Optional)",
        },
    },
    {
        name: "age",
        component:
            InputField,
        props: {
            label:
                "Age (Optional)",
            type: "number",
        },
    },
    {
        name: "comments",
        component:
            InputField,
        props: {
            label:
                "Comments (Optional)",
            multiline: true,
            rows: 3,
        },
    },
];

export default
    signupFields;