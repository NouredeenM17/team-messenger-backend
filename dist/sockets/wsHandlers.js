"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWSHandlers = exports.clientSockets = void 0;
const ws_1 = __importDefault(require("ws"));
const __1 = require("..");
const DbUtils_1 = require("../data/DbUtils");
// Store connected clients
exports.clientSockets = new Set();
const initWSHandlers = () => {
    // Event handler for new connections
    __1.wss.on("connection", (ws) => {
        console.log("Client connected");
        // Event handler for receiving messages from clients
        ws.on("message", (message) => {
            console.log("Received message:", message.toString());
            // Handle message
            handleMessage(JSON.parse(message), ws);
        });
        // Event handler for client disconnection
        ws.on("close", (ws) => {
            // Remove the client from the set
            //removeDisconnectedClientSockets();
            removeClientSocket(ws);
            console.log("Client disconnected");
        });
    });
};
exports.initWSHandlers = initWSHandlers;
const handleMessage = (message, ws) => {
    switch (message.type) {
        case 'plaintext':
            handlePlainTextMessage(message);
            break;
        case 'initiation':
            handleInitiationMessage(message, ws);
            break;
        case 'file':
            handleFileMessage(message);
            break;
    }
};
const handlePlainTextMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = yield (0, DbUtils_1.getMongoTimestamp)();
    message.timestamp = timestamp;
    broadcastToRoom(message, message.roomId);
    console.log('plaintext message handled!');
});
const handleInitiationMessage = (message, ws) => {
    // Add new client to the set
    const newClientSocket = {
        roomId: message.roomId,
        sender: message.sender,
        socket: ws
    };
    exports.clientSockets.add(newClientSocket);
    console.log('initiation message handled!');
    // Send connected user list
    const userList = getUsersInRoom(message.roomId);
    sendUserList(userList, message.roomId);
};
const handleFileMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = yield (0, DbUtils_1.getMongoTimestamp)();
    message.timestamp = timestamp;
    broadcastToRoom(message, message.roomId);
    console.log('file message handled!');
});
const removeClientSocket = (ws) => {
    exports.clientSockets.forEach(client => {
        if (client.socket.readyState === ws_1.default.CLOSED
            && client.socket._closeCode === ws) {
            const roomId = client.roomId;
            exports.clientSockets.delete(client);
            // Send updated connected user list
            const userList = getUsersInRoom(roomId);
            if (userList) {
                sendUserList(userList, roomId);
            }
        }
    });
};
const broadcastToRoom = (message, roomId) => {
    exports.clientSockets.forEach(client => {
        if (client.roomId === roomId) {
            client.socket.send(JSON.stringify(message));
        }
    });
};
const getUsersInRoom = (roomId) => {
    const userArray = [];
    exports.clientSockets.forEach(client => {
        if (client.roomId === roomId) {
            userArray.push(client.sender);
        }
    });
    return userArray;
};
const sendUserList = (userList, roomId) => {
    const userListObj = {
        type: 'userlist',
        roomId: roomId,
        userList: userList
    };
    broadcastToRoom(userListObj, roomId);
};
