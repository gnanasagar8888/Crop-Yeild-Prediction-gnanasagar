import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleIcon from "@mui/icons-material/People";
import ScienceIcon from "@mui/icons-material/Science";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {

  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  const role = localStorage.getItem("role");

  const menu = [];

  if (role === "admin") {

    menu.push(
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/admin",
      },
      {
        text: "Users",
        icon: <PeopleIcon />,
        path: "/admin",
      },
      {
        text: "Predictions",
        icon: <AgricultureIcon />,
        path: "/admin",
      },
      {
        text: "Analytics",
        icon: <BarChartIcon />,
        path: "/admin",
      }
    );

  }

  if (role === "farmer") {

    menu.push(
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/farmer",
      },
      {
        text: "Predict Yield",
        icon: <AgricultureIcon />,
        path: "/farmer",
      }
    );

  }

  if (role === "researcher") {

    menu.push(
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/researcher",
      },
      {
        text: "Research",
        icon: <ScienceIcon />,
        path: "/researcher",
      }
    );

  }

  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#1B5E20",
          color: "white",
          border: "none",
        },
      }}
    >

      <Toolbar>

        <Box>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            🌾 SmartYield
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: .8,
            }}
          >
            AI Crop Prediction
          </Typography>

        </Box>

      </Toolbar>

      <Divider
        sx={{
          bgcolor: "rgba(255,255,255,.2)",
        }}
      />      <List
        sx={{
          mt: 2,
          px: 1,
        }}
      >
        {menu.map((item) => (

          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,

              "&.Mui-selected": {
                bgcolor: "#66BB6A",
                color: "white",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#81C784",
              },

              "&:hover": {
                bgcolor: "rgba(255,255,255,.12)",
              },
            }}
          >

            <ListItemIcon
              sx={{
                color: "white",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />

          </ListItemButton>

        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider
        sx={{
          bgcolor: "rgba(255,255,255,.2)",
        }}
      />

      <List sx={{ p: 1 }}>

        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 2,

            "&:hover": {
              bgcolor: "#C62828",
            },
          }}
        >

          <ListItemIcon
            sx={{
              color: "white",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
          />

        </ListItemButton>

      </List>

    </Drawer>

  );

}

export default Sidebar;