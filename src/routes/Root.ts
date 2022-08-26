import express, { Request, Response } from "express";
import { ResponseHandler } from "../../lib/src/helpers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    return ResponseHandler.ok(res, { message: "Welcome to HOS User-Service!" });
});

router.get("/health", (req: Request, res: Response) => {
    return ResponseHandler.ok(res, { status: "UP" });
});

export default router;
