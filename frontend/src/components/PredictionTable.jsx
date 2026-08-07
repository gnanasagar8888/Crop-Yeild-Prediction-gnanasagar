import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function PredictionTable({
  predictions,
  onDelete,
}) {
  return (
    <Paper
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: "bold",
        }}
      >
        🌾 Prediction History
      </Typography>

      <TableContainer>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>Crop</b></TableCell>
              <TableCell><b>Season</b></TableCell>
              <TableCell><b>State</b></TableCell>
              <TableCell><b>Yield</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {predictions.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No Predictions Found
                </TableCell>

              </TableRow>

            ) : (

              predictions.map((prediction) => (

                <TableRow
                  hover
                  key={prediction._id}
                >

                  <TableCell>
                    {prediction.crop}
                  </TableCell>

                  <TableCell>
                    {prediction.season}
                  </TableCell>

                  <TableCell>
                    {prediction.state}
                  </TableCell>

                  <TableCell>
                    <b>
                      {prediction.predicted_yield}
                    </b>
                  </TableCell>

                  <TableCell>
                    {prediction.created_at
                      ? new Date(
                          prediction.created_at
                        ).toLocaleString()
                      : "-"}
                  </TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="error"
                      onClick={() =>
                        onDelete(prediction._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PredictionTable;