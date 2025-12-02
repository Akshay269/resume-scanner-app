import express from "express";
import clerkAuth from "../middlewares/clerkAuth.js";
import { saveDraft, getDraft,submitProfile } from "../controllers/profile.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { saveDraftSchema } from "../validation/profile.schema.js";
import { finalSubmitSchema } from "../validation/finalSubmit.schema.js";

const router = express.Router();

router.post("/save-draft", clerkAuth, validateBody(saveDraftSchema) ,saveDraft);
router.post("/submit", clerkAuth, validateBody(finalSubmitSchema), submitProfile);
router.get("/draft", clerkAuth, getDraft);

export default router;
