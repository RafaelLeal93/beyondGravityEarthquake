# 🌍 Earthquake Monitoring Dashboard - Project Summary

## 📋 Project Overview

The Earthquake Monitoring Dashboard is a comprehensive, real-time web application that provides interactive visualization and analysis of earthquake data from the USGS API. Built with modern web technologies, it offers a secure, responsive, and feature-rich platform for monitoring seismic activity worldwide.

### Frontend Stack

- **React 18** with TypeScript
- **Material-UI** for component library
- **Apollo Client** for GraphQL integration
- **Mapbox GL JS** for map visualization
- **Recharts** for data visualization
- **React Router** for navigation

### Backend Stack

- **Node.js** with TypeScript
- **Apollo Server** for GraphQL API
- **Express** for HTTP server
- **WebSocket** for real-time communication
- **JWT** for authentication
- **USGS API** for earthquake data

## 📁 Project Structure

```
earthquake-monitoring-dashboard/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main page components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── graphql/       # GraphQL queries and mutations
│   │   ├── services/      # Utility functions
│   │   ├── types/         # TypeScript definitions
│   │   └── apollo/        # Apollo Client configuration
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── services/      # Business logic services
│   │   ├── middleware/    # Express middleware
│   │   ├── resolvers/     # GraphQL resolvers
│   │   ├── schema/        # GraphQL schema
│   │   └── types/         # TypeScript definitions
│   └── package.json       # Backend dependencies
├── README.md              # Main documentation
├── SETUP.md               # Setup instructions
├── ARCHITECTURE.md        # Architecture documentation
└── package.json           # Root package configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Mapbox account and access token

### Quick Setup

1. **Clone repository**: `git clone <repo-url>`
2. **Install dependencies**: `npm run install-all`
3. **Configure environment**: Set `REACT_APP_MAPBOX_TOKEN` in `client/.env`
4. **Start application**: `npm run dev`
5. **Access dashboard**: http://localhost:3000

### Demo Credentials

- **Admin**: username: `admin`, password: `any`
- **Viewer**: username: `viewer`, password: `any`

## 📊 Data Sources & API Integration

### USGS Earthquake API

- **Endpoint**: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/
- **Data Type**: Significant earthquakes (magnitude 4.5+)
- **Update Frequency**: Every 30 seconds
- **Data Format**: GeoJSON with comprehensive metadata

### GraphQL API

- **Endpoint**: http://localhost:4000/graphql
- **WebSocket**: ws://localhost:4000/graphql
- **Features**: Queries, mutations, and subscriptions
- **Authentication**: JWT-based with role authorization

## 📋 Assumptions & Limitations

### Assumptions

1. **USGS API availability** - Relies on external service
2. **Modern browser support** - Requires WebGL and ES6+
3. **Internet connectivity** - No offline functionality
4. **Mapbox service** - Requires valid access token

### Current Limitations

1. **API rate limits** - USGS API has usage restrictions
2. **Browser compatibility** - Requires modern browsers

### Known Issues

1. **Map loading** - Requires valid Mapbox token
2. **Large datasets** - Performance degrades with >1000 earthquakes
3. **Timezone display** - All times shown in UTC
4. **Offline mode** - No offline functionality currently

### Production Requirements

- **Environment variables** for configuration
- **HTTPS** for secure communication
- **Domain configuration** for CORS
- **SSL certificates** for secure connections

### Performance Monitoring

- **Error tracking** for production issues
- **Performance metrics** for optimization
- **User analytics** for usage patterns
- **API monitoring** for external dependencies
