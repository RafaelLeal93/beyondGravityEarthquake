// This file is for client-side utility functions
// The actual earthquake service is on the server side

export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return "#d32f2f"; // Red
  if (magnitude >= 6) return "#f57c00"; // Orange
  if (magnitude >= 5) return "#fbc02d"; // Yellow
  if (magnitude >= 4) return "#689f38"; // Green
  return "#1976d2"; // Blue
};

export const formatTimeAgo = (timeString: string): string => {
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

export const getMagnitudeSeverity = (
  magnitude: number
): "low" | "moderate" | "high" | "severe" => {
  if (magnitude >= 7) return "severe";
  if (magnitude >= 6) return "high";
  if (magnitude >= 5) return "moderate";
  return "low";
};
