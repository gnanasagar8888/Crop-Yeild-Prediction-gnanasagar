import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#2E7D32",
          color: "white",
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            🌾 SmartYield
          </Typography>

          <Typography variant="body2">
            Admin Panel
          </Typography>
        </Box>
      </Toolbar>

      <List>

        <ListItemButton onClick={() => navigate("/admin")}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/admin/users")}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/admin/predictions")}>
          <ListItemIcon>
            <AgricultureIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Predictions" />
        </ListItemButton>

        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}

export default AdminSidebar;