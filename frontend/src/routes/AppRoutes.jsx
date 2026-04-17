import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import FormPage from "../pages/FormPage";
import TablePage from "../pages/TablePage";

// NEW imports
import ProductList from "../pages/Products/ProductList";
import ProductDetail from "../pages/Products/ProductDetail";
import AdminHome from "../pages/Admin/AdminHome";
import CreateProduct from "../pages/Admin/CreateProduct";
import UpdateProduct from "../pages/Admin/UpdateProduct";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Layout />}>

            {/* DEFAULT */}
            <Route index element={<FormPage />} />

            {/* EXISTING */}
            <Route path="table" element={<TablePage />} />

            {/* PRODUCTS (PUBLIC) */}
            <Route path="products" element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetail />} />

            {/* ADMIN */}
            <Route path="admin" element={<AdminHome />} />
            <Route path="admin/add-user" element={<FormPage />} />

            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/update-product" element={<UpdateProduct />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;