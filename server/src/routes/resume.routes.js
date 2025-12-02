import express from "express";
import multer from "multer";
import clerkAuth from "../middlewares/clerkAuth.js";
import { uploadResume } from "../controllers/resume.controller.js";

const upload = multer();
const router = express.Router();

router.post("/upload", clerkAuth, upload.single("resume"), uploadResume);

export default router;
