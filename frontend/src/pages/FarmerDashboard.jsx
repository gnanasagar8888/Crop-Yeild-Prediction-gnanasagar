import {
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import DashboardCard from "../components/DashboardCard";
import PredictionForm from "../components/PredictionForm";
import FarmerSidebar from "../components/FarmerSidebar";

function FarmerDashboard() {

  return (

    <>

      <FarmerSidebar />

      <Box
        sx={{
          ml: "250px",
          p: 4,
          bgcolor: "#F4F7FC",
          minHeight: "100vh",
        }}
      >

        {/* Welcome Banner */}

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#2E7D32,#43A047,#66BB6A)",
            color: "white",
          }}
        >

          <Typography
            variant="h3"
            fontWeight="bold"
          >
            Welcome Back 👋
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 18,
              opacity: .9,
            }}
          >
            {localStorage.getItem("username")}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              opacity: .9,
            }}
          >
            Predict crop yield using Artificial Intelligence,
            weather data and soil analysis.
          </Typography>

        </Paper>

        {/* Dashboard Cards */}

        <Grid
          container
          spacing={3}
          sx={{
            mb: 4,
          }}
        >        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="AI Ready"
            value="100%"
            color="#43A047"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Predictions"
            value="Unlimited"
            color="#1E88E5"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Accuracy"
            value="95%"
            color="#FB8C00"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Status"
            value="Online"
            color="#8E24AA"
          />
        </Grid>

        </Grid>

        {/* Prediction Section */}

        <Paper
          elevation={3}
          sx={{
            borderRadius: 5,
            p: 4,
            mb: 4,
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            🌾 AI Crop Yield Prediction
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            Enter your crop, soil, fertilizer and weather
            information to generate an AI-powered crop yield prediction.
          </Typography>

          <PredictionForm />

        </Paper>

        {/* Tips Card */}

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#E8F5E9,#F1F8E9)",
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            💡 Smart Farming Tips
          </Typography>

          <Typography sx={{ mb: 1 }}>
            • Maintain optimum soil pH between 6.0 and 7.5.
          </Typography>

          <Typography sx={{ mb: 1 }}>
            • Use balanced NPK fertilizer based on soil test reports.
          </Typography>

          <Typography sx={{ mb: 1 }}>
            • Monitor rainfall and irrigation regularly.
          </Typography>

          <Typography sx={{ mb: 1 }}>
            • Rotate crops to improve soil fertility and reduce pests.
          </Typography>

          <Typography>
            • Use AI predictions to optimize farming decisions.
          </Typography>

        </Paper>
              </Box>

    </>

  );

}

export default FarmerDashboard;