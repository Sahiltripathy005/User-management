import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import InputField from "../../components/Common/InputField";
import ContainedButton from "../../components/Common/ContainedButton";

import { useDispatch } from "react-redux";
import { createProduct } from "../../features/product/productSlice";

import { toast } from "react-toastify";

function CreateProduct() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // ---------- handle change ----------
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ---------- validation ----------
  const validate = () => {
    let temp = {};

    if (!product.name.trim()) {
      temp.name = "Name required";
    }

    if (!product.price) {
      temp.price = "Price required";
    } else if (isNaN(product.price)) {
      temp.price = "Must be a number";
    }

    if (!product.image.trim()) {
      temp.image = "Image URL required";
    }

    if (!product.description.trim()) {
      temp.description = "Description required";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await dispatch(createProduct(product)).unwrap();

      toast.success("Product Created Successfully");

      // reset form
      setProduct({
        name: "",
        price: "",
        image: "",
        description: "",
      });

      setErrors({});
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        elevation={6}
        sx={{
          p: 3,
          width: 400,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          align="center"
          fontWeight="bold"
        >
          Create Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <InputField
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />

          <InputField
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            error={!!errors.image}
            helperText={errors.image}
          />

          <InputField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />

          <ContainedButton type="submit">
            Create Product
          </ContainedButton>
        </form>
      </Paper>
    </Box>
  );
}

export default CreateProduct;