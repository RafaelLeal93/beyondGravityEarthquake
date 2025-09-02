import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: UserRole!
  }

  enum UserRole {
    ADMIN
    VIEWER
  }

  type Earthquake {
    id: ID!
    magnitude: Float!
    place: String!
    time: String!
    updated: String!
    tz: Int
    url: String!
    detail: String!
    felt: Int
    cdi: Float
    mmi: Float
    alert: String
    status: String!
    tsunami: Int!
    sig: Int!
    net: String!
    code: String!
    ids: String!
    sources: String!
    types: String!
    nst: Int
    dmin: Float
    rms: Float
    gap: Float
    magType: String!
    type: String!
    title: String!
    geometry: Geometry!
    properties: EarthquakeProperties!
  }

  type Geometry {
    type: String!
    coordinates: [Float!]!
  }

  type EarthquakeProperties {
    mag: Float!
    place: String!
    time: String!
    updated: String!
    tz: Int
    url: String!
    detail: String!
    felt: Int
    cdi: Float
    mmi: Float
    alert: String
    status: String!
    tsunami: Int!
    sig: Int!
    net: String!
    code: String!
    ids: String!
    sources: String!
    types: String!
    nst: Int
    dmin: Float
    rms: Float
    gap: Float
    magType: String!
    type: String!
    title: String!
  }

  type EarthquakeData {
    type: String!
    metadata: Metadata!
    features: [Earthquake!]!
    bbox: [Float!]
  }

  type Metadata {
    generated: String!
    url: String!
    title: String!
    status: Int!
    api: String!
    count: Int!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    earthquakes(
      startTime: String
      endTime: String
      minMagnitude: Float
      maxMagnitude: Float
      limit: Int
    ): EarthquakeData!
    earthquake(id: ID!): Earthquake
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    logout: Boolean!
  }

  type Subscription {
    earthquakeUpdates: Earthquake!
  }
`;
