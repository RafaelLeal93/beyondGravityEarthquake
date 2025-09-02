import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { Earthquake } from "../types";

interface EarthquakeListProps {
  earthquakes: Earthquake[];
  onEarthquakeSelect: (earthquake: Earthquake) => void;
}

const EarthquakeList: React.FC<EarthquakeListProps> = ({
  earthquakes,
  onEarthquakeSelect,
}) => {
  const getMagnitudeColor = (
    magnitude: number
  ):
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" => {
    if (magnitude >= 7) return "error";
    if (magnitude >= 6) return "warning";
    if (magnitude >= 5) return "info";
    if (magnitude >= 4) return "success";
    return "default";
  };

  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return `${Math.round(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.round(diffInHours)}h ago`;
    } else {
      return `${Math.round(diffInHours / 24)}d ago`;
    }
  };

  if (earthquakes.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="body2" color="text.secondary">
          No earthquakes to display
        </Typography>
      </Box>
    );
  }

  return (
    <List dense sx={{ height: "100%", overflow: "auto" }}>
      {earthquakes.map((earthquake) => (
        <ListItem key={earthquake.id} disablePadding>
          <ListItemButton
            onClick={() => onEarthquakeSelect(earthquake)}
            sx={{ py: 0.5 }}
          >
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    label={`M${earthquake.magnitude}`}
                    size="small"
                    color={getMagnitudeColor(earthquake.magnitude)}
                    variant="outlined"
                  />
                  <Typography variant="body2" noWrap sx={{ flexGrow: 1 }}>
                    {earthquake.place}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {formatTime(earthquake.time)}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default EarthquakeList;
