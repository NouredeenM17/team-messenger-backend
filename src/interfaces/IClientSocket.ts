import WebSocket from "ws";

export interface IClientSocket {
    roomId: string;
    sender: string;
    socket: WebSocket;
}