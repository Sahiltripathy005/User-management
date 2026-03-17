import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser } from "../features/user/userSlice";

import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
} from "@mui/material";

function FormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});

  // ---------- change ----------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------- validation ----------
  const validate = () => {
    let temp = {};

    if (!form.name.trim()) {
      temp.name = "Name required";
    }

    if (!form.email.trim()) {
      temp.email = "Email required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        form.email
      )
    ) {
      temp.email = "Invalid email";
    }

    if (!form.phone.trim()) {
      temp.phone = "Phone required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      temp.phone = "10 digit phone";
    }

    if (!form.age.trim()) {
      temp.age = "Age required";
    } else if (!/^[0-9]+$/.test(form.age)) {
      temp.age = "Number only";
    }

    if (!form.comments.trim()) {
      temp.comments = "Comments required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await dispatch(addUser(form));

    navigate("/table");
  };

 return (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
      <Typography
        variant="h5"
        align="center"
        mb={2}
        fontWeight="bold"
      >
        User Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="dense"
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="dense"
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          label="Age"
          name="age"
          fullWidth
          margin="dense"
          onChange={handleChange}
          error={!!errors.age}
          helperText={errors.age}
        />

        <TextField
          label="Comments"
          name="comments"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          onChange={handleChange}
          error={!!errors.comments}
          helperText={errors.comments}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  </Box>
);
}

export default FormPage;