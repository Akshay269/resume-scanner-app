import { GoogleGenerativeAI } from "@google/generative-ai";

// Lazy load client
let genAI = null;


/**
 * Parse resume PDF using Gemini Vision (OCR + NLP).
 */
export async function parseResumePDF(buffer) {
  try {
    if (!genAI) {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      console.log("api-key",process.env.GEMINI_API_KEY);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const base64PDF = buffer.toString("base64");

    const prompt = `
You are an expert Resume Parser AI.

Extract structured resume fields from the PDF.

Return ONLY JSON like this:
{
  "name": "",
  "email": "",
  "phone": "",
  "summary": "",
  "skills": [],
  "experience": [
    {
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "startYear": "",
      "endYear": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "techStack": []
    }
  ]
}
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64PDF,
          mimeType: "application/pdf",
        },
      },
      prompt,
    ]);

    let raw = result.response.text();

    // Remove markdown fencing
    raw = raw.replace(/```json|```/g, "").trim();

    // Ensure clean JSON
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    const cleaned = raw.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini Vision Resume Parsing Error:", err);
    throw new Error("Failed to parse resume PDF via Gemini Vision");
  }
}
