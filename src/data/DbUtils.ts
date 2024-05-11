import mongoose, { mongo } from "mongoose";
import express from "express";

// get MongoDB timestamp
export const getMongoTimestamp = async () => {
    try {
        const result = await mongoose.connection.db.command({ serverStatus: 1 });
        return result.localTime;
    } catch (error: any) {
        console.error('Error fetching timestamp: ', error.message);
    }
}

