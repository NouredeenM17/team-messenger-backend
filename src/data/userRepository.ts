import mongoose from "mongoose";
import { userModel } from "../models/userModel";
import { IUser } from "../interfaces/IUser";
import { roomModel } from "../models/roomModel";

// Authenticates user
export const authenticateUser = async (username:string, password:string): Promise<IUser | null> => {
    
    const user = await userModel.findOne({ username });

    if(!user){
        throw new Error('Invalid username or password');
    }

    const isPasswordMatch = await user.comparePassword(password);
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
        throw new Error('Invalid username or password');
    }
    
    return user;
}

// Creates new user
export const createNewUser = async (data: any) => {
    try {
        return await userModel.create(data);    
    } catch (error: any) {
        // Duplicate username error
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            throw new Error('Username is already taken');
        }

        throw new Error(`Error creating user: ${error.message}`);
    }
}

// Gets user by Id
export const getUserById = async (id: string) => {
    try {
        return await userModel.findById(id);    
    } catch (error: any) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// Gets user Id from username (unique)
export const getUserIdByUsername = async (username: string) => {
    try {
        const user = await userModel.findOne({ username });
        if (user) {
            return user._id;
        } else {
            throw new Error('User not found');
        }
    } catch (error: any) {
        throw new Error(`Error fetching userId: ${error.message}`);
    }
}

// Function to add room ID to a user's document
export const addRoomToUser = async (userId: mongoose.Types.ObjectId, roomId: mongoose.Types.ObjectId) => {
    try {
      // Find the user document by userId and update it to push roomId to the rooms array
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $push: { rooms: roomId } },
        { new: true } // Return the updated document after update
      );
  
      if (!updatedUser) {
        console.log('User not found');
        return;
      }
  
      console.log('Room added to user:', updatedUser);
    } catch (error: any) {
      throw new Error(`Error adding room to user: ${error.message}`);
    }
  }

// Function to check if a user is the creator of a room
export const isRoomCreator = async (userId: mongoose.Types.ObjectId, roomId: mongoose.Types.ObjectId) => {
    try {
      // Find the room document by roomId
      const room = await roomModel.findById(roomId);
  
      if (!room) {
        throw new Error('Room not found');
      }
  
      // Check if the userId matches the creatorId of the room
      return room.creatorId.equals(userId);
    } catch (error: any) {
      throw new Error(`Error checking if user is the creator of the room: ${error.message}`);
    }
  };

// Function to get the room IDs of a user
export const getRoomIdsOfUser = async (userId: mongoose.Types.ObjectId) => {
    try {
      // Find the user document by userId
      const user = await userModel.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Return the room IDs of the user
      return user.rooms;
    } catch (error: any) {
      throw new Error(`Error getting room IDs of the user: ${error.message}`);
    }
  };