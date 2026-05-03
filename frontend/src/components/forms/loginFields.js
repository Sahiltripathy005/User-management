import InputField from "../Common/InputField";

const loginFields = [
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
            label:
                "Password",
            type: "password",
        },
    },
];

export default
    loginFields;