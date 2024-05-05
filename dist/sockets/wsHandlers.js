"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWSHandlers = exports.clientSockets = void 0;
const ws_1 = __importDefault(require("ws"));
const __1 = require("..");
// Store connected clients
exports.clientSockets = new Set();
const initWSHandlers = () => {
    // Event handler for new connections
    __1.wss.on("connection", (ws) => {
        console.log("Client connected");
        // Add new client to the set
        exports.clientSockets.add(ws);
        // Event handler for receiving messages from clients
        ws.on("message", (message) => {
            console.log("Received message:", message.toString());
            // Handle message
            broadcast(message.toString());
        });
        // Event handler for client disconnection
        ws.on("close", (ws) => {
            console.log("Client disconnected");
            // Remove the client from the set
            exports.clientSockets.delete(ws);
        });
    });
    // Broadcast function to send message to all clients
    function broadcast(message) {
        exports.clientSockets.forEach(client => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(message);
            }
        });
    }
};
exports.initWSHandlers = initWSHandlers;
