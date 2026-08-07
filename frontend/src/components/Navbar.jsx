import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        bgcolor: "#2E7D32",
      }}
    >
      <Toolbar>

        {/* Logo */}

        <AgricultureIcon
          sx={{
            mr: 1,
            fontSize: 32,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          SmartYield
        </Typography>

        {/* Role */}

        <Chip
          label={role?.toUpperCase()}
          color="warning"
          sx={{
            mr: 2,
            fontWeight: "bold",
          }}
        />

        {/* User */}

        <Avatar
          sx={{
            bgcolor: "#1565C0",
            mr: 1,
          }}
        >
          {username?.charAt(0).toUpperCase()}
        </Avatar>

        <Typography
          sx={{
            mr: 3,
            fontWeight: 600,
          }}
        >
          {username}
        </Typography>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{
            borderRadius: 2,
          }}
        >
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;