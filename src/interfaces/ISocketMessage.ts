export interface ISocketMessage {
    type: string;
    roomId: string;
    timestamp?: string;
    payload?: string;
    sender?: string;
    filename?: string;
    blob?: Blob;
    userlist?: string[];
}
