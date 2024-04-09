import express from "express";
import { createNewUser, getUserById } from "../data/userRepository";

export const usersRoute = express.Router();

// GET Get user from Id
usersRoute.get('/:id',async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
});

// POST Create New User
usersRoute.post('/', async (req, res) => {
    try {
        const user = await createNewUser(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        if(error.message === 'Username is already taken'){
            res.status(400).json({error: 'Username is already taken'});
        } else {
            res.status(500).json({error: error.message});
        }
    }
});

