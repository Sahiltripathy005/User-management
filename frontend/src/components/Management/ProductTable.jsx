import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FallbackImage from "../Common/FallbackImage";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow:
          "0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      <Table>
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow
            sx={{
              background:
                "#f8fafc",
            }}
          >
            <TableCell>
              <strong>
                Image
              </strong>
            </TableCell>

            <TableCell>
              <strong>
                Product Name
              </strong>
            </TableCell>

            <TableCell>
              <strong>
                Price
              </strong>
            </TableCell>

            <TableCell>
              <strong>
                Description
              </strong>
            </TableCell>

            <TableCell align="center">
              <strong>
                Actions
              </strong>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {products.length >
          0 ? (
            products.map(
              (
                product
              ) => (
                <TableRow
                  key={
                    product._id
                  }
                  hover
                  sx={{
                    transition:
                      "0.2s ease",
                  }}
                >
                  {/* IMAGE */}
                  <TableCell>
                    <FallbackImage
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        objectFit: "cover",
                    }}
                    />
                  </TableCell>

                  {/* NAME */}
                  <TableCell>
                    <Typography fontWeight="600">
                      {
                        product.name
                      }
                    </Typography>
                  </TableCell>

                  {/* PRICE */}
                  <TableCell>
                    <Typography color="primary">
                      ₹{" "}
                      {
                        product.price
                      }
                    </Typography>
                  </TableCell>

                  {/* DESCRIPTION */}
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {product.description?.slice(
                        0,
                        50
                      )}
                      ...
                    </Typography>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        onEdit(
                          product
                        )
                      }
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        onDelete(
                          product._id
                        )
                      }
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
              >
                <Box py={4}>
                  <Typography color="text.secondary">
                    No products found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ProductTable;