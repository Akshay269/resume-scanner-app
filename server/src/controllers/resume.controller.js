import Profile from "../models/Profile.js";
import { parseResume } from "../utils/geminiResumeParser.js";

export const uploadResume = async (req, res) => {
  try {
    const pdfParse = (await import("pdf-parse")).default;
    const fileBuffer = req.file.buffer;
    const pdfData = await pdfParse(fileBuffer);

    // Send extracted text to Gemini
    const extracted = await parseResume(pdfData.text);

    // Save to DB
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = await Profile.create({
        userId: req.user.id,
        prefilledData: extracted
      });
    } else {
      profile.prefilledData = extracted;
      await profile.save();
    }

    res.json({ prefilledData: extracted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
