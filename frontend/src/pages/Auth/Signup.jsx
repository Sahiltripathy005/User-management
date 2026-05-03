import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  Link as MuiLink,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import ContainedButton from "../../components/Common/ContainedButton";

import { signupUser } from "../../features/auth/authSlice";

import { showSuccess, showError } from "../../utils/toast";
import FormBuilder from "../../components/Common/FormBuilder";

import signupFields from "../../components/forms/signupFields";

import { validateForm } from "../../utils/validateForm";

function Signup() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    phone: "",
    age: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(signupFields, formData);

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { confirmPassword, ...payload } = formData;

      await dispatch(signupUser(payload)).unwrap();

      showSuccess("Signup successful");

      navigate("/login");
    } catch (err) {
      showError(err.message || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg,#e3f2fd,#f8fafc)",
      }}
    >
      {/* LEFT PANEL */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 6,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Create Account
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Join and manage users, products, and admin tools easily.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT PANEL */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: 450,
            p: 5,
            borderRadius: 4,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={1} align="center">
            Signup
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={4}
            align="center"
          >
            Create your account
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* REQUIRED */}
            <FormBuilder
              fields={signupFields}
              data={formData}
              errors={errors}
              onChange={handleChange}
            />

            {/* ROLE */}
            <FormControl
              fullWidth
              sx={{
                mt: 1,
                mb: 3,

                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background: "#fff",
                },
              }}
            >
              <InputLabel>Role</InputLabel>

              <Select
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="user">User</MenuItem>

                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <ContainedButton type="submit">Signup</ContainedButton>
          </form>

          <Typography mt={3} textAlign="center" color="text.secondary">
            Already have an account?{" "}
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              fontWeight="600"
            >
              Login
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Signup;
