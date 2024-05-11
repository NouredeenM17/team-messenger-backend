import express from "express";
import mongoose from "mongoose";
import { addRoomToUser, getRoomIdsOfUser, isRoomCreator } from "../data/userRepository";
import { createNewUser, getUserById } from "../data/userRepository";

export const usersRoute = express.Router();

// GET Get user from Id
usersRoute.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST Create New User
usersRoute.post("/", async (req, res) => {
  try {
    const user = await createNewUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "Username is already taken") {
      res.status(400).json({ error: "Username is already taken" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Route to handle adding room to user
usersRoute.post("/addRoom", async (req, res) => {
  const { userId, roomId } = req.body;

  try {
    // Validate userId and roomId
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(roomId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID or room ID" });
    }

    // Call addRoomToUser function to add room to user
    await addRoomToUser(userId, roomId);

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Room added to user successfully" });
  } catch (error) {
    console.error("Error adding room to user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Route to check if user is the creator of a room
usersRoute.post('/checkRoomCreator', async (req, res) => {
    const { userId, roomId } = req.body;
  
    try {
      // Validate userId and roomId
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID or room ID' });
      }
  
      // Call isRoomCreator function to check if user is the creator of the room
      const isCreator = await isRoomCreator(userId, roomId);
  
      // Return response indicating whether user is the creator of the room
      return res.status(200).json({ success: true, isCreator });
    } catch (error) {
      console.error('Error checking if user is the creator of the room:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // Route to get room IDs of a user
usersRoute.get('/getRoomIdsOfUser/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Validate userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }
  
      // Call getRoomIdsOfUser function to get room IDs of the user
      const roomIds = await getRoomIdsOfUser(userId as any);
  
      // Return response with room IDs of the user
      return res.status(200).json({ success: true, roomIds });
    } catch (error) {
      console.error('Error getting room IDs of the user:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
