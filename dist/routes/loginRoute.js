"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.loginRoute = express_1.default.Router();
const authenticateUser = (username, password) => {
    // placeholder logic
    if (username === 'admin' && password === 'admin') {
        let user = { _id: '1', username: username, password: password };
        return user;
    }
    else {
        return null;
    }
};
exports.loginRoute.post('/', (req, res) => {
    const { username, password } = req.body;
    const user = authenticateUser(username, password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentails' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: username }, 'secret');
    const userId = user._id;
    res.json({ token, userId });
});
