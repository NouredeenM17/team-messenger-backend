import WebSocket from "ws";
import { wss } from "..";
import { ISocketMessage } from "../interfaces/ISocketMessage";
import { IClientSocket } from "../interfaces/IClientSocket";
import { getMongoTimestamp } from "../data/DbUtils";

// Store connected clients
export const clientSockets: Set<IClientSocket> = new Set();

export const initWSHandlers = () => {
  // Event handler for new connections
  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    // Event handler for receiving messages from clients
    ws.on("message", (message: string) => {
      console.log("Received message:", message.toString());
      // Handle message
      handleMessage(JSON.parse(message), ws);
    });

    // Event handler for client disconnection
    ws.on("close", (ws: WebSocket) => {
      // Remove the client from the set
      removeDisconnectedClientSockets();
      
      console.log("Client disconnected");
    });
  });

};

const handleMessage = (message: ISocketMessage, ws: WebSocket) => {
    switch(message.type){
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

const handlePlainTextMessage = async (message: ISocketMessage) => {
    
    const timestamp = await getMongoTimestamp();
    message.timestamp = timestamp;

    broadcastToRoom(message, message.roomId);
    console.log('plaintext message handled!');
};

const handleInitiationMessage = (message: ISocketMessage, ws: WebSocket) => {
    // Add new client to the set
    const newClientSocket: IClientSocket = {
        roomId: message.roomId,
        socket: ws
    } 
    clientSockets.add(newClientSocket);
    console.log('initiation message handled!');


    // Send connected user list
    //broadcastToRoom(message, message.roomId);
};

const handleFileMessage = async (message: ISocketMessage) => {
    
    const timestamp = await getMongoTimestamp();
    message.timestamp = timestamp;

    broadcastToRoom(message, message.roomId);
    console.log('file message handled!');
}

const removeDisconnectedClientSockets = () => {
    clientSockets.forEach(client => {
        if (client.socket.readyState === WebSocket.CLOSED) {
            clientSockets.delete(client);
        }
    });
};

const broadcastToRoom = (message: ISocketMessage ,roomId: string) => {
    clientSockets.forEach(client => {
        if(client.roomId === roomId){
            
            client.socket.send(JSON.stringify(message));
        }
    })
};

const getUsersInRoom = (roomId: string) => {
    
}
