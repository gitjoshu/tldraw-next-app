import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export const generateGoogleImage = async ({
  prompt = "Convert this drawing into a realistic image",
  image,
}: {
  prompt?: string;
  image: string;
}) => {
  const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid image format. Expected data URL.");
  }
  const mimeType = match[1];
  const base64Data = match[2];
  const contents = [
    { text: prompt },
    {
      inlineData: {
        mimeType: mimeType,
        data: base64Data,
      },
    },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp-image-generation",
    contents,
    config: {
      responseModalities: ["Text", "Image"],
    },
  });

  let resultText = "";
  let resultImageData = null;
  for (const part of response.candidates?.[0]?.content?.parts ?? []) {
    if (part.text) {
      resultText = part.text;
    } else if (part.inlineData && part.inlineData.data) {
      resultImageData = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  return { text: resultText, image: resultImageData };
};
