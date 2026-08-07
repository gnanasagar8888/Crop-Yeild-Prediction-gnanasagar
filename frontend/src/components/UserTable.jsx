import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
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
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >

      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: "bold",
        }}
      >
        👥 Users
      </Typography>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Username
              </TableCell>

              <TableCell>
                Email
              </TableCell>

              <TableCell>
                Role
              </TableCell>

              <TableCell align="center">
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {users.map((user) => (

              <TableRow key={user._id} hover>

                <TableCell>
                  {user.username}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>

                  <Chip
                    label={user.role}
                    color={
                      user.role === "admin"
                        ? "warning"
                        : user.role === "researcher"
                        ? "primary"
                        : "success"
                    }
                  />

                </TableCell>

                <TableCell align="center">

                  <IconButton
                    color="primary"
                    onClick={() => onEdit(user)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(user._id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );

}

export default UserTable;