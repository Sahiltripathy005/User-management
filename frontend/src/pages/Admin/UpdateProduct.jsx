import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  editProduct,
} from "../../features/product/productSlice";
import CommonModal from "../../components/Common/CommonModal";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import InputField from "../../components/Common/InputField";
import ContainedButton from "../../components/Common/ContainedButton";

const productFields = [
  {
    name: "name",
    component: InputField,
    props: {
      label: "Product Name",
    },
  },
  {
    name: "price",
    component: InputField,
    props: {
      label: "Price",
    },
  },
  {
    name: "image",
    component: InputField,
    props: {
      label: "Image URL",
    },
  },
  {
    name: "description",
    component: InputField,
    props: {
      label: "Description",
      multiline: true,
      rows: 3,
    },
  },
];


function UpdateProduct() {
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.products
  );

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSave = () => {
    const { _id, ...cleanData } = editData;

    dispatch(editProduct({
        id: editId,
        data: cleanData,
    }));

    setOpen(false);
    };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        sx={{
          width: "90%",
          maxWidth: 900,
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
          Update Products
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ background: "#1976d2" }}>
              <TableCell sx={{ color: "white" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Price
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>₹ {p.price}</TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(p)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <CommonModal
          open={open}
          handleClose={handleClose}
          title="Edit Product"
          fields={productFields}
          data={editData}
          onChange={handleChange}
          onSubmit={handleSave}
          submitText="Save"
          />
      </Paper>
    </Box>
  );
}

export default UpdateProduct;