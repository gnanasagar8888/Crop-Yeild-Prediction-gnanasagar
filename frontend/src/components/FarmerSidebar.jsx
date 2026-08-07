import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SpaIcon from "@mui/icons-material/Spa";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

function FarmerSidebar() {

  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  const menuItems = [

    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/farmer",
    },

    {
      text: "Predict Yield",
      icon: <AgricultureIcon />,
      path: "/farmer",
    },

    {
      text: "Prediction History",
      icon: <HistoryIcon />,
      path: "/farmer/history",
    },

    {
      text: "Profile",
      icon: <PersonIcon />,
      path: "/farmer/profile",
    },

  ];

  return (

    <Drawer

      variant="permanent"

      sx={{

        width: drawerWidth,

        flexShrink: 0,

        "& .MuiDrawer-paper": {

          width: drawerWidth,

          background:
            "linear-gradient(180deg,#1B5E20,#2E7D32)",

          color: "white",

          border: "none",

        },

      }}

    >

      <Toolbar>

        <Box>

          <Box

            sx={{

              display: "flex",

              alignItems: "center",

            }}

          >

            <SpaIcon

              sx={{

                fontSize: 38,

                mr: 1,

              }}

            />

            <Typography

              variant="h5"

              fontWeight="bold"

            >

              SmartYield

            </Typography>

          </Box>

          <Typography

            variant="body2"

            sx={{

              mt: 1,

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
          flexGrow: 1,
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 3,
              mb: 1,

              "&.Mui-selected": {
                bgcolor: "#66BB6A",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,.25)",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#81C784",
              },

              "&:hover": {
                bgcolor: "rgba(255,255,255,.12)",
                transform: "translateX(6px)",
                transition: ".3s",
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
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider
        sx={{
          bgcolor: "rgba(255,255,255,.2)",
        }}
      />

      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            opacity: .8,
            mb: 2,
          }}
        >
          Logged in as
        </Typography>

        <Typography
          fontWeight="bold"
          sx={{
            mb: 2,
          }}
        >
          {localStorage.getItem("username")}
        </Typography>

        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 3,

            "&:hover": {
              bgcolor: "#D32F2F",
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
      </Box>

    </Drawer>

  );

}

export default FarmerSidebar;