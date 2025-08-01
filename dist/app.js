"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const loginRoute_1 = require("./routes/loginRoute");
const usersRoute_1 = require("./routes/usersRoute");
const roomsRoute_1 = require("./routes/roomsRoute");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/api/login', loginRoute_1.loginRoute);
exports.app.use('/api/users', usersRoute_1.usersRoute);
exports.app.use('/api/rooms', roomsRoute_1.roomsRoute);
