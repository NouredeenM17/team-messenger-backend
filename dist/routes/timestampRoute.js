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
exports.timestampRoute = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
exports.timestampRoute = express_1.default.Router();
// GET get MongoDB timestamp
exports.timestampRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mongoose_1.default.connection.db.command({ serverStatus: 1 });
        const currentTimestamp = result.localTime;
        res.json({ timestamp: currentTimestamp });
    }
    catch (error) {
        console.error('Error fetching timestamp: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
