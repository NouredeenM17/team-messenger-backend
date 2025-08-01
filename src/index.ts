import { app } from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import WebSocket from 'ws';
import { initWSHandlers } from "./sockets/wsHandlers";

dotenv.config();

// Create a WebSocket server
export const wss = new WebSocket.Server({ port: 8080 });
initWSHandlers();

if (process.env.DB_URL && process.env.PORT) {
  const dbUrl = process.env.DB_URL;
  const port = process.env.PORT;

  // Connect to MongoDB
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB");

      // Start listening to port
      app.listen(port, () => {
        console.log(`NODE API is running on port ${port}`);
      });
    })
    .catch((error) => {
      // Failed to connect to MongoDB
      console.error(error.message);
    });
} else {
  // If one or more environment variable is null
  console.error("Environment variables not setup correctly.");
}
