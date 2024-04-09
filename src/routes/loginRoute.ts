import express from "express";
import jwt from "jsonwebtoken";
import { authenticateUser } from "../data/userRepository";

export const loginRoute = express.Router();

// POST Login Request
loginRoute.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await authenticateUser(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentails" });
    }

    const token = jwt.sign({ userId: username }, "secret");
    const userId = user._id;

    res.json({ token, userId });
  } catch (error: any) {
    res.status(500).json({error: error.message});    
  }
});
