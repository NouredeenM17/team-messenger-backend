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
exports.roomsRoute = void 0;
const express_1 = __importDefault(require("express"));
const roomRepository_1 = require("../data/roomRepository");
exports.roomsRoute = express_1.default.Router();
// GET Get room from Id
exports.roomsRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, roomRepository_1.getRoomById)(req.params.id);
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// POST Create New User
exports.roomsRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, roomRepository_1.createNewRoom)(req.body);
        res.status(201).json(room);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
