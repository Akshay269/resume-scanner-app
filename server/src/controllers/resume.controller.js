import Profile from "../models/Profile.js";
import { parseResumePDF } from "../services/resumeVisionParser.service.js";
import { normalizeResume } from "../services/resumeNormalizer.service.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = req.file.buffer;

    // Step 1 — Parse PDF via Gemini Vision
    // console.log("Parsing resume using Gemini Vision...");
    const parsedData = await parseResumePDF(buffer);

    // Step 2 — Normalize
    const normalized = normalizeResume(parsedData);

    // Step 3 — Save into database
    const userId = req.user?.id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({ userId });
    }

    profile.formData = normalized;
    profile.updatedAt = new Date();
    await profile.save();

    res.json({
      message: "Resume uploaded and parsed successfully.",
      data: normalized,
    });
  } catch (err) {
    console.error("Resume Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};
