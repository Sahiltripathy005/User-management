import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductById,
} from "../../features/product/productSlice";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 900,
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          background:
            "linear-gradient(to right, #f5f7fa, #e3f2fd)",
        }}
      >
        {/* LEFT IMAGE */}
        <Box
          sx={{
            flex: 1,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* RIGHT DETAILS */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* NAME */}
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
          >
            {selectedProduct.name}
          </Typography>

          {/* PRICE */}
          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
            mb={2}
          >
            ₹ {selectedProduct.price}
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            variant="body1"
            color="text.secondary"
            mb={3}
          >
            {selectedProduct.description ||
              "No description available"}
          </Typography>

          {/* ACTION BUTTONS */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
            >
              Buy Now
            </Button>

            <Button
              variant="outlined"
              size="large"
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductDetail;