import { GoogleGenAI, Type, Chat } from "@google/genai";
import { FaceShape, HairType, StyleRecommendation } from "../types";
import { Language } from "../contexts/LanguageContext";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getStyleRecommendations = async (
  faceShape: FaceShape,
  hairType: HairType,
  preferences: string,
  language: Language
): Promise<StyleRecommendation[]> => {
  if (!apiKey) {
    console.warn("No API Key provided. Returning mock data.");
    return [
      {
        name: "The Classic Taper",
        description: "A timeless cut that stays clean and professional.",
        stylingTips: "Use a matte pomade for a natural finish.",
        suitability: "Great for all face shapes, especially oval."
      }
    ];
  }

  const langName = language === 'es' ? 'Spanish' : language === 'ru' ? 'Russian' : 'English';

  try {
    const prompt = `
      You are a master barber at a premium barbershop. 
      Suggest 3 specific hairstyles for a client with the following attributes:
      - Face Shape: ${faceShape}
      - Hair Type: ${hairType}
      - Personal Preferences: ${preferences}
      
      IMPORTANT: Provide the response in ${langName}.

      Provide the response in a strict JSON format.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              stylingTips: { type: Type.STRING },
              suitability: { type: Type.STRING },
            },
            required: ["name", "description", "stylingTips", "suitability"],
          }
        },
        systemInstruction: `You are an expert hair stylist and barber. Your tone is professional, sophisticated, and helpful. Focus on modern, stylish cuts suitable for a gentleman. Reply in ${langName}.`,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as StyleRecommendation[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching style recommendations:", error);
    throw new Error("Failed to generate recommendations. Please try again.");
  }
};

export const generateEditedImage = async (
  imageBase64: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  if (!apiKey) {
    console.warn("No API Key provided for image generation.");
    return null;
  }

  try {
    // Clean base64 string if it contains the data URL prefix
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating edited image:", error);
    throw error;
  }
};

export const generateVideoFromImage = async (
  imageBase64: string,
  prompt: string
): Promise<string | null> => {
  // Veo requires a paid API key. Check if one is selected.
  const aistudio = (window as any).aistudio;
  if (aistudio) {
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await aistudio.openSelectKey();
    }
  }

  // Create a new instance to ensure the most up-to-date API key is used
  const currentKey = process.env.API_KEY || '';
  const freshAi = new GoogleGenAI({ apiKey: currentKey });

  try {
    const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

    // Construct a prompt that works well whether the user input is a full sentence or a keyword
    // We append "cinematic slow motion portrait" to ensure the style matches the app's premium aesthetic
    const veoPrompt = `${prompt}, cinematic slow motion portrait, high quality, 4k, photorealistic`;

    // Initiate video generation
    let operation = await freshAi.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: veoPrompt,
      image: {
        imageBytes: cleanBase64,
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16' // Portrait for barber mirror effect
      }
    });

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
      operation = await freshAi.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    
    if (videoUri) {
      // Fetch the actual video bytes using the API key
      const response = await fetch(`${videoUri}&key=${currentKey}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch video bytes: ${response.statusText}`);
      }

      const blob = await response.blob();
      // Explicitly create a video/mp4 blob to ensure browsers recognize the format
      const videoBlob = new Blob([blob], { type: 'video/mp4' });
      return URL.createObjectURL(videoBlob);
    }
    return null;

  } catch (error: any) {
    console.error("Error generating video:", error);
    
    // Robust check for 404 / Not Found errors which indicate missing project access
    const errorString = JSON.stringify(error);
    const errorMessage = error.message || '';
    
    const isNotFound = 
      errorMessage.includes("404") || 
      errorMessage.includes("Requested entity was not found") ||
      errorMessage.includes("NOT_FOUND") ||
      errorString.includes("Requested entity was not found") ||
      errorString.includes("NOT_FOUND");

    if (isNotFound) {
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        console.warn("Veo entity not found or access denied. Prompting user to select API Key.");
        await aistudio.openSelectKey();
        throw new Error("Project access required. Please select a valid paid project and try again.");
      }
    }
    
    throw error;
  }
};

export const createChatSession = (language: Language): Chat | null => {
  if (!apiKey) return null;

  const langName = language === 'es' ? 'Spanish' : language === 'ru' ? 'Russian' : 'English';

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      tools: [{ googleMaps: {} }],
      systemInstruction: `
        You are the Virtual Concierge for "Gentry & Co.", a premium barbershop located in Gaithersburg, MD (at Rio Lakefront).
        
        **Your Persona:**
        - Sophisticated, polite, and professional (like a high-end hotel concierge).
        - Knowledgeable about men's grooming, hair trends, and beard care.
        - Helpful and concise.
        - **IMPORTANT: Always respond in ${langName}.**

        **Business Details:**
        - **Location:** 9811 Washingtonian Blvd, Gaithersburg, MD 20878 (Rio Lakefront).
        - **Phone:** (301) 555-0123.
        - **Hours:** Mon-Fri 10am-8pm, Sat 9am-6pm, Sun 10am-4pm.
        
        **Services & Pricing:**
        - Executive Cut: $45 (Precision cut + hot towel)
        - Signature Shave: $50 (Hot lather + straight razor)
        - Beard Sculpting: $35
        - The Gentry Experience: $85 (Cut + Shave combo)
        - Scalp Treatment: $25
        - Father & Son: $75

        **Rules:**
        - If a user asks to book an appointment, kindly guide them to click the "Book Appointment" button on the website. You cannot book it for them directly.
        - Provide short styling tips if asked.
        - You have access to Google Maps. If a user asks about the location or what's nearby, use the Google Maps tool to provide accurate information.
        - Keep responses under 100 words unless asked for a detailed explanation.
      `,
    }
  });
};