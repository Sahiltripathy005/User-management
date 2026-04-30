import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../features/user/userSlice";

import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import InputField from "../components/Common/InputField";
import EmailField from "../components/Common/EmailField";
import PhoneField from "../components/Common/PhoneField";
import AgeField from "../components/Common/AgeField";
import ContainedButton from "../components/Common/ContainedButton";
import AdminBackButton from "../components/Common/admin/AdminBackButton";

function FormPage() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [comments, setComments] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    comments: "",
  });

  const [nameError, setNameError] =
    useState("");
  const [emailError, setEmailError] =
    useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        name.length > 0 &&
        name.length < 3
      ) {
        setNameError(
          "Name must be at least 3 characters"
        );
      } else {
        setNameError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        email.length > 0 &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          email
        )
      ) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  const validate = () => {
    let temp = {};

    if (!name.trim())
      temp.name = "Name required";

    if (!email.trim()) {
      temp.email = "Email required";
    } else if (
      !/^[0-9A-Z._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        email
      )
    ) {
      temp.email = "Invalid email";
    }

    if (!phone.trim()) {
      temp.phone = "Phone required";
    } else if (
      !/^[0-9]{10}$/.test(phone)
    ) {
      temp.phone = "10 digit phone";
    }

    if (age === "")
      temp.age = "Age required";

    if (!comments.trim())
      temp.comments =
        "Comments required";

    setErrors(temp);

    return (
      Object.keys(temp).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await dispatch(
      addUser({
        name,
        email,
        phone,
        age,
        comments,
      })
    );

    console.log(res);

    if (!res.error) {
      successToast();

      setName("");
      setEmail("");
      setPhone("");
      setAge("");
      setComments("");

      setNameError("");
      setEmailError("");

      setErrors({
        name: "",
        email: "",
        phone: "",
        age: "",
        comments: "",
      });
    } else {
      errorToast();
    }
  };

  const successToast = () => {
    toast.success(
      "User added successfully!",
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
  };

  const errorToast = () => {
    toast.error(
      "Failed to add user. Try again.",
      {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 420,
          p: 3,
          borderRadius: 3,
        }}
      >
        <AdminBackButton />

        <Typography
          variant="h5"
          align="center"
          mb={2}
          fontWeight="bold"
        >
          User Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            error={
              !!errors.name ||
              !!nameError
            }
            helperText={
              errors.name || nameError
            }
          />

          <EmailField
            name="email"
            label="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            error={
              !!errors.email ||
              !!emailError
            }
            helperText={
              errors.email || emailError
            }
          />

          <PhoneField
            name="phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <AgeField
            name="age"
            value={age}
            onChange={(e) => {
              let value =
                e.target.value;

              if (value === "") {
                setAge("");
                return;
              }

              value = Number(value);

              if (
                value >= 0 &&
                value <= 150
              ) {
                setAge(value);
              }
            }}
            type="number"
            error={!!errors.age}
            helperText={errors.age}
          />

          <InputField
            label="Comments"
            name="comments"
            value={comments}
            onChange={(e) =>
              setComments(
                e.target.value
              )
            }
            multiline
            rows={3}
            error={!!errors.comments}
            helperText={
              errors.comments
            }
          />

          <ContainedButton type="submit">
            Submit
          </ContainedButton>
        </form>
      </Paper>
    </Box>
  );
}

export default FormPage;