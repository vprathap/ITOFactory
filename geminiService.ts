
import { GoogleGenAI, Type } from "@google/genai";
import { SiteManifest } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSiteManifest = async (docText: string): Promise<SiteManifest> => {
  const prompt = `Analyze the following document content and generate a high-quality, professional website architecture. 
  Extract the core mission, brand identity, and key features. 
  Document Content:
  ---
  ${docText}
  ---
  Return a structured JSON manifest for the website.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 15000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["name", "tagline", "theme", "sections"],
        properties: {
          name: { type: Type.STRING },
          tagline: { type: Type.STRING },
          theme: {
            type: Type.OBJECT,
            required: ["primary", "secondary", "accent", "fontStyle"],
            properties: {
              primary: { type: Type.STRING, description: "A hex color code for primary branding" },
              secondary: { type: Type.STRING, description: "A hex color code for secondary branding" },
              accent: { type: Type.STRING, description: "A hex color code for calls to action" },
              fontStyle: { type: Type.STRING, enum: ["modern", "classic", "playful", "tech"] }
            }
          },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["type"],
              properties: {
                type: { type: Type.STRING, enum: ["hero", "features", "about", "pricing", "testimonials", "contact", "footer"] },
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                content: { type: Type.STRING },
                ctaText: { type: Type.STRING },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      icon: { type: Type.STRING },
                      price: { type: Type.STRING },
                      author: { type: Type.STRING },
                      role: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text);
};
