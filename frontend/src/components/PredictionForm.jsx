import { useEffect, useState } from "react";

import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import AgricultureIcon from "@mui/icons-material/Agriculture";

import API from "../services/apiService";

function PredictionForm() {

  const [options, setOptions] = useState({
    crops: [],
    seasons: [],
    states: [],
  });

  const [prediction, setPrediction] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({

    crop: "",

    season: "",

    state: "",

    area: "",

    fertilizer: "",

    pesticide: "",

    avg_temp_c: "",

    total_rainfall_mm: "",

    avg_humidity_percent: "",

    N: "",

    P: "",

    K: "",

    pH: "",

  });

  useEffect(() => {

    loadOptions();

  }, []);

  const loadOptions = async () => {

    try {

      const response =
        await API.get("/prediction/options");

      setOptions(response.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handlePredict = async () => {

    setLoading(true);

    setPrediction(null);

    setMessage("");

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.post(

        "/prediction/",

        {

          ...formData,

          area: Number(formData.area),

          fertilizer: Number(formData.fertilizer),

          pesticide: Number(formData.pesticide),

          avg_temp_c:
            Number(formData.avg_temp_c),

          total_rainfall_mm:
            Number(formData.total_rainfall_mm),

          avg_humidity_percent:
            Number(formData.avg_humidity_percent),

          N: Number(formData.N),

          P: Number(formData.P),

          K: Number(formData.K),

          pH: Number(formData.pH),

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      setPrediction(
        response.data.predicted_yield
      );

    }

    catch (err) {

      setMessage(

        err.response?.data?.detail ||

        "Prediction Failed"

      );

    }

    setLoading(false);

  };
  return (

  <Paper
    elevation={0}
    sx={{
      p: 4,
      borderRadius: 4,
      background: "#fff",
    }}
  >

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
      }}
    >
      <PsychologyIcon
        sx={{
          fontSize: 38,
          color: "#2E7D32",
          mr: 2,
        }}
      />

      <Box>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          AI Crop Prediction
        </Typography>

        <Typography color="text.secondary">
          Fill all required information to predict crop yield.
        </Typography>

      </Box>

    </Box>

    <Grid container spacing={3}>

      <Grid item xs={12} md={4}>
        <TextField
          select
          fullWidth
          label="Crop"
          name="crop"
          value={formData.crop}
          onChange={handleChange}
        >
          {options.crops.map((crop) => (
            <MenuItem key={crop} value={crop}>
              {crop}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          select
          fullWidth
          label="Season"
          name="season"
          value={formData.season}
          onChange={handleChange}
        >
          {options.seasons.map((season) => (
            <MenuItem key={season} value={season}>
              {season}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          select
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          {options.states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Area"
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Fertilizer"
          type="number"
          name="fertilizer"
          value={formData.fertilizer}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Pesticide"
          type="number"
          name="pesticide"
          value={formData.pesticide}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Temperature (°C)"
          type="number"
          name="avg_temp_c"
          value={formData.avg_temp_c}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Rainfall (mm)"
          type="number"
          name="total_rainfall_mm"
          value={formData.total_rainfall_mm}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Humidity (%)"
          type="number"
          name="avg_humidity_percent"
          value={formData.avg_humidity_percent}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Nitrogen (N)"
          type="number"
          name="N"
          value={formData.N}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Phosphorus (P)"
          type="number"
          name="P"
          value={formData.P}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Potassium (K)"
          type="number"
          name="K"
          value={formData.K}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Soil pH"
          type="number"
          name="pH"
          value={formData.pH}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>

        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<AgricultureIcon />}
          onClick={handlePredict}
          disabled={loading}
          sx={{
            py: 1.8,
            borderRadius: 3,
            fontSize: 18,
            background:
              "linear-gradient(135deg,#1B5E20,#43A047)",
          }}
        >
          {loading ? (
            <CircularProgress
              size={28}
              color="inherit"
            />
          ) : (
            "Predict Crop Yield"
          )}
        </Button>

      </Grid>

    </Grid>
        {message && (

      <Paper
        elevation={2}
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 3,
          bgcolor: "#FFEBEE",
          border: "1px solid #EF5350",
        }}
      >

        <Typography
          color="error"
          fontWeight="bold"
        >
          {message}
        </Typography>

      </Paper>

    )}

    {prediction !== null && (

      <Paper
        elevation={5}
        sx={{
          mt: 4,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            background:
              "linear-gradient(135deg,#1B5E20,#43A047)",
            color: "white",
            p: 3,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            🌾 AI Prediction Result
          </Typography>

        </Box>

        <Box
          sx={{
            p: 5,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h2"
            fontWeight="bold"
            color="#2E7D32"
          >
            {prediction}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#666",
              fontSize: 18,
            }}
          >
            Predicted Yield
          </Typography>

          <Chip
            icon={<PsychologyIcon />}
            label="Generated using AI Model"
            color="success"
            sx={{
              mt: 3,
              fontSize: 16,
              p: 2,
            }}
          />

          <Box
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              bgcolor: "#F1F8E9",
            }}
          >

            <Typography
              fontWeight="bold"
            >
              Recommendation
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#555",
              }}
            >
              Based on the supplied weather,
              fertilizer and soil conditions,
              this is the estimated crop yield.
              Use this prediction together with
              local agricultural guidance before
              making farming decisions.
            </Typography>

          </Box>

        </Box>

      </Paper>

    )}

  </Paper>

);

}

export default PredictionForm;