import express from "express";
import clerkAuth from "../middlewares/clerkAuth.js";
import { getAllJobs } from "../controllers/jobs.controller.js";

const router = express.Router();

router.get("/alljobs", clerkAuth, getAllJobs);

export default router;
