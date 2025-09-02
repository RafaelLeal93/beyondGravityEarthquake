import { PubSub } from "graphql-subscriptions";
import {
  fetchEarthquakeData,
  fetchEarthquakeById,
} from "./services/earthquakeService";
import {
  authenticateUser,
  createToken,
  verifyToken,
} from "./services/authService";
import { User } from "./types";

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: { user?: User }) => {
      return context.user || null;
    },

    earthquakes: async (
      _: any,
      args: {
        startTime?: string;
        endTime?: string;
        minMagnitude?: number;
        maxMagnitude?: number;
        limit?: number;
      }
    ) => {
      try {
        const data = await fetchEarthquakeData(args);
        return data;
      } catch (error) {
        console.error("Error fetching earthquakes:", error);
        throw new Error("Failed to fetch earthquake data");
      }
    },

    earthquake: async (_: any, { id }: { id: string }) => {
      try {
        const earthquake = await fetchEarthquakeById(id);
        return earthquake;
      } catch (error) {
        console.error("Error fetching earthquake:", error);
        throw new Error("Failed to fetch earthquake data");
      }
    },
  },

  Mutation: {
    login: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      try {
        const user = await authenticateUser(username, password);
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const token = createToken(user);
        return {
          token,
          user,
        };
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Authentication failed");
      }
    },

    logout: async () => {
      // In a real app, you might want to blacklist the token
      return true;
    },
  },

  Subscription: {
    earthquakeUpdates: {
      subscribe: () => pubsub.asyncIterator(["EARTHQUAKE_UPDATE"]),
    },
  },
};

// Simulate real-time earthquake updates
setInterval(async () => {
  try {
    const data = await fetchEarthquakeData({ limit: 1 });
    if (data.features && data.features.length > 0) {
      const latestEarthquake = data.features[0];
      pubsub.publish("EARTHQUAKE_UPDATE", {
        earthquakeUpdates: latestEarthquake,
      });
    }
  } catch (error) {
    console.error("Error in earthquake update simulation:", error);
  }
}, 30000); // Update every 30 seconds
