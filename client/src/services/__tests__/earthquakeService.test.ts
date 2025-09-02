import { transformEarthquake } from "../earthquakeService";

describe("earthquakeService", () => {
  describe("transformEarthquake", () => {
    it("transforms USGS earthquake data correctly", () => {
      const mockUSGSData = {
        id: "us12345678",
        properties: {
          mag: 6.5,
          place: "Test Location",
          time: 1640995200000, // Unix timestamp
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
      };

      const result = transformEarthquake(mockUSGSData);

      expect(result.id).toBe("us12345678");
      expect(result.magnitude).toBe(6.5);
      expect(result.place).toBe("Test Location");
      expect(result.geometry.coordinates).toEqual([-122.0, 37.0, 10.0]);
      expect(result.properties.mag).toBe(6.5);
    });

    it("handles missing optional fields", () => {
      const mockUSGSData = {
        id: "us12345678",
        properties: {
          mag: 4.0,
          place: "Test Location",
          time: 1640995200000,
          updated: 1640995800000,
          url: "https://example.com",
          detail: "https://example.com/detail",
          status: "automatic",
          tsunami: 0,
          sig: 50,
          net: "us",
          code: "12345678",
          ids: "us12345678",
          sources: "us",
          types: "origin",
          magType: "ml",
          type: "earthquake",
          title: "M 4.0 - Test Location",
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0, 37.0],
        },
      };

      const result = transformEarthquake(mockUSGSData);

      expect(result.felt).toBeUndefined();
      expect(result.cdi).toBeUndefined();
      expect(result.mmi).toBeUndefined();
      expect(result.alert).toBeUndefined();
      expect(result.nst).toBeUndefined();
      expect(result.dmin).toBeUndefined();
      expect(result.rms).toBeUndefined();
      expect(result.gap).toBeUndefined();
    });
  });
});
