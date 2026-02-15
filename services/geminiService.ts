
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FileData } from "../types";

export const analyzeContent = async (file: FileData): Promise<AnalysisResult> => {
  // Initialize Gemini client with the required named parameter and environment variable.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze this social media content. 
    1. Extract all visible text accurately (OCR).
    2. Provide an engagement score (0-100).
    3. Identify the sentiment.
    4. List 3 key strengths of the content.
    5. List 3 specific improvements to increase engagement (likes, shares, comments).
    6. Provide 2 better versions/rewrites of the main hook or caption.
    7. Suggest 5 trending relevant hashtags.
    
    The response must be in valid JSON format according to the provided schema.
  `;

  try {
    // Using gemini-3-pro-preview for complex reasoning and content optimization tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: file.base64,
              mimeType: file.mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedText: { type: Type.STRING },
            engagementScore: { type: Type.NUMBER },
            sentiment: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedRewrites: { type: Type.ARRAY, items: { type: Type.STRING } },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["extractedText", "engagementScore", "sentiment", "strengths", "improvements", "suggestedRewrites", "hashtags"],
        },
      },
    });

    // Extract text output directly from the .text property as per guidelines.
    const result = JSON.parse(response.text || '{}');
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to process the content. Please ensure the file is clear and try again.");
  }
};
