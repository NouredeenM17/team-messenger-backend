"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (process.env.DB_URL && process.env.PORT) {
    const dbUrl = process.env.DB_URL;
    const port = process.env.PORT;
    const db = mongoose_1.default;
    const app = (0, express_1.default)();
    mongoose_1.default
        .connect(dbUrl)
        .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`NODE API is running on port ${port}`);
        });
    })
        .catch((error) => {
        console.log(error.message);
    });
}
else {
    console.error("Environment variables not setup correctly.");
}
