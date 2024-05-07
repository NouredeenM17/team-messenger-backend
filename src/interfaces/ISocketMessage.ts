export interface ISocketMessage {
    type: string;
    roomId: string;
    payload?: string;
    sender?: string;
}
