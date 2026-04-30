import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Link as MuiLink,
} from "@mui/material";

import {
  useDispatch,
} from "react-redux";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import ContainedButton from "../../components/Common/ContainedButton";
import FormBuilder from "../../components/Common/FormBuilder";
import InputField from "../../components/Common/InputField";

import {
  validateForm,
} from "../../utils/validateForm";

import {
  loginUser,
} from "../../features/auth/authSlice";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

const loginFields = [
  {
    name: "email",
    component: InputField,
    required: true,
    props: {
      label: "Email",
      type: "email",
    },
    validate: (value) =>
      !/\S+@\S+\.\S+/.test(
        value
      )
        ? "Invalid email"
        : "",
  },
  {
    name: "password",
    component: InputField,
    required: true,
    props: {
      label: "Password",
      type: "password",
    },
  },
];

function Login() {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [errors,
    setErrors] =
    useState({});

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    // clear individual field error
    if (
      errors[
        e.target.name
      ]
    ) {
      setErrors({
        ...errors,
        [e.target.name]:
          "",
      });
    }
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const validationErrors =
        validateForm(
          loginFields,
          formData
        );

      if (
        Object.keys(
          validationErrors
        ).length > 0
      ) {
        setErrors(
          validationErrors
        );
        return;
      }

      try {
        await dispatch(
          loginUser(
            formData
          )
        ).unwrap();

        showSuccess(
          "Login successful"
        );

        navigate(
          "/products"
        );
      } catch (err) {
        showError(
          err.message ||
            "Login failed"
        );
      }
    };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(135deg,#e3f2fd,#f8fafc)",
      }}
    >
      {/* LEFT PANEL */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          p: 6,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            mb={2}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
          >
            Manage users and
            products with a clean
            admin dashboard.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT PANEL */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          p: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: 420,
            p: 5,
            borderRadius: 4,
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
            align="center"
          >
            Login
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={4}
            align="center"
          >
            Sign in to continue
          </Typography>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <FormBuilder
              fields={
                loginFields
              }
              data={
                formData
              }
              errors={
                errors
              }
              onChange={
                handleChange
              }
            />

            <ContainedButton type="submit">
              Login
            </ContainedButton>
          </form>

          <Typography
            mt={3}
            textAlign="center"
            color="text.secondary"
          >
            Don't have an
            account?{" "}
            <MuiLink
              component={Link}
              to="/signup"
              underline="hover"
              fontWeight="600"
            >
              Signup
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;