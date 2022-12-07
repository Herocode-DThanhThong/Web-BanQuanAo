import express, { Express, Request, Response } from "express";
import cors from "cors";
import productRouter from "./routes/product";
require("dotenv").config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// Here we will declare the routes paths
app.use("/api/products", productRouter);

export { app };
