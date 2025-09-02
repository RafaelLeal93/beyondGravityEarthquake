import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { Earthquake } from "../types";

interface EarthquakeChartProps {
  earthquakes: Earthquake[];
}

const EarthquakeChart: React.FC<EarthquakeChartProps> = ({ earthquakes }) => {
  const processChartData = () => {
    const dataMap = new Map<
      string,
      { count: number; totalMagnitude: number; maxMagnitude: number }
    >();

    earthquakes.forEach((earthquake) => {
      const date = new Date(earthquake.time).toISOString().split("T")[0];
      const existing = dataMap.get(date) || {
        count: 0,
        totalMagnitude: 0,
        maxMagnitude: 0,
      };
      dataMap.set(date, {
        count: existing.count + 1,
        totalMagnitude: existing.totalMagnitude + earthquake.magnitude,
        maxMagnitude: Math.max(existing.maxMagnitude, earthquake.magnitude),
      });
    });

    return Array.from(dataMap.entries())
      .map(([date, data]) => ({
        date,
        avgMagnitude: Number((data.totalMagnitude / data.count).toFixed(2)),
        maxMagnitude: data.maxMagnitude,
        count: data.count,
        formattedDate: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
          No earthquake data available for chart
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 60, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="formattedDate"
          stroke="#666"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#666"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          domain={[0, "dataMax + 0.5"]}
          tickFormatter={(value) => `M${value}`}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            color: "#333",
          }}
          labelStyle={{ fontWeight: "bold", marginBottom: "8px" }}
          formatter={(value: number, name: string) => {
            const label =
              name === "avgMagnitude"
                ? "Avg Magnitude"
                : name === "maxMagnitude"
                ? "Max Magnitude"
                : name;
            return [`M${value.toFixed(2)}`, label];
          }}
          labelFormatter={(label) => `Date: ${label}`}
        />

        <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="line" />
        <Line
          type="monotone"
          dataKey="avgMagnitude"
          stroke="#1976d2"
          strokeWidth={3}
          dot={{ fill: "#1976d2", strokeWidth: 2, r: 5 }}
          activeDot={{
            r: 7,
            stroke: "#1976d2",
            strokeWidth: 2,
            fill: "#fff",
          }}
          name="Average Magnitude"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EarthquakeChart;
