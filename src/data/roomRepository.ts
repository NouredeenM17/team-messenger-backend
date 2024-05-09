import { roomModel } from "../models/roomModel";
import { IRoom } from "../interfaces/IRoom";

// Creates new room
export const createNewRoom = async (data: any) => {
    try {
        return await roomModel.create(data);    
    } catch (error: any) {
        throw new Error(`Error creating room: ${error.message}`);
    }
}

// Gets room by Id
export const getRoomById = async (id: string) => {
    try {
        return await roomModel.findById(id);    
    } catch (error: any) {
        throw new Error(`Error fetching room: ${error.message}`);
    }
}