"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (process.env.DB_URL && process.env.PORT) {
    const dbUrl = process.env.DB_URL;
    const port = process.env.PORT;
    // Connect to MongoDB
    mongoose_1.default
        .connect(dbUrl)
        .then(() => {
        console.log("Connected to MongoDB");
        // Start listening to port
        app_1.app.listen(port, () => {
            console.log(`NODE API is running on port ${port}`);
        });
    })
        .catch((error) => {
        // Failed to connect to MongoDB
        console.error(error.message);
    });
}
else {
    // If one or more environment variable is null
    console.error("Environment variables not setup correctly.");
}
