import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { Earthquake } from "../types";

interface EarthquakeChartProps {
  earthquakes: Earthquake[];
}

const EarthquakeChart: React.FC<EarthquakeChartProps> = ({ earthquakes }) => {
  // Process data for the chart - group by day and show average magnitude
  const processChartData = () => {
    const dataMap = new Map<
      string,
      { count: number; totalMagnitude: number }
    >();

    earthquakes.forEach((earthquake) => {
      const date = new Date(earthquake.time).toISOString().split("T")[0];
      const existing = dataMap.get(date) || { count: 0, totalMagnitude: 0 };
      dataMap.set(date, {
        count: existing.count + 1,
        totalMagnitude: existing.totalMagnitude + earthquake.magnitude,
      });
    });

    return Array.from(dataMap.entries())
      .map(([date, data]) => ({
        date,
        magnitude: data.totalMagnitude / data.count,
        count: data.count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30); // Last 30 days
  };

  const chartData = processChartData();

  if (chartData.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="body2" color="text.secondary">
          No data available for chart
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="date"
            stroke="#fff"
            fontSize={12}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis
            stroke="#fff"
            fontSize={12}
            domain={["dataMin - 0.5", "dataMax + 0.5"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #444",
              borderRadius: "4px",
              color: "#fff",
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: number, name: string) => [
              value.toFixed(2),
              name === "magnitude" ? "Avg Magnitude" : name,
            ]}
          />
          <Line
            type="monotone"
            dataKey="magnitude"
            stroke="#1976d2"
            strokeWidth={2}
            dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#1976d2", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EarthquakeChart;
