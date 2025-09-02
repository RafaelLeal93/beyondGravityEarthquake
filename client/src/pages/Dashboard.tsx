import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Paper,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { AccountCircle, Logout, Refresh } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@apollo/client";
import { EARTHQUAKES_QUERY } from "../graphql/queries";
import EarthquakeMap from "../components/EarthquakeMap";
import EarthquakeChart from "../components/EarthquakeChart";
import EarthquakeList from "../components/EarthquakeList";
import { Earthquake } from "../types";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedEarthquake, setSelectedEarthquake] =
    useState<Earthquake | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data, loading, error, refetch } = useQuery(EARTHQUAKES_QUERY);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleEarthquakeSelect = (earthquake: Earthquake) => {
    setSelectedEarthquake(earthquake);
  };

  const earthquakes = data?.earthquakes?.features || [];
  const latestEarthquake = earthquakes[0];

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            🌍 Earthquake Monitoring Dashboard
          </Typography>
          <Box flexGrow={1} />
          <Chip
            label={`${earthquakes.length} earthquakes`}
            color="secondary"
            size="small"
          />
          <IconButton
            color="inherit"
            onClick={handleRefresh}
            title="Refresh data"
            disabled={loading}
          >
            <Refresh />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            title="User menu"
          >
            <AccountCircle />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              <Typography variant="body2">
                {user?.username} ({user?.role})
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <EarthquakeMap
              earthquakes={earthquakes}
              selectedEarthquake={selectedEarthquake}
              onEarthquakeSelect={handleEarthquakeSelect}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper>
                  <Box px={2} py={1}>
                    <Typography variant="h6" gutterBottom>
                      Magnitude Over Time
                    </Typography>
                  </Box>
                  <Box height="300px">
                    <EarthquakeChart earthquakes={earthquakes} />
                  </Box>
                </Paper>
              </Grid>

              {latestEarthquake && (
                <Grid item xs={12}>
                  <Paper>
                    <Box px={2} py={1}>
                      <Typography variant="h6" gutterBottom>
                        Latest Earthquake
                      </Typography>
                      <Box>
                        <Typography variant="body2">
                          <strong>Magnitude:</strong>{" "}
                          {latestEarthquake.magnitude}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Location:</strong> {latestEarthquake.place}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Time:</strong>{" "}
                          {new Date(latestEarthquake.time).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              )}

              {/* Earthquake List */}
              <Grid item xs={12}>
                <Paper>
                  <Box px={2} py={1}>
                    <Typography variant="h6" gutterBottom>
                      Recent Earthquakes
                    </Typography>
                  </Box>
                  <Box overflow="auto" maxHeight="500px">
                    <EarthquakeList
                      earthquakes={earthquakes}
                      onEarthquakeSelect={handleEarthquakeSelect}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Box p={2}>
          <Typography color="error" variant="h6">
            Error loading earthquake data: {error.message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
