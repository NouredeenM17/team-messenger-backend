import mongoose, { Document } from "mongoose";

export interface IRoom extends Document{
    _id: mongoose.Types.ObjectId;
    title: string;
    creatorId: mongoose.Types.ObjectId;
}
