import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUsers,
  deleteUser,
} from "../features/user/userSlice";

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
  CircularProgress,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function TablePage() {
  const dispatch = useDispatch();

  const { users, loading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 900,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          align="center"
          fontWeight="bold"
        >
          Users Table
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                }}
              >
                <TableCell sx={{ color: "white" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Phone
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Age
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Comments
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u._id}
                  hover
                >
                  <TableCell>
                    {u.name}
                  </TableCell>

                  <TableCell>
                    {u.email}
                  </TableCell>

                  <TableCell>
                    {u.phone}
                  </TableCell>

                  <TableCell>
                    {u.age}
                  </TableCell>

                  <TableCell>
                    {u.comments}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(u._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}

export default TablePage;