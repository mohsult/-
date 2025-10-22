// Fix: Import necessary modules from @google/genai and local types.
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { UserProfile, TherapyPlan, ActivityType } from '../types';

// Fix: Initialize the Google AI client using the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a personalized visual therapy plan using Gemini.
 * @param profile - The user's profile information.
 * @returns A structured therapy plan.
 */
export const generateTherapyPlan = async (profile: UserProfile): Promise<TherapyPlan> => {
  // Fix: Define a strict JSON schema for the therapy plan to ensure consistent output from the model.
  const therapyPlanSchema = {
    type: Type.OBJECT,
    properties: {
      sessions: {
        type: Type.ARRAY,
        description: 'List of daily therapy sessions.',
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.INTEGER, description: 'The day number of the session, starting from 1.' },
            activities: {
              type: Type.ARRAY,
              description: 'List of activities for the day. Should be 2 to 4 activities per day.',
              items: {
                type: Type.OBJECT,
                properties: {
                  type: {
                    type: Type.STRING,
                    enum: Object.values(ActivityType),
                    description: 'The type of the activity.'
                  },
                  title: { type: Type.STRING, description: 'A short, engaging title for the activity in Arabic.' },
                  description: { type: Type.STRING, description: 'A detailed, step-by-step guide in Arabic for the parent on how to conduct this activity with their child. The tone should be encouraging, clear, and written in bullet points or numbered steps.' },
                  duration: { type: Type.INTEGER, description: 'Duration of the activity in minutes (e.g., 5, 10, 15).' },
                  coloringThemes: {
                    type: Type.ARRAY,
                    description: 'A list of 2-3 simple themes for coloring pages (e.g., "حيوانات المزرعة", "سيارات سباق"). Only include this property if type is "صفحات تلوين علاجية". Otherwise, omit it.',
                    items: { type: Type.STRING },
                    nullable: true
                  }
                },
                required: ['type', 'title', 'description', 'duration']
              }
            }
          },
          required: ['day', 'activities']
        }
      }
    },
    required: ['sessions']
  };

  // Fix: Create a detailed prompt in Arabic to guide the model in generating a high-quality, relevant therapy plan.
  const prompt = `
    أنشئ خطة علاج بصري مخصصة باللغة العربية لطفل.
    - اسم الطفل: ${profile.name}
    - العمر: ${profile.age}
    - الحالة: ${profile.condition}
    - مدة الخطة: ${profile.duration} يومًا

    التعليمات:
    1.  أنشئ جلسة لكل يوم من مدة الخطة.
    2.  يجب أن تحتوي كل جلسة يومية على 2 إلى 4 أنشطة.
    3.  يجب أن يكون إجمالي وقت الأنشطة اليومية حوالي 15-25 دقيقة.
    4.  اجعل الأنشطة ممتعة ومناسبة للعمر ومبتكرة.
    5.  نوّع الأنشطة يوميًا لتجنب الملل.
    6.  يجب أن تستهدف الأنشطة بشكل مباشر الحالة المحددة (${profile.condition}).
    7.  بالنسبة لجميع الأنشطة، يجب أن يكون حقل "description" دليلاً مفصلاً خطوة بخطوة لولي الأمر، يشرح كيفية تنفيذ النشاط مع الطفل بطريقة علاجية صحيحة. استخدم نقاطًا أو خطوات مرقمة لزيادة الوضوح.
    8.  بالنسبة لأنشطة التلوين ("صفحات تلوين علاجية")، قم بتضمين 2-3 مواضيع تلوين بسيطة وممتعة في حقل "coloringThemes".
    9.  يجب أن يكون الإخراج بتنسيق JSON حصريًا، متوافقًا مع المخطط (schema) المقدم.
    `;

  try {
    // Fix: Call the Gemini API to generate content with the specified model, prompt, and JSON response configuration.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: therapyPlanSchema,
        temperature: 0.8,
      },
    });

    const jsonStr = response.text;
    const cleanedJsonStr = jsonStr.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
    
    const plan = JSON.parse(cleanedJsonStr);
    
    if (!plan.sessions || !Array.isArray(plan.sessions)) {
        throw new Error("Invalid plan structure: 'sessions' array is missing.");
    }
    
    return plan;
  } catch (error) {
    console.error("Error generating therapy plan from Gemini:", error);
    if (error instanceof Error && error.message.includes('JSON.parse')) {
        throw new Error("Received invalid JSON format from the AI service.");
    }
    throw new Error("Failed to generate therapy plan. Please try again.");
  }
};

/**
 * Generates coloring page images for given themes using Gemini.
 * @param themes - An array of themes for the coloring pages.
 * @returns An array of objects containing the theme and the base64 data URL of the generated image.
 */
export const generateColoringImages = async (themes: string[]): Promise<{ theme: string; url: string }[]> => {
    const generatedImages: { theme: string; url: string }[] = [];
    // Fix: Process themes sequentially to avoid rate limiting errors.
    for (const theme of themes) {
        try {
            // Fix: Create a specific prompt for generating child-friendly coloring pages.
            const prompt = `صفحة تلوين بسيطة جداً بالأبيض والأسود للأطفال، الموضوع هو "${theme}". يجب أن تكون الخطوط سميكة وواضحة، مع مساحات كبيرة وسهلة للتلوين. النمط يجب أن يكون كرتونياً ومبسطاً.`;

            // Fix: Call the Gemini API to generate an image based on the theme.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            // Fix: Process the response to extract the base64 image data and format it as a data URL.
            // Safely access potentially missing properties using optional chaining.
            const base64ImageBytes = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64ImageBytes) {
                const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                generatedImages.push({ theme, url: imageUrl });
            } else {
                 generatedImages.push({ theme, url: '' }); // Handle cases where image data is not returned
            }

        } catch (error) {
            console.error(`Failed to generate image for theme "${theme}":`, error);
            generatedImages.push({ theme, url: '' }); // Return empty url on failure for this specific image
        }
    }
    return generatedImages;
};