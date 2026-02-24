import { Request, Response, NextFunction, Router } from "express";
import { isAuthorized } from "../middleware/auth";
import mongoose from "mongoose";

const router = Router();

router.get("/docs", isAuthorized, async (req: Request, res: Response, next: NextFunction) => {
    
})

export default router;