import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EarthquakeList from "../EarthquakeList";
import { Earthquake } from "../../types";

const mockEarthquakes: Earthquake[] = [
  {
    id: "1",
    magnitude: 6.5,
    place: "Test Location 1",
    time: new Date().toISOString(),
    updated: new Date().toISOString(),
    url: "https://example.com",
    detail: "https://example.com/detail",
    status: "reviewed",
    tsunami: 0,
    sig: 100,
    net: "us",
    code: "12345678",
    ids: "us12345678",
    sources: "us",
    types: "origin,phase-data",
    magType: "mw",
    type: "earthquake",
    title: "M 6.5 - Test Location 1",
    geometry: {
      type: "Point",
      coordinates: [-122.0, 37.0, 10.0],
    },
    properties: {
      mag: 6.5,
      place: "Test Location 1",
      time: new Date().toISOString(),
      updated: new Date().toISOString(),
      url: "https://example.com",
      detail: "https://example.com/detail",
      status: "reviewed",
      tsunami: 0,
      sig: 100,
      net: "us",
      code: "12345678",
      ids: "us12345678",
      sources: "us",
      types: "origin,phase-data",
      magType: "mw",
      type: "earthquake",
      title: "M 6.5 - Test Location 1",
    },
  },
  {
    id: "2",
    magnitude: 4.2,
    place: "Test Location 2",
    time: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated: new Date().toISOString(),
    url: "https://example.com",
    detail: "https://example.com/detail",
    status: "reviewed",
    tsunami: 0,
    sig: 50,
    net: "us",
    code: "87654321",
    ids: "us87654321",
    sources: "us",
    types: "origin,phase-data",
    magType: "ml",
    type: "earthquake",
    title: "M 4.2 - Test Location 2",
    geometry: {
      type: "Point",
      coordinates: [-120.0, 35.0, 5.0],
    },
    properties: {
      mag: 4.2,
      place: "Test Location 2",
      time: new Date(Date.now() - 3600000).toISOString(),
      updated: new Date().toISOString(),
      url: "https://example.com",
      detail: "https://example.com/detail",
      status: "reviewed",
      tsunami: 0,
      sig: 50,
      net: "us",
      code: "87654321",
      ids: "us87654321",
      sources: "us",
      types: "origin,phase-data",
      magType: "ml",
      type: "earthquake",
      title: "M 4.2 - Test Location 2",
    },
  },
];

describe("EarthquakeList", () => {
  const mockOnEarthquakeSelect = jest.fn();

  beforeEach(() => {
    mockOnEarthquakeSelect.mockClear();
  });

  it("renders earthquake list correctly", () => {
    render(
      <EarthquakeList
        earthquakes={mockEarthquakes}
        onEarthquakeSelect={mockOnEarthquakeSelect}
      />
    );

    expect(screen.getByText("Test Location 1")).toBeInTheDocument();
    expect(screen.getByText("Test Location 2")).toBeInTheDocument();
    expect(screen.getByText("M6.5")).toBeInTheDocument();
    expect(screen.getByText("M4.2")).toBeInTheDocument();
  });

  it("calls onEarthquakeSelect when earthquake is clicked", () => {
    render(
      <EarthquakeList
        earthquakes={mockEarthquakes}
        onEarthquakeSelect={mockOnEarthquakeSelect}
      />
    );

    fireEvent.click(screen.getByText("Test Location 1"));
    expect(mockOnEarthquakeSelect).toHaveBeenCalledWith(mockEarthquakes[0]);
  });

  it("displays correct time format", () => {
    render(
      <EarthquakeList
        earthquakes={mockEarthquakes}
        onEarthquakeSelect={mockOnEarthquakeSelect}
      />
    );

    expect(screen.getByText("1h ago")).toBeInTheDocument();
  });

  it("shows no earthquakes message when list is empty", () => {
    render(
      <EarthquakeList
        earthquakes={[]}
        onEarthquakeSelect={mockOnEarthquakeSelect}
      />
    );

    expect(screen.getByText("No earthquakes to display")).toBeInTheDocument();
  });
});
