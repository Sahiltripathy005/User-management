import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/Layout";

import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Profile from "../pages/Profile";

import ProductList from "../pages/Products/ProductList";
import ProductDetail from "../pages/Products/ProductDetail";

import UserManagement from "../pages/UserManagement";
import ProductManagement from "../pages/ProductManagement";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import Cart from "../pages/Cart";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* ROOT */}
        <Route path="/" element={<Navigate to="/products" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        {/* PUBLIC ROUTES */}
        <Route element={<Layout />}>
          <Route path="/products" element={<ProductList />} />

          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/user" element={<UserManagement />} />

          <Route path="/products/manage" element={<ProductManagement />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
