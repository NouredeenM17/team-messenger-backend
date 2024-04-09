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
const userRepository_1 = require("../data/userRepository");
exports.usersRoute = express_1.default.Router();
// GET Get user from Id
exports.usersRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_1.getUserById)(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// POST Create New User
exports.usersRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_1.createNewUser)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        if (error.message === 'Username is already taken') {
            res.status(400).json({ error: 'Username is already taken' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
}));
