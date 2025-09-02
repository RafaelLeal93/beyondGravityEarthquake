import React, { useState, useEffect } from "react";
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
import {
  AccountCircle,
  Logout,
  Refresh,
  FilterList,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useQuery, useSubscription } from "@apollo/client";
import {
  EARTHQUAKES_QUERY,
  EARTHQUAKE_UPDATES_SUBSCRIPTION,
} from "../graphql/queries";
import EarthquakeMap from "../components/EarthquakeMap";
import EarthquakeChart from "../components/EarthquakeChart";
import EarthquakeList from "../components/EarthquakeList";
import EarthquakeFilters from "../components/EarthquakeFilters";
import { Earthquake } from "../types";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedEarthquake, setSelectedEarthquake] =
    useState<Earthquake | null>(null);
  const [filters, setFilters] = useState({
    minMagnitude: 0,
    maxMagnitude: 10,
    limit: 100,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading, error, refetch } = useQuery(EARTHQUAKES_QUERY, {
    variables: filters,
    pollInterval: 60000, // Poll every minute
  });

  // Subscribe to real-time updates
  const { data: subscriptionData } = useSubscription(
    EARTHQUAKE_UPDATES_SUBSCRIPTION
  );

  useEffect(() => {
    if (subscriptionData?.earthquakeUpdates) {
      // Handle real-time earthquake updates
      console.log("New earthquake update:", subscriptionData.earthquakeUpdates);
    }
  }, [subscriptionData]);

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

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const earthquakes = data?.earthquakes?.features || [];
  const latestEarthquake = earthquakes[0];

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🌍 Earthquake Monitoring Dashboard
          </Typography>

          <Chip
            label={`${earthquakes.length} earthquakes`}
            color="secondary"
            size="small"
            sx={{ mr: 2 }}
          />

          <IconButton
            color="inherit"
            onClick={() => setShowFilters(!showFilters)}
            title="Toggle filters"
          >
            <FilterList />
          </IconButton>

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
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Filters Panel */}
      {showFilters && (
        <Paper sx={{ p: 2, m: 1 }}>
          <EarthquakeFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </Paper>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 1, overflow: "hidden" }}>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          {/* Left Panel - Map */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ height: "100%", p: 1 }}>
              <EarthquakeMap
                earthquakes={earthquakes}
                selectedEarthquake={selectedEarthquake}
                onEarthquakeSelect={handleEarthquakeSelect}
              />
            </Paper>
          </Grid>

          {/* Right Panel - Charts and List */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={1} sx={{ height: "100%" }}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper sx={{ height: "50%", p: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Magnitude Over Time
                  </Typography>
                  <EarthquakeChart earthquakes={earthquakes} />
                </Paper>
              </Grid>

              {/* Latest Earthquake Info */}
              {latestEarthquake && (
                <Grid item xs={12}>
                  <Paper sx={{ height: "25%", p: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Latest Earthquake
                    </Typography>
                    <Box>
                      <Typography variant="body2">
                        <strong>Magnitude:</strong> {latestEarthquake.magnitude}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Location:</strong> {latestEarthquake.place}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Time:</strong>{" "}
                        {new Date(latestEarthquake.time).toLocaleString()}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              )}

              {/* Earthquake List */}
              <Grid item xs={12}>
                <Paper sx={{ height: "25%", p: 1, overflow: "auto" }}>
                  <Typography variant="h6" gutterBottom>
                    Recent Earthquakes
                  </Typography>
                  <EarthquakeList
                    earthquakes={earthquakes.slice(0, 5)}
                    onEarthquakeSelect={handleEarthquakeSelect}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Error Display */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Typography color="error">
            Error loading earthquake data: {error.message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
