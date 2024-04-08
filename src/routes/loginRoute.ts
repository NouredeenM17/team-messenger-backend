import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/User";

export const loginRoute = express.Router();

const authenticateUser = (username:string, password:string): User | null => {
    // placeholder logic
    if(username === 'admin' && password === 'admin'){
        let user:User = {_id: '1', username: username, password: password}
        return user;
    } else {
        return null;
    }
}

loginRoute.post('/',(req, res) => {
    const { username, password } = req.body;

    const user = authenticateUser(username, password);

    if(!user){
        return res.status(401).json({error: 'Invalid credentails'});
    }

    const token = jwt.sign({userId: username }, 'secret');
    const userId = user._id;

    res.json({ token , userId });
});