import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

function EditUserDialog({
  open,
  user,
  onClose,
  onSave,
}) {

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {

    if (user) {

      setForm({
        username: user.username,
        email: user.email,
        role: user.role,
      });

    }

  }, [user]);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        Edit User
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          select
          margin="normal"
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >

          <MenuItem value="admin">
            Admin
          </MenuItem>

          <MenuItem value="farmer">
            Farmer
          </MenuItem>

          <MenuItem value="researcher">
            Researcher
          </MenuItem>

        </TextField>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => onSave(form)}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default EditUserDialog;