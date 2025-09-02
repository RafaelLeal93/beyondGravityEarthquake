import { EarthquakeData, Earthquake } from "../types";

const USGS_API_BASE =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary";

export interface EarthquakeQueryParams {
  startTime?: string;
  endTime?: string;
  minMagnitude?: number;
  maxMagnitude?: number;
  limit?: number;
}

export async function fetchEarthquakeData(
  params: EarthquakeQueryParams = {}
): Promise<EarthquakeData> {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();

    if (params.startTime) queryParams.append("starttime", params.startTime);
    if (params.endTime) queryParams.append("endtime", params.endTime);
    if (params.minMagnitude)
      queryParams.append("minmagnitude", params.minMagnitude.toString());
    if (params.maxMagnitude)
      queryParams.append("maxmagnitude", params.maxMagnitude.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    // Use significant earthquakes (magnitude 4.5+) for better data
    const url = `${USGS_API_BASE}/significant_month.geojson?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `USGS API error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as EarthquakeData;

    // Transform the data to match our schema
    const transformedData: EarthquakeData = {
      ...data,
      features: data.features.map(transformEarthquake),
    };

    return transformedData;
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    throw error;
  }
}

export async function fetchEarthquakeById(
  id: string
): Promise<Earthquake | null> {
  try {
    // For individual earthquake details, we'll use the detail endpoint
    const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${id}.geojson`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(
        `USGS API error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as { features: any[] };

    if (data.features && data.features.length > 0) {
      return transformEarthquake(data.features[0]);
    }

    return null;
  } catch (error) {
    console.error("Error fetching earthquake by ID:", error);
    throw error;
  }
}

function transformEarthquake(feature: any): Earthquake {
  const props = feature.properties;
  const geom = feature.geometry;

  return {
    id: feature.id,
    magnitude: props.mag || 0,
    place: props.place || "Unknown location",
    time: new Date(props.time).toISOString(),
    updated: new Date(props.updated).toISOString(),
    tz: props.tz,
    url: props.url || "",
    detail: props.detail || "",
    felt: props.felt,
    cdi: props.cdi,
    mmi: props.mmi,
    alert: props.alert,
    status: props.status || "automatic",
    tsunami: props.tsunami || 0,
    sig: props.sig || 0,
    net: props.net || "",
    code: props.code || "",
    ids: props.ids || "",
    sources: props.sources || "",
    types: props.types || "",
    nst: props.nst,
    dmin: props.dmin,
    rms: props.rms,
    gap: props.gap,
    magType: props.magType || "unknown",
    type: props.type || "earthquake",
    title: props.title || "",
    geometry: {
      type: geom.type,
      coordinates: geom.coordinates,
    },
    properties: {
      mag: props.mag || 0,
      place: props.place || "Unknown location",
      time: new Date(props.time).toISOString(),
      updated: new Date(props.updated).toISOString(),
      tz: props.tz,
      url: props.url || "",
      detail: props.detail || "",
      felt: props.felt,
      cdi: props.cdi,
      mmi: props.mmi,
      alert: props.alert,
      status: props.status || "automatic",
      tsunami: props.tsunami || 0,
      sig: props.sig || 0,
      net: props.net || "",
      code: props.code || "",
      ids: props.ids || "",
      sources: props.sources || "",
      types: props.types || "",
      nst: props.nst,
      dmin: props.dmin,
      rms: props.rms,
      gap: props.gap,
      magType: props.magType || "unknown",
      type: props.type || "earthquake",
      title: props.title || "",
    },
  };
}
