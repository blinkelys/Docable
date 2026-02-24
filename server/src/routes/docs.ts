import { Request, Response, NextFunction, Router } from "express";
import { isAuthorized } from "../middleware/auth";
import DocModel from "../models/docModel";

const router = Router();

router.post("/", isAuthorized, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newDoc = await DocModel.create({ ...req.body });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error);
    }
});

router.get("/", isAuthorized, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const docs = await DocModel.find();
        res.json(docs);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", isAuthorized, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doc = await DocModel.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: "Not found" });
        res.json(doc);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", isAuthorized, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedDoc = await DocModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedDoc) return res.status(404).json({ message: "Not found" });
        res.json(updatedDoc);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", isAuthorized, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedDoc = await DocModel.findByIdAndDelete(req.params.id);
        if (!deletedDoc) return res.status(404).json({ message: "Not found" });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;