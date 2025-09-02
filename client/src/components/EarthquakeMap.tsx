import React, { useRef, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Earthquake } from "../types";

// You'll need to set your Mapbox access token
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  selectedEarthquake: Earthquake | null;
  onEarthquakeSelect: (earthquake: Earthquake) => void;
}

const EarthquakeMap: React.FC<EarthquakeMapProps> = ({
  earthquakes,
  selectedEarthquake,
  onEarthquakeSelect,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 0],
      zoom: 2,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    // Handle window resize
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Add new markers
    earthquakes.forEach((earthquake) => {
      const [lng, lat] = earthquake.geometry.coordinates;

      // Create a custom marker based on magnitude
      const markerElement = document.createElement("div");
      markerElement.className = "earthquake-marker";
      markerElement.style.width = `${Math.max(
        8,
        Math.min(30, earthquake.magnitude * 4)
      )}px`;
      markerElement.style.height = `${Math.max(
        8,
        Math.min(30, earthquake.magnitude * 4)
      )}px`;
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = getMagnitudeColor(
        earthquake.magnitude
      );
      markerElement.style.border = "2px solid white";
      markerElement.style.cursor = "pointer";
      markerElement.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([lng, lat])
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        onEarthquakeSelect(earthquake);
      });

      markers.current.push(marker);
    });

    // Fit map to show all earthquakes
    if (earthquakes.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      earthquakes.forEach((earthquake) => {
        const [lng, lat] = earthquake.geometry.coordinates;
        bounds.extend([lng, lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }

    // Ensure map is properly sized after adding markers
    setTimeout(() => {
      if (map.current) {
        map.current.resize();
      }
    }, 100);
  }, [earthquakes, onEarthquakeSelect]);

  useEffect(() => {
    if (!map.current || !selectedEarthquake) return;

    const [lng, lat] = selectedEarthquake.geometry.coordinates;
    map.current.flyTo({
      center: [lng, lat],
      zoom: 8,
      essential: true,
    });
  }, [selectedEarthquake]);

  const getMagnitudeColor = (magnitude: number): string => {
    if (magnitude >= 7) return "#d32f2f"; // Red
    if (magnitude >= 6) return "#f57c00"; // Orange
    if (magnitude >= 5) return "#fbc02d"; // Yellow
    if (magnitude >= 4) return "#689f38"; // Green
    return "#1976d2"; // Blue
  };

  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === "your_mapbox_access_token_here") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Mapbox Token Required
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Please set your Mapbox access token in the environment variables.
          <br />
          Get your token at: https://account.mapbox.com/access-tokens/
        </Typography>
        <Paper>
          <Typography variant="body2">
            <strong>Demo Data:</strong> {earthquakes.length} earthquakes loaded
            <br />
            <strong>Latest:</strong> {earthquakes[0]?.place} (M
            {earthquakes[0]?.magnitude})
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      ref={mapContainer}
      height="100%"
      width="100%"
      sx={{
        minHeight: "400px",
        "& .mapboxgl-canvas": {
          width: "100% !important",
          height: "100% !important",
        },
      }}
    />
  );
};

export default EarthquakeMap;
