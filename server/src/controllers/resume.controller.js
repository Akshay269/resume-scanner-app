import Profile from "../models/Profile.js";
import { parseResume } from "../utils/geminiResumeParser.js";
// import PDFParser from "pdf2json";

import { PDFParse } from "pdf-parse";

export const uploadResume = async (req, res) => {
  try {
    // 1. Check for file buffer
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file buffer provided." });
    }

    // Using pdf-parse to extract text from PDF buffer
    const data = await PDFParse(req.file.buffer);
    const extractedText = data.text;
    console.log("Extracted Text:", extractedText);

    // const pdfParser = new PDFParser();
    // const fileBuffer = req.file.buffer; // 2. Convert event-based parser to a Promise for async/await

    // const pdfData = await new Promise((resolve, reject) => {
    //   pdfParser.on("pdfParser_dataReady", (data) => {
    //     resolve(data);
    //   });
    //   pdfParser.on("pdfParser_dataError", (errData) => {
    //     // pdf2json wraps the error
    //     reject(new Error(errData.parserError));
    //   });

    //   // Start parsing the buffer
    //   pdfParser.parseBuffer(fileBuffer);
    // });

    // console.log("PDF Data Extracted:", pdfData);

    // // 3. Extract text from the complex pdf2json output structure
    // const extractedText = pdfData.formImage.Pages.map((page) =>
    //   page.Texts.map((text) =>
    //     text.R.map((r) => decodeURIComponent(r.T)).join("")
    //   ).join(" ")
    // ).join("\n");

    //   const extracted = await parseResume(extractedText);

    //   let profile = await Profile.findOne({ userId: req.user.id });

    //   if (!profile) {
    //     profile = await Profile.create({
    //       userId: req.user.id,
    //       prefilledData: extracted,
    //     });
    //   } else {
    //     profile.prefilledData = extracted;
    //     await profile.save();
    //   }

    //   res.json({ prefilledData: extracted });
  } catch (err) {
    //   console.error("Resume Upload Error:", err);
    //   res.status(500).json({ error: err.message });
  }
};
