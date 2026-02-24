import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB, mongoUri } from "./db";
import MongoStore from "connect-mongo";
import { generateUser } from "./routes/auth";
import session from "express-session";

import type { RequestHandler } from "express";

const app = express();
const PORT = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || "";

// CORS Config
const corsConfig = {
  origin: `${clientUrl}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsConfig))

app.use(express.json());

// Session config
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  }) as RequestHandler
);

connectDB();

generateUser();

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  