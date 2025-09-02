# 🚀 Setup Instructions

This guide will help you set up and run the Earthquake Monitoring Dashboard on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

## 🗺️ Mapbox Setup (Required)

The application requires a Mapbox access token for map visualization:

1. **Create a Mapbox account**:

   - Go to [https://account.mapbox.com/](https://account.mapbox.com/)
   - Sign up for a free account

2. **Generate an access token**:

   - Navigate to the "Access tokens" section
   - Copy your default public token
   - Or create a new token with appropriate scopes

3. **Note your token** - you'll need it in the next step

## 🏗️ Installation Steps

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd earthquake-monitoring-dashboard
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install all project dependencies (client + server)
npm run install-all
```

This command will install dependencies for:

- Root project
- React client application
- Node.js server

### Step 3: Environment Configuration

Create a `.env` file in the `client` directory:

```bash
# Navigate to client directory
cd client

# Create .env file
touch .env
```

Add the following content to `client/.env`:

```env
REACT_APP_MAPBOX_TOKEN=your_mapbox_access_token_here
```

Replace `your_mapbox_access_token_here` with your actual Mapbox token.

### Step 4: Start the Application

Return to the root directory and start the application:

```bash
# Go back to root directory
cd ..

# Start both client and server
npm run dev
```

This will start:

- **GraphQL Server**: http://localhost:4000/graphql
- **React Client**: http://localhost:3000

## 🔐 Login Credentials

Use these demo credentials to access the dashboard:

| Role   | Username | Password |
| ------ | -------- | -------- |
| Admin  | `admin`  | `any`    |
| Viewer | `viewer` | `any`    |

## ✅ Verification

Once the application is running:

1. **Open your browser** and go to http://localhost:3000
2. **Login** with the demo credentials
3. **Verify the dashboard loads** with:
   - Interactive map (if Mapbox token is configured)
   - Earthquake data list
   - Magnitude chart
   - Real-time updates

## 🛠️ Development Commands

### Individual Services

You can also run the client and server separately:

```bash
# Start only the client (React app)
npm run client

# Start only the server (GraphQL API)
npm run server
```

### Testing

```bash
# Run client tests
cd client
npm test

# Run server tests
cd server
npm test
```

### Building for Production

```bash
# Build client
cd client
npm run build

# Build server
cd server
npm run build
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Map Not Loading

**Problem**: Map shows "Mapbox Token Required" message
**Solution**:

- Verify your Mapbox token is correct
- Check that the `.env` file is in the `client` directory
- Restart the development server

#### 2. No Earthquake Data

**Problem**: Dashboard shows "No earthquakes to display"
**Solution**:

- Check your internet connection
- Verify the USGS API is accessible
- Check the browser console for errors

#### 3. Authentication Issues

**Problem**: Login fails or user gets logged out
**Solution**:

- Clear browser localStorage
- Restart the server
- Check that JWT_SECRET is set (optional for development)

#### 4. Port Already in Use

**Problem**: Error "Port 3000 is already in use"
**Solution**:

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm run client
```

#### 5. Dependencies Issues

**Problem**: npm install fails
**Solution**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Enable debug logging by setting environment variables:

```bash
# For server debugging
DEBUG=* npm run server

# For client debugging
REACT_APP_DEBUG=true npm run client
```

## 🔧 Configuration Options

### Server Configuration

Create a `.env` file in the `server` directory for server-specific settings:

```env
# Server .env
JWT_SECRET=your_secure_jwt_secret_here
PORT=4000
NODE_ENV=development
```

### Client Configuration

Additional client environment variables:

```env
# Client .env
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_API_URL=http://localhost:4000/graphql
REACT_APP_WS_URL=ws://localhost:4000/graphql
```

## 📊 Data Sources

The application fetches data from:

- **USGS Earthquake API**: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/
- **Real-time updates**: Every 30 seconds
- **Data range**: Significant earthquakes (magnitude 4.5+)

## 🚀 Next Steps

After successful setup:

1. **Explore the dashboard** features
2. **Test the filtering** options
3. **Click on map markers** to view details
4. **Monitor real-time updates**
5. **Customize the application** for your needs

## 📞 Getting Help

If you encounter issues:

1. **Check this setup guide** first
2. **Review the main README.md** for additional information
3. **Check the browser console** for error messages
4. **Verify all prerequisites** are installed correctly
5. **Create an issue** in the repository with detailed error information

---

**Happy monitoring! 🌍**
