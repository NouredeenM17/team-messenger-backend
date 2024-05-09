import express from "express";
import mongoose from "mongoose";
import { createNewRoom, getRoomById } from "../data/roomRepository";

export const roomsRoute = express.Router();

// GET Get room from Id
roomsRoute.get("/:id", async (req, res) => {
  try {
    const room = await getRoomById(req.params.id);
    res.status(200).json(room);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST Create New User
roomsRoute.post("/", async (req, res) => {
  try {
    const room = await createNewRoom(req.body);
    res.status(201).json(room);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});