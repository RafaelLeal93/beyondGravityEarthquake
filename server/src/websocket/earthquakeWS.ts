import { WebSocketServer, WebSocket } from "ws";
import { fetchEarthquakeData } from "../services/earthquakeService";

export class EarthquakeWebSocketServer {
  private wss: WebSocketServer;
  private clients: Set<WebSocket> = new Set();
  private interval: NodeJS.Timeout | null = null;

  constructor(server: any) {
    this.wss = new WebSocketServer({
      server,
      path: "/earthquakes-ws",
    });

    this.setupWebSocket();
    this.startBroadcasting();
  }

  private setupWebSocket() {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("New WebSocket client connected");
      this.clients.add(ws);

      // Send initial data
      this.sendEarthquakeData(ws);

      // Handle client disconnect
      ws.on("close", () => {
        console.log("WebSocket client disconnected");
        this.clients.delete(ws);
      });

      // Handle errors
      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
        this.clients.delete(ws);
      });

      // Handle incoming messages
      ws.on("message", (message) => {
        try {
          const data = JSON.parse(message.toString());
          this.handleMessage(ws, data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });
    });
  }

  private async handleMessage(ws: WebSocket, data: any) {
    switch (data.type) {
      case "REQUEST_DATA":
        await this.sendEarthquakeData(ws);
        break;
      case "PING":
        ws.send(JSON.stringify({ type: "PONG", timestamp: Date.now() }));
        break;
      default:
        console.log("Unknown message type:", data.type);
    }
  }

  private async sendEarthquakeData(ws: WebSocket) {
    try {
      const data = await fetchEarthquakeData({ limit: 10 });
      ws.send(
        JSON.stringify({
          type: "EARTHQUAKE_DATA",
          data: data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "ERROR",
          message: "Failed to fetch earthquake data",
          timestamp: Date.now(),
        })
      );
    }
  }

  private startBroadcasting() {
    // Broadcast updates every 30 seconds
    this.interval = setInterval(async () => {
      if (this.clients.size > 0) {
        try {
          const data = await fetchEarthquakeData({ limit: 10 });
          const message = JSON.stringify({
            type: "EARTHQUAKE_UPDATE",
            data: data,
            timestamp: Date.now(),
          });

          this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message);
            } else {
              this.clients.delete(client);
            }
          });
        } catch (error) {
          console.error("Error broadcasting earthquake data:", error);
        }
      }
    }, 30000);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.wss.close();
  }
}
