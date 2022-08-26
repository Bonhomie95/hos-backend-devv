import express from "express";
import { Subscription } from "../controller/Subscription";


const router = express.Router();


router.post(
    "/",
    Subscription
    );


export default router;
