import { Request, Response, NextFunction, Router } from "express";
import { isAuthorized } from "../middleware/auth";
import mongoose from "mongoose";

const router = Router();


export default router;