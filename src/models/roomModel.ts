import mongoose from "mongoose";
import { IRoom } from "../interfaces/IRoom";

export const roomSchema = new mongoose.Schema<IRoom>(
    {
        title: {
            type: String,
            required: true
        },
        creatorId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    }
);

export const roomModel = mongoose.model<IRoom>('Room',roomSchema);