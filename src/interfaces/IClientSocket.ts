import WebSocket from "ws";

export interface IClientSocket {
    roomId: string;
    socket: WebSocket;
}