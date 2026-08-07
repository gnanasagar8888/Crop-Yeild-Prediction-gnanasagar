import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  Stack,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import GoogleIcon from "@mui/icons-material/Google";

import API from "../services/apiService";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    setMessage("");

    if (!username || !password) {

      setMessage("Please enter username and password");

      return;

    }

    try {

      const response = await API.post("/login", {
        username,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      if (response.data.role === "admin") {

        navigate("/admin");

      }

      else if (
        response.data.role === "farmer"
      ) {

        navigate("/farmer");

      }

      else {

        navigate("/researcher");

      }

    }

    catch (err) {

      setMessage(

        err.response?.data?.detail ||

        "Invalid username or password"

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

        p: 2,

      }}

    >

      <Paper

        elevation={15}

        sx={{

          width: 450,

          p: 5,

          borderRadius: 5,

          background:

            "rgba(255,255,255,0.96)",

          backdropFilter: "blur(10px)",

        }}

      >

        <Box textAlign="center">

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

            sx={{

              mt: 1,

              mb: 4,

            }}

          >

            AI Powered Crop Yield Prediction

          </Typography>

        </Box>

        <Stack spacing={2}>
                    <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message && (
            <Alert severity="error">
              {message}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: 16,
              background:
                "linear-gradient(90deg,#2E7D32,#43A047)",

              "&:hover": {
                background:
                  "linear-gradient(90deg,#1B5E20,#2E7D32)",
              },
            }}
          >
            Login
          </Button>

          <Divider>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.4,
              borderRadius: 3,
              fontWeight: "bold",
            }}
          >
            Continue with Google
          </Button>

          <Typography
            textAlign="center"
            sx={{
              mt: 2,
            }}
          >
            Don't have an account?

            <Link
              to="/register"
              style={{
                marginLeft: 6,
                color: "#2E7D32",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register
            </Link>

          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              mt: 2,
              color: "gray",
            }}
          >
            © 2026 SmartYield
            <br />
            AI Powered Crop Yield Prediction
          </Typography>

        </Stack>

      </Paper>

    </Box>

  );
}

export default Login;