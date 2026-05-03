import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductById } from "../../features/product/productSlice";

import FallbackImage from "../../components/Common/FallbackImage";

import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import ContainedButton from "../../components/Common/ContainedButton";
import OutlinedButton from "../../components/Common/OutlinedButton";

import { addToCart, fetchCart } from "../../features/cart/cartSlice";
import { showError } from "../../utils/toast";
function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const { user } = useSelector((state) => state.auth);
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

  const handleAddToCart = async () => {
    if (!user?._id) {
      showError("Please login first");

      navigate("/login");

      return;
    }

    await dispatch(addToCart(selectedProduct._id));

    dispatch(fetchCart());
  };

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
          background: "linear-gradient(to right, #f5f7fa, #e3f2fd)",
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
          <FallbackImage
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
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {selectedProduct.name}
          </Typography>

          {/* PRICE */}
          <Typography variant="h5" color="primary" fontWeight="bold" mb={2}>
            ₹ {selectedProduct.price}
          </Typography>

          {/* DESCRIPTION */}
          <Typography variant="body1" color="text.secondary" mb={3}>
            {selectedProduct.description || "No description available"}
          </Typography>

          {/* ACTIONS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <ContainedButton
              sx={{
                width: "auto",
                mt: 0,
                px: 4,
              }}
            >
              Buy Now
            </ContainedButton>

            <OutlinedButton
              onClick={handleAddToCart}
              sx={{
                width: "auto",
                mt: 0,
                px: 4,
              }}
            >
              Add To Cart
            </OutlinedButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductDetail;
