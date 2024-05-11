"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRepository_1 = require("../data/userRepository");
const userRepository_2 = require("../data/userRepository");
exports.usersRoute = express_1.default.Router();
// GET Get user from Id
exports.usersRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_2.getUserById)(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// POST Create New User
exports.usersRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_2.createNewUser)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        if (error.message === "Username is already taken") {
            res.status(400).json({ error: "Username is already taken" });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
}));
// Route to handle adding room to user
exports.usersRoute.post("/addRoom", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, roomId } = req.body;
    try {
        // Validate userId and roomId
        if (!mongoose_1.default.Types.ObjectId.isValid(userId) ||
            !mongoose_1.default.Types.ObjectId.isValid(roomId)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid user ID or room ID" });
        }
        // Call addRoomToUser function to add room to user
        yield (0, userRepository_1.addRoomToUser)(userId, roomId);
        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Room added to user successfully" });
    }
    catch (error) {
        console.error("Error adding room to user:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}));
// Route to check if user is the creator of a room
exports.usersRoute.post('/checkRoomCreator', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, roomId } = req.body;
    try {
        // Validate userId and roomId
        if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !mongoose_1.default.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID or room ID' });
        }
        // Call isRoomCreator function to check if user is the creator of the room
        const isCreator = yield (0, userRepository_1.isRoomCreator)(userId, roomId);
        // Return response indicating whether user is the creator of the room
        return res.status(200).json({ success: true, isCreator });
    }
    catch (error) {
        console.error('Error checking if user is the creator of the room:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}));
// Route to get room IDs of a user
exports.usersRoute.get('/getRoomIdsOfUser/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        // Validate userId
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        // Call getRoomIdsOfUser function to get room IDs of the user
        const roomIds = yield (0, userRepository_1.getRoomIdsOfUser)(userId);
        // Return response with room IDs of the user
        return res.status(200).json({ success: true, roomIds });
    }
    catch (error) {
        console.error('Error getting room IDs of the user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}));
