import { ToastContainer } from "react-toastify";

import {
BrowserRouter,
Routes,
Route,
Navigate,
} from "react-router-dom";

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

function AppRoutes() {
return ( <BrowserRouter> <ToastContainer />

 
  <Routes>
    {/* PUBLIC */}
    <Route
      path="/"
      element={
        <Navigate to="/login" />
      }
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/signup"
      element={<Signup />}
    />

    {/* PROTECTED */}
    <Route
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      {/* PROFILE */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* PRODUCTS */}
      <Route
        path="/products"
        element={<ProductList />}
      />

      <Route
        path="/products/:id"
        element={<ProductDetail />}
      />

      {/* ADMIN ONLY USERS */}
      <Route
        path="/user"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />

      {/* ADMIN ONLY PRODUCTS */}
      <Route
        path="/products/manage"
        element={
          <AdminRoute>
            <ProductManagement />
          </AdminRoute>
        }
      />
    </Route>
  </Routes>
</BrowserRouter>
 

);
}

export default AppRoutes;
