import React from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const WebSocketDashboard: React.FC = () => {
  const { data, error, isConnected, connectionStatus, sendMessage } =
    useWebSocket("ws://localhost:4000/earthquakes-ws");

  const handleRequestData = () => {
    sendMessage({ type: "REQUEST_DATA" });
  };

  const handlePing = () => {
    sendMessage({ type: "PING" });
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h6">WebSocket Earthquake Dashboard</Typography>
        <Chip
          label={isConnected ? "Connected" : "Disconnected"}
          color={isConnected ? "success" : "error"}
          size="small"
        />
        <Chip
          label={connectionStatus}
          color={connectionStatus === "connected" ? "success" : "default"}
          size="small"
        />
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <Button
          variant="outlined"
          onClick={handleRequestData}
          disabled={!isConnected}
        >
          Request Data
        </Button>
        <Button variant="outlined" onClick={handlePing} disabled={!isConnected}>
          Ping Server
        </Button>
      </Box>

      {error && (
        <Typography color="error" mb={2}>
          Error: {error}
        </Typography>
      )}

      {!data && !error && connectionStatus === "connecting" && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      {data && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" mb={2}>
                Earthquakes ({data.features?.length || 0})
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Last updated: {new Date().toLocaleString()}
              </Typography>
              {data.features?.slice(0, 5).map((earthquake: any) => (
                <Box
                  key={earthquake.id}
                  p={1}
                  border="1px solid #e0e0e0"
                  mb={1}
                  borderRadius={1}
                >
                  <Typography variant="body2">
                    <strong>M{earthquake.magnitude}</strong> -{" "}
                    {earthquake.place}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(earthquake.time).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default WebSocketDashboard;
