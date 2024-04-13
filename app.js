import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

export const app = express();
config({
  path: "./local.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.get("/", (req, res) => {
  res.send("Hi The root is working !");
});
