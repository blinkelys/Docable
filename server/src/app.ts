import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';
import connectDB from './db';

const app = express();
const PORT = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || "";

app.use(express.json());

// CORS Config
import cors from 'cors';
app.use(cors());  

connectDB();

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  