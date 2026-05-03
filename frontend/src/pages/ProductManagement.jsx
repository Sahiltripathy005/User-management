import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../features/product/productSlice";

import PageHeader from "../components/Management/PageHeader";
import SearchBar from "../components/Management/SearchBar";
import ProductTable from "../components/Management/ProductTable";
import productFields from "../components/Management/ProductFormFields";

import CommonModal from "../components/Common/CommonModal";
import ConfirmModal from "../components/Common/ConfirmModal";

import { showSuccess, showError } from "../utils/toast";
import { validateForm } from "../utils/validateForm";
function ProductManagement() {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [editId, setEditId] = useState(null);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const resetForm = () => {
    setProductData({
      name: "",
      price: "",
      image: "",
      description: "",
    });
  };

  const handleChange =(e) => {
    setProductData({
      ...productData,
      [e.target.name]:
        e.target.value,
    });

    setErrors(
      (prev) => ({
        ...prev,
        [e.target.name]:
          "",
      })
    );
  };

  const handleAdd = async () => {
    const validationErrors =
      validateForm(
        productFields,
        productData
      );

    if (
      Object.keys(
        validationErrors
      ).length
    ) {
      setErrors(
        validationErrors
      );
      return;
    }

    try {
      await dispatch(
        createProduct(
          productData
        )
      ).unwrap();

      showSuccess(
        "Product added successfully"
      );

      resetForm();
      setErrors({});
      setOpenAdd(false);
    } catch {
      showError(
        "Failed to add product"
      );
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);

    setProductData(product);

    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    const validationErrors =
      validateForm(
        productFields,
        productData
      );

    if (
      Object.keys(
        validationErrors
      ).length
    ) {
      setErrors(
        validationErrors
      );
      return;
    }

    const {
      _id,
      ...cleanData
    } =
      productData;

    try {
      await dispatch(
        editProduct({
          id: editId,
          data:
            cleanData,
        })
      ).unwrap();

      showSuccess(
        "Product updated successfully"
      );

      setOpenEdit(false);
      resetForm();
      setErrors({});
    } catch {
      showError(
        "Failed to update product"
      );
    }
  };

  const handleDeleteAsk = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();

      showSuccess("Product deleted successfully");

      setConfirmOpen(false);
    } catch {
      showError("Failed to delete product");
    }
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <PageHeader
        title="Product Management"
        buttonText="Add Product"
        onClick={() => setOpenAdd(true)}
      />

      {/* SEARCH */}
      <SearchBar
        label="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDeleteAsk}
      />

      {/* ADD PRODUCT MODAL */}
      <CommonModal
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        title="Add Product"
        fields={productFields}
        data={productData}
        onChange={handleChange}
        onSubmit={handleAdd}
        submitText="Add"
        errors={errors}
      />

      {/* EDIT PRODUCT MODAL */}
      <CommonModal
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        title="Edit Product"
        fields={productFields}
        data={productData}
        onChange={handleChange}
        onSubmit={handleUpdate}
        submitText="Update"
        errors={errors}
      />

      {/* DELETE CONFIRM MODAL */}
      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />
    </Box>
  );
}

export default ProductManagement;
