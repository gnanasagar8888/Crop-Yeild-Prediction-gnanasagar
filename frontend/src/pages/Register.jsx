import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Alert,
  Divider,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import ScienceIcon from "@mui/icons-material/Science";

import API from "../services/apiService";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");

    if (!role) {
      setMessage("Please choose a role");
      return;
    }

    if (!username || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await API.post("/register", {
        username,
        email,
        password,
        role,
      });

      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          "Registration failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#1B5E20,#2E7D32,#66BB6A)",
        p: 3,
      }}
    >
      <Paper
        elevation={15}
        sx={{
          width: 700,
          p: 5,
          borderRadius: 5,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <AgricultureIcon
            sx={{
              fontSize: 80,
              color: "#2E7D32",
            }}
          />

          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            SmartYield
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            AI Powered Crop Yield Prediction
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }}>
          Choose Your Role
        </Divider>

        <Grid container spacing={3} sx={{ mb: 4 }}>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                border:
                  role === "farmer"
                    ? "3px solid #2E7D32"
                    : "1px solid #ddd",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                onClick={() => setRole("farmer")}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <AgricultureIcon
                    sx={{
                      fontSize: 65,
                      color: "#2E7D32",
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mt={1}
                  >
                    Farmer
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Predict crop yield using AI and
                    weather, soil and fertilizer data.
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                border:
                  role === "researcher"
                    ? "3px solid #1976D2"
                    : "1px solid #ddd",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                onClick={() =>
                  setRole("researcher")
                }
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <ScienceIcon
                    sx={{
                      fontSize: 65,
                      color: "#1976D2",
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mt={1}
                  >
                    Researcher
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Analyze prediction results and
                    agricultural datasets.
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

        </Grid>
                <TextField
          fullWidth
          label="Username"
          placeholder="Enter Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          placeholder="Enter Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          placeholder="Enter Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        {message && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleRegister}
          sx={{
            mt: 3,
            py: 1.6,
            fontSize: 16,
            fontWeight: "bold",
            borderRadius: 3,
            background:
              "linear-gradient(90deg,#2E7D32,#43A047)",

            "&:hover": {
              background:
                "linear-gradient(90deg,#1B5E20,#2E7D32)",
            },
          }}
        >
          Register
        </Button>

        <Typography
          textAlign="center"
          sx={{ mt: 3 }}
        >
          Already have an account?

          <Link
            to="/"
            style={{
              marginLeft: 5,
              color: "#2E7D32",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>

        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mt: 4,
            color: "gray",
          }}
        >
          © 2026 SmartYield
          <br />
          AI Powered Crop Yield Prediction
        </Typography>

      </Paper>

    </Box>
  );
}

export default Register;