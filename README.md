# 🌍 Earthquake Monitoring Dashboard

A real-time earthquake monitoring dashboard built with React, TypeScript, GraphQL, and Material-UI. This application provides interactive visualization of earthquake data from the USGS API with real-time updates, authentication, and comprehensive analytics.

## 🚀 Features

- **Real-time Data**: Live earthquake data from USGS API with WebSocket subscriptions
- **Interactive Map**: Mapbox-powered visualization with magnitude-based markers
- **Analytics Dashboard**: Charts showing magnitude trends over time
- **Authentication**: Secure login/logout with JWT tokens
- **Responsive Design**: Modern UI built with Material-UI
- **Filtering**: Advanced filtering by magnitude, time range, and location
- **Detail Views**: Click on map markers to view detailed earthquake information

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **Apollo Client** for GraphQL
- **Mapbox GL JS** for map visualization
- **Recharts** for data visualization
- **React Router** for navigation

### Backend

- **Node.js** with TypeScript
- **Apollo Server** for GraphQL API
- **Express** for HTTP server
- **WebSocket** for real-time subscriptions
- **JWT** for authentication
- **USGS API** for earthquake data

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Mapbox account and access token

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd earthquake-monitoring-dashboard
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-all
```

### 3. Environment Setup

Create a `.env` file in the `client` directory:

```env
REACT_APP_MAPBOX_TOKEN=your_mapbox_access_token_here
```

Get your Mapbox token from: https://account.mapbox.com/access-tokens/

### 4. Start the Application

```bash
# Start both client and server concurrently
npm run dev
```

This will start:

- **Server**: http://localhost:4000/graphql
- **Client**: http://localhost:3000

### 5. Login

Use these demo credentials:

- **Admin**: username: `admin`, password: `any`
- **Viewer**: username: `viewer`, password: `any`

## 📁 Project Structure

```
earthquake-monitoring-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── graphql/       # GraphQL queries and mutations
│   │   ├── services/      # Utility functions
│   │   └── types/         # TypeScript type definitions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── resolvers/     # GraphQL resolvers
│   │   └── types/         # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Root Level

- `npm run dev` - Start both client and server
- `npm run install-all` - Install all dependencies

### Client

- `npm run start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests

### Server

- `npm run dev` - Start with nodemon
- `npm run build` - Build TypeScript
- `npm run start` - Start production server

## 🗺️ Mapbox Setup

1. Create a Mapbox account at https://account.mapbox.com/
2. Generate an access token
3. Add the token to your `.env` file as `REACT_APP_MAPBOX_TOKEN`
4. The map will use the "dark" style for better visualization

## 📊 Data Sources

The application uses the **USGS Earthquake API**:

- **Significant Earthquakes**: Magnitude 4.5+ events
- **Real-time Updates**: Data refreshes every 30 seconds
- **Historical Data**: Up to 30 days of earthquake history

## 🔐 Authentication

The application includes a simple authentication system:

- **JWT-based** authentication
- **Role-based access** (Admin/Viewer)
- **Secure token storage** in localStorage
- **Automatic token refresh**

## 🧪 Testing

Run tests for the client:

```bash
cd client
npm test
```

## 🚀 Deployment

### Build for Production

```bash
# Build the client
cd client
npm run build

# Build the server
cd ../server
npm run build
```

### Environment Variables

Set these environment variables in production:

```env
# Server
JWT_SECRET=your_secure_jwt_secret
PORT=4000

# Client
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```
