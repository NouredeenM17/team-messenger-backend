"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomModel = exports.roomSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.roomSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.roomModel = mongoose_1.default.model('Room', exports.roomSchema);
