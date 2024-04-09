import mongoose, { mongo } from "mongoose";
import express from "express";

export const timestampRoute = express.Router();

// GET get MongoDB timestamp
timestampRoute.get('/',async (req, res) => {
    try {
        const result = await mongoose.connection.db.command({ serverStatus: 1 });
        const currentTimestamp = result.localTime;
        res.json({ timestamp: currentTimestamp});
    } catch (error: any) {
        console.error('Error fetching timestamp: ', error.message);
        res.status(500).json({error: 'Internal server error'});
    }
})

