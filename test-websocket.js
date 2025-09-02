const WebSocket = require("ws");

console.log("Testing WebSocket connection...");

const ws = new WebSocket("ws://localhost:4000/earthquakes-ws");

ws.on("open", function open() {
  console.log("✅ WebSocket connected successfully!");

  // Test requesting data
  ws.send(JSON.stringify({ type: "REQUEST_DATA" }));
  console.log("📤 Sent REQUEST_DATA message");

  // Test ping
  setTimeout(() => {
    ws.send(JSON.stringify({ type: "PING" }));
    console.log("📤 Sent PING message");
  }, 1000);
});

ws.on("message", function message(data) {
  try {
    const parsed = JSON.parse(data);
    console.log("📥 Received message:", parsed.type);

    if (
      parsed.type === "EARTHQUAKE_DATA" ||
      parsed.type === "EARTHQUAKE_UPDATE"
    ) {
      console.log(
        `   📊 Earthquake data: ${
          parsed.data.features?.length || 0
        } earthquakes`
      );
    } else if (parsed.type === "PONG") {
      console.log("   🏓 Pong received");
    }
  } catch (error) {
    console.log("📥 Received raw message:", data.toString());
  }
});

ws.on("error", function error(err) {
  console.error("❌ WebSocket error:", err.message);
});

ws.on("close", function close() {
  console.log("🔌 WebSocket connection closed");
  process.exit(0);
});

// Close after 5 seconds
setTimeout(() => {
  console.log("⏰ Test completed, closing connection...");
  ws.close();
}, 5000);
