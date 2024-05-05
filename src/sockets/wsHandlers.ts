import WebSocket from "ws";
import { wss } from "..";

// Store connected clients
export const clientSockets: Set<WebSocket> = new Set();

export const initWSHandlers = () => {
  // Event handler for new connections
  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    // Add new client to the set
    clientSockets.add(ws);

    // Event handler for receiving messages from clients
    ws.on("message", (message: string) => {
      console.log("Received message:", message.toString());
      // Handle message
      broadcast(message.toString());
    });

    // Event handler for client disconnection
    ws.on("close", (ws: WebSocket) => {
      console.log("Client disconnected");

      // Remove the client from the set
      clientSockets.delete(ws);
    });
  });

  // Broadcast function to send message to all clients
function broadcast(message: string) {
    clientSockets.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

};
