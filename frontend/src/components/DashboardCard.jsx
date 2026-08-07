import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleIcon from "@mui/icons-material/People";
import ScienceIcon from "@mui/icons-material/Science";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StorageIcon from "@mui/icons-material/Storage";

function DashboardCard({
  title,
  value,
  color,
}) {

  const getIcon = () => {

    switch (title) {

      case "Farmers":
        return <AgricultureIcon sx={{ fontSize: 45 }} />;

      case "Researchers":
        return <ScienceIcon sx={{ fontSize: 45 }} />;

      case "Admins":
        return <PeopleIcon sx={{ fontSize: 45 }} />;

      case "Predictions":
        return <TrendingUpIcon sx={{ fontSize: 45 }} />;

      default:
        return <StorageIcon sx={{ fontSize: 45 }} />;

    }

  };

  return (

    <Card
      elevation={8}
      sx={{

        borderRadius: 5,

        overflow: "hidden",

        cursor: "pointer",

        transition: ".35s",

        background:
          "linear-gradient(135deg,#ffffff,#F8FAFC)",

        "&:hover": {

          transform: "translateY(-8px)",

          boxShadow: "0 18px 40px rgba(0,0,0,.18)",

        },

      }}
    >

      <CardContent>

        <Box

          sx={{

            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

          }}

        >

          <Box>

            <Typography

              sx={{

                color: "#777",

                fontWeight: 600,

                fontSize: 15,

              }}

            >

              {title}

            </Typography>

            <Typography

              variant="h3"

              sx={{

                fontWeight: "bold",

                mt: 1,

              }}

            >

              {value}

            </Typography>

          </Box>
                    <Box
            sx={{
              width: 75,
              height: 75,
              borderRadius: "20px",
              background: `linear-gradient(135deg, ${color}, ${color}CC)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              boxShadow: `0 12px 25px ${color}55`,
            }}
          >
            {getIcon()}
          </Box>

        </Box>

        <Box
          sx={{
            mt: 3,
            height: 6,
            borderRadius: 5,
            background: "#ECEFF1",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 5,
              background: `linear-gradient(90deg, ${color}, ${color}AA)`,
            }}
          />
        </Box>

      </CardContent>

    </Card>

  );

}

export default DashboardCard;