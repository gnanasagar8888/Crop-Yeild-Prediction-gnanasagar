import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import ScienceIcon from "@mui/icons-material/Science";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

function ResearcherDashboard() {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          p: 4,
          minHeight: "100vh",
          background: "#F4F6F8",
        }}
      >
        {/* Welcome Banner */}

        <Card
          sx={{
            mb: 4,
            borderRadius: 4,
            background:
              "linear-gradient(135deg,#1565C0,#42A5F5)",
            color: "white",
          }}
        >
          <CardContent>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              🔬 Welcome,
              {" "}
              {localStorage.getItem("username")}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              SmartYield Research Dashboard
            </Typography>

          </CardContent>
        </Card>

        {/* Stats */}

        <Grid container spacing={3}>

          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="Dataset"
              value="Ready"
              color="#1565C0"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="AI Model"
              value="Random Forest"
              color="#2E7D32"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="Accuracy"
              value="98%"
              color="#EF6C00"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="Status"
              value="Online"
              color="#8E24AA"
            />
          </Grid>

        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ mt: 2 }}
        >

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>

                <ScienceIcon
                  color="primary"
                  sx={{ fontSize: 45 }}
                />

                <Typography
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  Research
                </Typography>

                <Typography color="text.secondary">
                  Analyze crop prediction
                  patterns.
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>

                <AnalyticsIcon
                  color="success"
                  sx={{ fontSize: 45 }}
                />

                <Typography
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  Analytics
                </Typography>

                <Typography color="text.secondary">
                  Visualize agricultural
                  insights.
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>

                <AgricultureIcon
                  color="warning"
                  sx={{ fontSize: 45 }}
                />

                <Typography
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  Agriculture
                </Typography>

                <Typography color="text.secondary">
                  Improve farming decisions
                  using AI.
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>

                <QueryStatsIcon
                  color="secondary"
                  sx={{ fontSize: 45 }}
                />

                <Typography
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  Reports
                </Typography>

                <Typography color="text.secondary">
                  Generate future prediction
                  reports.
                </Typography>

              </CardContent>
            </Card>
          </Grid>

        </Grid>

        <Divider sx={{ my: 5 }} />

        <Card sx={{ borderRadius: 4 }}>
          <CardContent>

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Research Module
            </Typography>

            <Typography
              sx={{ mt: 2 }}
              color="text.secondary"
            >
              This dashboard is designed for agricultural researchers
              to analyze crop yield prediction results, evaluate AI
              model performance, and explore datasets for future
              agricultural improvements.
            </Typography>

          </CardContent>
        </Card>

      </Box>
    </>
  );
}

export default ResearcherDashboard;