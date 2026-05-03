import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/Common/Product/ProductCard";
import { fetchProducts } from "../../features/product/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {products.map((p) => (
        <ProductCard
          key={p._id}
          title={p.name}
          price={p.price}
          image={p.image}
          onClick={() => navigate(`/products/${p._id}`)}
        />
      ))}
    </Box>
  );
}

export default ProductList;
