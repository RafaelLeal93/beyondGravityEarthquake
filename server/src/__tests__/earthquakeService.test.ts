import { fetchEarthquakeData } from "../services/earthquakeService";

// Mock fetch globally
global.fetch = jest.fn();

describe("earthquakeService", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe("fetchEarthquakeData", () => {
    it("should fetch earthquake data successfully", async () => {
      const mockData = {
        type: "FeatureCollection",
        metadata: {
          generated: "2023-01-01T00:00:00.000Z",
          url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson",
          title: "USGS Significant Earthquakes, Past Month",
          status: 200,
          api: "1.10.3",
          count: 1,
        },
        features: [
          {
            type: "Feature",
            properties: {
              mag: 6.5,
              place: "Test Location",
              time: 1640995200000,
              updated: 1640995800000,
              tz: -480,
              url: "https://example.com",
              detail: "https://example.com/detail",
              felt: 100,
              cdi: 7.0,
              mmi: 6.0,
              alert: "green",
              status: "reviewed",
              tsunami: 0,
              sig: 100,
              net: "us",
              code: "12345678",
              ids: "us12345678",
              sources: "us",
              types: "origin,phase-data",
              nst: 50,
              dmin: 0.5,
              rms: 0.8,
              gap: 20,
              magType: "mw",
              type: "earthquake",
              title: "M 6.5 - Test Location",
            },
            geometry: {
              type: "Point",
              coordinates: [-122.0, 37.0, 10.0],
            },
            id: "us12345678",
          },
        ],
        bbox: [-180, -90, 180, 90],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchEarthquakeData({ limit: 10 });

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("significant_month.geojson")
      );
      expect(result.type).toBe(mockData.type);
      expect(result.metadata).toEqual(mockData.metadata);
      expect(result.features).toHaveLength(1);
      expect(result.features[0].id).toBe("us12345678");
      expect(result.features[0].magnitude).toBe(6.5);
      expect(result.features[0].place).toBe("Test Location");
    });

    it("should handle API errors", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(fetchEarthquakeData()).rejects.toThrow(
        "USGS API error: 500 Internal Server Error"
      );
    });
  });
});
