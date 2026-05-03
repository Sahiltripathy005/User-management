import {
  Box,
  Typography,
  Paper,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  removeFromCart,
  fetchCart,
  updateCartQuantity,
} from "../features/cart/cartSlice";

import FallbackImage from "../components/Common/FallbackImage";
import ContainedButton from "../components/Common/ContainedButton";

function Cart() {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  const total = items.reduce(
    (acc, item) =>
      acc + (Number(item?.product?.price) || 0) * (Number(item?.quantity) || 0),
    0,
  );
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        py: 4,
      }}
    >
      <Typography variant="h4" fontWeight="700" mb={4}>
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 4,
          }}
        >
          {/* LEFT SIDE */}
          <Box>
            {items.map((item) => (
              <Paper
                key={item._id}
                elevation={4}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 4,
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    borderRadius: 3,
                    overflow: "hidden",
                    background: "#f8fafc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FallbackImage
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* DETAILS */}
                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="700">
                    {item.product.name}
                  </Typography>

                  <Typography color="primary" fontWeight="600" mt={1}>
                    ₹{item.product.price}
                  </Typography>

                  <Typography mt={1} color="text.secondary">
                    Subtotal: ₹{item.product.price * item.quantity}
                  </Typography>

                  {/* COUNTER */}
                  <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                    <IconButton
                      sx={{
                        border: "1px solid #ddd",
                      }}
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            id: item._id,
                            quantity: item.quantity - 1,
                          }),
                        ).then(() => dispatch(fetchCart()))
                      }
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography fontWeight="700">{item.quantity}</Typography>

                    <IconButton
                      sx={{
                        border: "1px solid #ddd",
                      }}
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            id: item._id,
                            quantity: item.quantity + 1,
                          }),
                        ).then(() => dispatch(fetchCart()))
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </Box>

                {/* DELETE */}
                <IconButton
                  color="error"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Paper>
            ))}
          </Box>

          {/* RIGHT SIDE SUMMARY */}
          <Paper
            elevation={5}
            sx={{
              p: 4,
              borderRadius: 4,
              height: "fit-content",
              position: "sticky",
              top: 20,
            }}
          >
            <Typography variant="h6" fontWeight="700" mb={3}>
              Order Summary
            </Typography>

            <Divider
              sx={{
                mb: 3,
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>Items</Typography>

              <Typography>{items.length}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography fontWeight="700">Total</Typography>

              <Typography fontWeight="700">₹ {total}</Typography>
            </Box>

            <ContainedButton
              startIcon={<ShoppingCartCheckoutIcon />}
              sx={{
                mt: 0,
              }}
            >
              Checkout
            </ContainedButton>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
