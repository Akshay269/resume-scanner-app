import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Takes extracted PDF text → Returns structured JSON
export const parseResume = async (resumeText) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const prompt = `
Extract structured resume data from this content.

Return ONLY JSON with these fields:
{
  "name": "",
  "email": "",
  "phone": "",
  "summary": "",
  "skills": [],
  "experience": [],
  "education": [],
  "projects": []
}

Resume Text:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};
