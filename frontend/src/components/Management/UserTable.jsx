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

function UserTable({
  users,
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
        {/* HEADER */}
        <TableHead>
          <TableRow
            sx={{
              background:
                "#f8fafc",
            }}
          >
            <TableCell>
              <strong>
                User
              </strong>
            </TableCell>

            <TableCell>
              <strong>
                Email
              </strong>
            </TableCell>

            <TableCell>
              <strong>
                Phone
              </strong>
            </TableCell>

            <TableCell>
              <strong>
                Age
              </strong>
            </TableCell>

            <TableCell align="center">
              <strong>
                Actions
              </strong>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {users.length >
          0 ? (
            users.map(
              (user) => (
                <TableRow
                  key={
                    user._id
                  }
                  hover
                  sx={{
                    transition:
                      "0.2s ease",
                  }}
                >
                  {/* USER */}
                  <TableCell>
                    <Box
                      sx={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 2,
                      }}
                    >
                      <Avatar>
                        {user.name?.[0]}
                      </Avatar>

                      <Typography fontWeight="600">
                        {
                          user.name
                        }
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* EMAIL */}
                  <TableCell>
                    {
                      user.email
                    }
                  </TableCell>

                  {/* PHONE */}
                  <TableCell>
                    {
                      user.phone
                    }
                  </TableCell>

                  {/* AGE */}
                  <TableCell>
                    {
                      user.age
                    }
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell align="center">
                    <IconButton
                      onClick={() =>
                        onEdit(
                          user
                        )
                      }
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        onDelete(
                          user._id
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
                    No users found
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

export default UserTable;