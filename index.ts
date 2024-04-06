import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (process.env.DB_URL && process.env.PORT) {
  const dbUrl = process.env.DB_URL;
  const port = process.env.PORT;

  const app: Express = express();

  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(port, () => {
        console.log(`NODE API is running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
} else {
  console.error("Environment variables not setup correctly.");
}
