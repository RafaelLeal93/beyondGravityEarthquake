export interface User {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "VIEWER";
}

export interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: string;
  updated: string;
  tz?: number;
  url: string;
  detail: string;
  felt?: number;
  cdi?: number;
  mmi?: number;
  alert?: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst?: number;
  dmin?: number;
  rms?: number;
  gap?: number;
  magType: string;
  type: string;
  title: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    mag: number;
    place: string;
    time: string;
    updated: string;
    tz?: number;
    url: string;
    detail: string;
    felt?: number;
    cdi?: number;
    mmi?: number;
    alert?: string;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst?: number;
    dmin?: number;
    rms?: number;
    gap?: number;
    magType: string;
    type: string;
    title: string;
  };
}

export interface EarthquakeData {
  type: string;
  metadata: {
    generated: string;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: Earthquake[];
  bbox?: number[];
}
