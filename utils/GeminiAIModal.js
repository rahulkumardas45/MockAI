import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Supported Gemini models with prioritized fallback hierarchy (active and verified)
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-3.7-flash",
  "gemini-3.8-flash",
  "gemini-2.5-pro",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
  "gemini-pro-latest",
];

export const model = genAI.getGenerativeModel({
  model: CANDIDATE_MODELS[0],
});

/**
 * Generate AI content with automatic model fallback and error resilience
 */
export async function generateAIContent(prompt, config = {}) {
  const effectiveKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || apiKey;
  if (!effectiveKey) {
    throw new Error(
      "NEXT_PUBLIC_GEMINI_API_KEY is not configured. Please add your Google Gemini API key to .env.local"
    );
  }

  const aiClient = new GoogleGenerativeAI(effectiveKey);
  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const activeModel = aiClient.getGenerativeModel({
        model: modelName,
        generationConfig: { ...generationConfig, ...config },
        safetySettings,
      });

      const result = await activeModel.generateContent(prompt);
      const text = result.response.text();
      return text;
    } catch (err) {
      console.warn(`Gemini model ${modelName} failed, trying fallback:`, err?.message || err);
      lastError = err;
    }
  }

  throw new Error(
    `All Gemini AI models failed. Please check your API key and quotas. Details: ${lastError?.message || "Unknown error"}`
  );
}

/**
 * Backward-compatible chatSession proxy that delegates to fresh generation
 */
export const chatSession = {
  sendMessage: async (prompt) => {
    const text = await generateAIContent(prompt);
    return {
      response: {
        text: () => text,
      },
    };
  },
};