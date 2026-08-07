import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import UserTable from "../components/UserTable";
import PredictionTable from "../components/PredictionTable";
import EditUserDialog from "../components/EditUserDialog";

import API from "../services/apiService";

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const statsRes =
        await API.get("/admin/stats");

      const usersRes =
        await API.get("/admin/users");

      const predictionRes =
        await API.get("/admin/predictions");

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setPredictions(predictionRes.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleEdit = (user) => {

    setSelectedUser(user);

    setOpenDialog(true);

  };

  const handleSave = async (data) => {

    try {

      await API.put(
        `/admin/users/${selectedUser._id}`,
        data
      );

      setMessage("User Updated Successfully");
      setSeverity("success");

      setOpenDialog(false);

      loadDashboard();

    } catch {

      setMessage("Update Failed");
      setSeverity("error");

    }

  };

  const handleDeleteUser = async (id) => {

    if (!window.confirm("Delete User?"))
      return;

    await API.delete(`/admin/users/${id}`);

    setMessage("User Deleted");
    setSeverity("success");

    loadDashboard();

  };

  const handleDeletePrediction = async (id) => {

    if (!window.confirm("Delete Prediction?"))
      return;

    await API.delete(`/admin/predictions/${id}`);

    setMessage("Prediction Deleted");
    setSeverity("success");

    loadDashboard();

  };

  if (!stats) {

    return (

      <>
        <Sidebar />

        <Box
          sx={{
            ml: "240px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            bgcolor: "#F4F7FC",
          }}
        >
          <CircularProgress size={60}/>
        </Box>

      </>

    );

  }
    return (

    <>

      <Sidebar />

      <Box
        sx={{
          ml: "240px",
          p: 4,
          bgcolor: "#F4F7FC",
          minHeight: "100vh",
        }}
      >

        {/* Header */}

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 5,
            mb: 4,
            background:
              "linear-gradient(135deg,#1B5E20,#2E7D32,#4CAF50)",
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
              opacity: .9,
              fontSize: 18,
            }}
          >
            {localStorage.getItem("username")}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              opacity: .85,
            }}
          >
            Monitor users, predictions and overall
            SmartYield system performance from one place.
          </Typography>

        </Paper>

        {/* Dashboard Cards */}

        <Grid
          container
          spacing={3}
          sx={{ mb: 4 }}
        >

          <Grid item xs={12} sm={6} lg={3}>

            <DashboardCard
              title="Farmers"
              value={stats.farmers}
              color="#43A047"
            />

          </Grid>

          <Grid item xs={12} sm={6} lg={3}>

            <DashboardCard
              title="Researchers"
              value={stats.researchers}
              color="#1E88E5"
            />

          </Grid>

          <Grid item xs={12} sm={6} lg={3}>

            <DashboardCard
              title="Admins"
              value={stats.admins}
              color="#FB8C00"
            />

          </Grid>

          <Grid item xs={12} sm={6} lg={3}>

            <DashboardCard
              title="Predictions"
              value={stats.predictions}
              color="#8E24AA"
            />

          </Grid>

        </Grid>

        {/* User Management */}

        <Paper
          sx={{
            p: 3,
            borderRadius: 5,
            mb: 4,
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
          >
            👥 User Management
          </Typography>

          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
          />

        </Paper>

        {/* Prediction Management */}

        <Paper
          sx={{
            p: 3,
            borderRadius: 5,
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
          >
            🌾 Prediction History
          </Typography>

          <PredictionTable
            predictions={predictions}
            onDelete={handleDeletePrediction}
          />

        </Paper>
                {/* Edit User Dialog */}

        <EditUserDialog
          open={openDialog}
          user={selectedUser}
          onClose={() => setOpenDialog(false)}
          onSave={handleSave}
        />

        {/* Notification */}

        <Snackbar
          open={message !== ""}
          autoHideDuration={3000}
          onClose={() => setMessage("")}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            severity={severity}
            variant="filled"
            onClose={() => setMessage("")}
            sx={{
              width: "100%",
              borderRadius: 3,
            }}
          >
            {message}
          </Alert>
        </Snackbar>

      </Box>

    </>

  );

}

export default AdminDashboard;